package database

import (
	"fmt"
	"log"
	"os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

type Dbinstance struct{
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

	db.AutoMigrate(
		&models.Clan{},
		&models.User{},
		&models.Item{},
		&models.Pet{},
		&models.Armor{},
		&models.Character{},
		
		&models.Class{},
		&models.Assignment{},
		&models.Befriends{},
		&models.Weapon{},
		&models.Accompanies{},
		&models.Equips{},
		&models.Invites{},
		&models.OwnsArmor{},
		&models.OwnsPet{},
		&models.OwnsWeapon{},
		//&models.Tag{},
		&models.Wears{},
	)

	UsuariosBase(db)
	DB = Dbinstance{
		Db: db,
	}

	
}

func clanesBase(db *gorm.DB){
	clan := &models.Clan{
		Name: "clanito",
	}

	var existing models.Clan
		err := db.Where("Name = ?", clan.Name).First(&existing).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound{
				db.Create(&clan)
				fmt.Printf("Clan creado: %s\n", clan.Name)
			} else {
				log.Fatalf("Error al verificar usuario: %v", err)
			}
		} else {
			fmt.Printf("Clan ya existe: %s\n", clan.Name)
		}	
}


func UsuariosBase(db *gorm.DB){
	users := []models.User {
        {Username: "admin", Password: "Admin123*", Email: "root@toor.uk"},
		{Username: "pepito", Password: "Pepa24*", Email: "pepe.pica.papas@pepe.gov.mx"},
		{Username: "pedrito", Password: "Piedras1#", Email: "pp@pemex.gov.mx"},
        {Username: "marinela", Password: "Gansitos/02", Email: "bonais@ciencias.unam.mx"},
	}

	for _, user := range users {
		var existing models.User
		err := db.Where("username = ?", user.Username).First(&existing).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound{
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

