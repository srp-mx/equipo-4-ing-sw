/*Copyright (C) 2025

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

package database

import (
	"fmt"
	"log"
	"math/rand"
	"os"
	"strconv"
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Type that wraps the database instance
type Dbinstance struct {
	Db *gorm.DB
}

// Singleton database
var DB Dbinstance

// Initializes the connection to the database
func ConnectDb() {
	dsn := fmt.Sprintf("host=db user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=Asia/Shanghai",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database. \n", err)
		os.Exit(2)
	}

	log.Println("connected")
	db.Logger = logger.Default.LogMode(logger.Info)

	log.Println("running migrations")

	db.AutoMigrate(&models.Assignment{})
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Character{})
	db.AutoMigrate(&models.Class{})

	setupMock(db)
	DB = Dbinstance{
		Db: db,
	}
}

// Sets up some base data
func setupMock(db *gorm.DB) {
	// Controllers
	var userCtl = controllers.NewUserController(db)
	var characterCtl = controllers.NewCharacterController(db)
	var classCtl = controllers.NewClassController(db)
	var assignmentCtl = controllers.NewAssignmentController(db)

	// Raw data

	users := make(map[string]*models.User)
	usernames := []string{"pepito", "pedrito", "marinela"}
	users[usernames[0]] = &models.User{
		Username: "pepito",
		Name:     "Pepe",
		Password: "pass",
		Email:    "pepito@pepito.com",
	}
	users[usernames[1]] = &models.User{
		Username: "matilda",
		Name:     "Matilda",
		Password: "pass",
		Email:    "matilda@matilda.com",
	}
	users[usernames[2]] = &models.User{
		Username: "marinela",
		Name:     "Marcela",
		Password: "pass",
		Email:    "marinela@marinela.com",
	}

	characterNames := []string{"xXpepitasXx", "matilda", "marimbas44"}
	characters := make(map[string]*models.Character)
	for i := range len(users) {
		username := usernames[i]
		characterName := characterNames[i]
		characters[characterName] = &models.Character{
			UserUsername:         username,
			Name:                 characterName,
			MomentOfLatestAction: time.Now().AddDate(0, 0, -i),
			Streak:               10,
			Hp:                   20,
			StrengthExtra:        0, DefenseExtra: 0, IntelligenceExtra: 0,
			HeartExtra: 0, ExtraPoints: 0,
		}
	}

	classes := make(map[string]*models.Class)
	colors := []string{"FF0000FF", "00FF00FF", "0000FFFF"}
	for i := range len(users) {
		classNames := []string{
			"Álgebra Moderna " + strconv.FormatInt(int64(i+1), 10),
			"Geometría " + strconv.FormatInt(int64(i+1), 10),
			"Crayolas " + strconv.FormatInt(int64(i+1), 10),
		}
		for j, className := range classNames {
			classes[className] = &models.Class{
				Name:          className,
				StartDate:     time.Now().Truncate(24*time.Hour).AddDate(0, -3, 0),
				EndDate:       time.Now().Truncate(24*time.Hour).AddDate(0, 3-2*j, 0),
				OwnerUsername: usernames[i],
				GradeFormula:  "0.3*average(tarea) + 0.7*average(top(2,examen))",
				Color:         colors[j%3],
			}
		}
	}

	assignments := make(map[string](map[string]*models.Assignment))
	for className := range classes {
		assignments[className] = make(map[string]*models.Assignment)
		homeworks := 4
		exams := 3
		for i := 1; i <= homeworks; i++ {
			hwkName := "Tarea " + strconv.FormatInt(int64(i), 10) + " " + className
			hwkProgress := 1
			if i == homeworks {
				hwkProgress = 0
			}
			assignments[className][hwkName] = &models.Assignment{
				DueDate:  time.Now().Truncate(24*time.Hour).AddDate(0, -1, i+1-homeworks),
				Notes:    "Ya valió",
				Grade:    float64(rand.Intn(100 + 1)),
				Name:     hwkName,
				Optional: false,
				Progress: hwkProgress,
				Tag:      "tarea",
			}
		}
		for i := 1; i <= exams; i++ {
			exName := "Examen " + strconv.FormatInt(int64(i), 10) + " " + className
			assignments[className][exName] = &models.Assignment{
				DueDate:  time.Now().Truncate(24*time.Hour).AddDate(0, -1, i-1-homeworks),
				Notes:    "Ya valió",
				Grade:    float64(rand.Intn(100 + 1)),
				Name:     exName,
				Optional: false,
				Progress: 1,
				Tag:      "examen",
			}
		}
	}

	// Fill in the database

	for username, user := range users {
		if exists, err := userCtl.ExistsUsername(username); exists || err == nil {
			userCtl.DeleteUser(&models.User{Username: username})
			userCtl.CreateUser(user)
		}
	}

	for charName, character := range characters {
		theCharacter, err := characterCtl.FindByName(charName)
		if err == nil || theCharacter != nil {
			characterCtl.DeleteCharacter(theCharacter)
		}
		characterCtl.CreateCharacter(character)
	}

	for _, class := range classes {
		classCtl.CreateClass(class)
	}

	for _, user := range users {
		userCtl.LoadClasses(user)
		for _, class := range user.Classes {
			for _, assignment := range assignments[class.Name] {
				assignment.ClassID = class.ID
				assignmentCtl.CreateAssignment(assignment)
			}
		}
	}
}
