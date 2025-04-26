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
	"testing"

	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/stretchr/testify/assert"
)

// Testing data struct
type userTestData struct {
	user       *models.User
	controller *controllers.UserController
}

// Creates testing data
func newUserTestData() (result userTestData) {
	result = userTestData{}

	result.controller = controllers.NewUserController(db)

	result.user = &models.User{
		Username: "testuser",
		Name:     "Testing Testington",
		Email:    "test@test.com",
		Password: "securepassword",
	}

	return result
}

// Tests user creation
func TestCreateUser(t *testing.T) {
	resetDb()
	data := newUserTestData()

	err := data.controller.CreateUser(data.user)
	assert.NoError(t, err)

	var foundUser models.User
	db.First(&foundUser, "username = ?", "testuser")

	assert.Equal(t, data.user.Username, foundUser.Username)
}

// Tests user updating
func TestUpdateUser(t *testing.T) {
	resetDb()
	data := newUserTestData()

	db.Create(data.user)

	data.user.Password = "newpassword"
	err := data.controller.UpdateUser(data.user)
	assert.NoError(t, err)

	var updatedUser models.User
	db.First(&updatedUser, "username = ?", "testuser")

	assert.Equal(t, "newpassword", updatedUser.Password)
}

// Tests user removal
func TestDeleteUser(t *testing.T) {
	resetDb()
	data := newUserTestData()

	db.Create(data.user)

	err := data.controller.DeleteUser(data.user)
	assert.NoError(t, err)

	var foundUser models.User
	result := db.First(&foundUser)

	assert.Error(t, result.Error)
}

// Tests searching by credentials (email + password)
func TestUserFindByCredentials(t *testing.T) {
	resetDb()
	data := newUserTestData()

	db.Create(data.user)

	foundUser, err := data.controller.FindByCredentials(
		"test@test.com", "securepassword")
	assert.NoError(t, err)
	assert.NotNil(t, foundUser)
	assert.Equal(t, "testuser", foundUser.Username)
}

// Tests querying if a user exists
func TestUserExists(t *testing.T) {
	resetDb()
	data := newUserTestData()

	exists, err := data.controller.ExistsUsername(data.user.Username)
	assert.NoError(t, err)
	assert.False(t, exists)

	exists, err = data.controller.ExistsEmail(data.user.Email)
	assert.NoError(t, err)
	assert.False(t, exists)

	data.controller.CreateUser(data.user)

	exists, err = data.controller.ExistsUsername(data.user.Username)
	assert.NoError(t, err)
	assert.True(t, exists)

	exists, err = data.controller.ExistsEmail(data.user.Email)
	assert.NoError(t, err)
	assert.True(t, exists)
}
