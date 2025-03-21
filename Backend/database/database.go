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
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
)

type Dbinstance struct {
	Db *gorm.DB
}

var DB Dbinstance

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
	db.AutoMigrate(&models.Class{})

	UsuariosBase(db)
	DB = Dbinstance{
		Db: db,
	}
}

func UsuariosBase(db *gorm.DB) {
	users := []models.User{
		{Username: "admin", Name: "Adminio", Password: "Admin123*", Email: "root@toor.uk"},
		{Username: "pepito", Name: "Pepe", Password: "Pepa24*", Email: "pepe.pica.papas@pepe.gov.mx"},
		{Username: "pedrito", Name: "Pedro", Password: "Piedras1#", Email: "pp@pemex.gov.mx"},
		{Username: "marinela", Name: "Marcelo", Password: "Gansitos$02", Email: "bonais@ciencias.unam.mx"},
	}

	for _, user := range users {
		var existing models.User
		err := db.Where("username = ?", user.Username).First(&existing).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				db.Create(&user)
				fmt.Printf("Usuario creado: %s\n", user.Username)
			} else {
				log.Fatalf("Error al verificar usuario: %v", err)
			}
		} else {
			fmt.Printf("Usuario ya existe: %s\n", user.Username)
		}
	}
}
