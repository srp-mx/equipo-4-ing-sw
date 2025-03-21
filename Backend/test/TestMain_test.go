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

	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func resetDb() {
	db.Exec("DELETE from users")
	db.Exec("DELETE from classes")
	db.Exec("DELETE from assignments")
}

func TestMain(m *testing.M) {
	log.Println("Starting tests...")

	var err error
	db, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.Assignment{})
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Class{})

	code := m.Run()

	log.Println("Testing finished")
	os.Exit(code)
}
