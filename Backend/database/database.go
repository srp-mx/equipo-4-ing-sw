package database

import (
	"fmt"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"time"
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
	ClassPrueba(db)
	AssigmentsPrueba(db)
	DB = Dbinstance{
		Db: db,
	}
}

func ClassPrueba(db *gorm.DB) {
	clases := []models.Class{
		{ ID: 1, Name: "Informatica", StartDate: time.Now() , EndDate: time.Now() , OwnerUsername: "marinela", GradeFormula: "average(Homework)", Color: "000000"},
	}
	for _,clase := range clases {
		var existing models.Class
		err := db.Where("id = ? AND  owner_username  = ?", clase.ID, clase.OwnerUsername).First(&existing).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				db.Create(&clase)
				fmt.Printf("Clase creada: %s\n", clase.Name)
			} else {
				log.Fatalf("Error al verificar Clase: %v", err)
			}
		} else {
			fmt.Printf("La clase ya existe: %s\n", clase.Name)
		}
	} 
}

func AssigmentsPrueba(db *gorm.DB) {
	ass := []models.Assignment{
		{ ID: 1, ClassID: 1,Name: "Informar", DueDate: time.Now(), Tag: "Homework"},
		{ ID: 2, ClassID: 1,Name: "Tejer", DueDate: time.Now(), Tag: "Homework"},
		{ ID: 3, ClassID: 1,Name: "Hackear la Nasa", DueDate: time.Now(), Tag: "Homework"},
	}
	for _,a := range ass {
		var existing models.Assignment
		err := db.Where("id = ? AND  class_id  = ?", a.ID, a.ClassID).First(&existing).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				db.Create(&a)
				fmt.Printf("Tarea creada: %s\n", a.Name)
			} else {
				log.Fatalf("Error al verificar Tarea: %v", err)
			}
		} else {
			fmt.Printf("La tarea ya existe: %s\n", a.Name)
		}
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
