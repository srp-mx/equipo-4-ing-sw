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
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/stretchr/testify/assert"
)

// Testing data struct
type classTestData struct {
	userController *controllers.UserController
	controller     *controllers.ClassController
	user           *models.User
	class          *models.Class
}

// Creates testing data
func newClassTestData() (result classTestData) {
	result = classTestData{}
	result.userController = controllers.NewUserController(db)
	result.controller = controllers.NewClassController(db)

	result.user = &models.User{
		Username: "testuser",
		Name:     "Testing Testington",
		Email:    "test@test.com",
		Password: "securepassword",
	}

	result.class = &models.Class{
		ID:            0,
		Name:          "Maths",
		StartDate:     time.Now(),
		EndDate:       time.Now().Add(time.Hour),
		OwnerUsername: result.user.Username,
		GradeFormula:  "0.3*average(homework) + 0.7*average(top(3,exam))",
	}

	return result
}

// Tests class creation
func TestCreateClass(t *testing.T) {
	resetDb()
	data := newClassTestData()

	err := data.userController.CreateUser(data.user)
	assert.NoError(t, err)

	err = data.controller.CreateClass(data.class)
	assert.NoError(t, err)

	var foundClass models.Class
	db.First(&foundClass)

	assert.Equal(t, data.class.ID, foundClass.ID)
}

// Tests class updating
func TestUpdateClass(t *testing.T) {
	resetDb()
	data := newClassTestData()

	db.Create(data.user)
	db.Create(data.class)

	data.class.GradeFormula = "average(test)"
	err := data.controller.UpdateClass(data.class)
	assert.NoError(t, err)

	var updatedClass models.Class
	db.First(&updatedClass)

	assert.Equal(t, "average(test)", updatedClass.GradeFormula)
}

// Tests class removal
func TestDeleteClass(t *testing.T) {
	resetDb()
	data := newClassTestData()

	db.Create(data.user)
	db.Create(data.class)

	err := data.controller.DeleteClass(data.class)
	assert.NoError(t, err)

	var foundClass models.Class
	result := db.First(&foundClass)

	assert.Error(t, result.Error)
}
