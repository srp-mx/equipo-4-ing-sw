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

// Test data struct
type assignmentTestData struct {
	userController  *controllers.UserController
	classController *controllers.ClassController
	controller      *controllers.AssignmentController
	user            *models.User
	class           *models.Class
	assignment      *models.Assignment
}

// Creates test data
func newAssignmentTestData() (result assignmentTestData) {
	result = assignmentTestData{}
	result.userController = controllers.NewUserController(db)
	result.classController = controllers.NewClassController(db)
	result.controller = controllers.NewAssignmentController(db)

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

	result.assignment = &models.Assignment{
		ID:       0,
		ClassID:  result.class.ID,
		DueDate:  time.Now().Add(time.Hour),
		Notes:    "Lorem ipsum dolor sit amet consectetur sid adisciping",
		Grade:    8.6,
		Name:     "Parcial 1",
		Optional: false,
		Progress: 1,
		Tag:      "parciales",
	}

	return result
}

// Tests assignment creation
func TestCreateAssignment(t *testing.T) {
	resetDb()
	data := newAssignmentTestData()

	err := data.userController.CreateUser(data.user)
	assert.NoError(t, err)

	err = data.classController.CreateClass(data.class)
	assert.NoError(t, err)

	err = data.controller.CreateAssignment(data.assignment)
	assert.NoError(t, err)

	var foundAssignment models.Assignment
	db.First(&foundAssignment)

	assert.Equal(t, data.assignment.ID, foundAssignment.ID)
}

// Tests assignment updates
func TestUpdateAssignment(t *testing.T) {
	resetDb()
	data := newAssignmentTestData()

	db.Create(data.user)
	db.Create(data.class)
	db.Create(data.assignment)

	data.assignment.Grade = 9.9
	err := data.controller.UpdateAssignment(data.assignment)
	assert.NoError(t, err)

	var updatedAssignment models.Assignment
	db.First(&updatedAssignment)

	assert.Equal(t, 9.9, updatedAssignment.Grade)
}

// Tests assignment removal
func TestDeleteAssignment(t *testing.T) {
	resetDb()
	data := newAssignmentTestData()

	db.Create(data.user)
	db.Create(data.class)
	db.Create(data.assignment)

	err := data.controller.DeleteAssignment(data.assignment)
	assert.NoError(t, err)

	var foundAssignment models.Assignment
	result := db.First(&foundAssignment)

	assert.Error(t, result.Error)
}
