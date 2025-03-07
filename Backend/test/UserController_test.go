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
package test

import (
	"testing"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/stretchr/testify/assert"
)

func setupTestDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&models.User{})
	return db
}

func TestCreateUser(t *testing.T) {
	db := setupTestDB()
	controller := controllers.NewUserController(db)

	user := &models.User{
		Username: "testuser",
		Password: "securepassword",
	}

	err := controller.CreateUser(user)
	assert.NoError(t, err)

	var foundUser models.User
	db.First(&foundUser, "username = ?", "testuser")

	assert.Equal(t, user.Username, foundUser.Username)
}

func TestUpdateUser(t *testing.T) {
	db := setupTestDB()
	controller := controllers.NewUserController(db)

	user := &models.User{
		Username: "testuser",
		Password: "oldpassword",
	}
	db.Create(user)

	user.Password = "newpassword"
	err := controller.UpdateUser(user)
	assert.NoError(t, err)

	var updatedUser models.User
	db.First(&updatedUser, "username = ?", "testuser")

	assert.Equal(t, "newpassword", updatedUser.Password)
}

func TestDeleteUser(t *testing.T) {
	db := setupTestDB()
	controller := controllers.NewUserController(db)

	user := &models.User{
		Username: "testuser",
		Password: "password",
	}
	db.Create(user)

	err := controller.DeleteUser(user)
	assert.NoError(t, err)

	var foundUser models.User
	result := db.First(&foundUser, "username = ?", "testuser")

	assert.Error(t, result.Error) 
}

func TestFindByCredentials(t *testing.T) {
	db := setupTestDB()
	controller := controllers.NewUserController(db)

	user := &models.User{
		Username: "testuser",
		Password: "securepassword",
		Email: "pp@pemex.gov.mx",
	}
	db.Create(user)

	foundUser, err := controller.FindByCredentials("pp@pemex.gov.mx", "securepassword")
	assert.NoError(t, err)
	assert.NotNil(t, foundUser)
	assert.Equal(t, "testuser", foundUser.Username)
}
