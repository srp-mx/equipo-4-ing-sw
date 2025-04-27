/*
Copyright (C) 2025

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
package test

import (
	"log"
	"os"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/routes"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Database instance
var db *gorm.DB
var app *fiber.App

// Resets database data, to be run between tests
func resetDb() {
	db.Exec("DELETE from users")
	db.Exec("DELETE from classes")
	db.Exec("DELETE from assignments")
	db.Exec("DELETE from characters")
}

// Entry-point of all tests
func TestMain(m *testing.M) {
	log.Println("Starting tests...")

	var err error
	db, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	err = db.AutoMigrate(
		&models.User{},
		&models.Character{},
		&models.Class{},
		&models.Assignment{},
		&models.Armor{},
		&models.Weapon{},
		&models.Pet{},
		&models.Wears{},
		&models.Equips{},
		&models.Accompanies{},
	)

	if err != nil {
		panic("failed to automigrate database")
	}

	database.DB.Db = db

	app = fiber.New()
	routes.SetupRoutes(app)

	code := m.Run()

	log.Println("Testing finished")
	os.Exit(code)
}
