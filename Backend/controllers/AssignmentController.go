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

package controllers

import (
	"fmt"
	"strings"
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
	"gorm.io/gorm"
)

// Assignment controller type
type AssignmentController struct {
	DB *gorm.DB
}

// AssignmentController constructor
func NewAssignmentController(db *gorm.DB) *AssignmentController {
	return &AssignmentController{DB: db}
}

// Creates a new assignment on the database
func (self *AssignmentController) CreateAssignment(assignment *models.Assignment) error {
	return self.DB.Create(assignment).Error
}

// Updates an existing assignment on the database
func (self *AssignmentController) UpdateAssignment(assignment *models.Assignment) error {
	return self.DB.Save(assignment).Error
}

// Deletes an existing assignment on the database
func (self *AssignmentController) DeleteAssignment(assignment *models.Assignment) error {
	return self.DB.Delete(assignment).Error
}

// Fills in the receiver with an existing assignment's data that matches its ID
func (self *AssignmentController) Get(receiver *models.Assignment) error {
	return self.DB.
		Where(&models.Assignment{
			ID: receiver.ID,
		}).
		First(receiver).Error
}

// Returns an assignment that matches the query's ID on the database
func (self *AssignmentController) GetWithCopy(query models.Assignment) (*models.Assignment, error) {
	result := models.Assignment{}
	err := self.DB.
		Where(&models.Assignment{
			ID: query.ID,
		}).
		First(&result).Error

	if err != nil {
		return nil, err
	}

	return &result, nil
}

// Tells whether or not an assignment with the given ID exists in the database
func (self *AssignmentController) Exists(assignment models.Assignment) (bool, error) {
	var count int64
	result := self.DB.Model(&models.Assignment{}).
		Where(&models.Class{
			ID: assignment.ID,
		}).Count(&count)
	return count > 0, result.Error
}

// Updates the assignment which matches the source's ID with the valid entries
// on the updates map in the database. Also returns whether or not the update
// counted as user activity (to continue a streak)
func (self *AssignmentController) UpdateWithMap(source *models.Assignment, updates map[string]any) (bool, error) {
	foundAssignment, err := self.GetWithCopy(*source)
	activity := false
	if err != nil {
		return false, err
	}

	if value, exists := updates["due_date"]; exists {
		v, err := time.Parse(DATETIME_FMT, value.(string))
		if err != nil {
			return false, fmt.Errorf("La fecha de entrega no es válida")
		}
		foundAssignment.DueDate = v
	}
	if value, exists := updates["notes"]; exists {
		v := value.(string)
		foundAssignment.Notes = v
		activity = true
	}
	if value, exists := updates["grade"]; exists {
		v := value.(float64)
		foundAssignment.Grade = v
		activity = true
	}
	if value, exists := updates["name"]; exists {
		v := value.(string)
		foundAssignment.Name = v
	}
	if value, exists := updates["optional"]; exists {
		v := value.(bool)
		foundAssignment.Optional = v
	}
	if value, exists := updates["progress"]; exists {
		if floatValue, ok := value.(float64); ok {
			foundAssignment.Progress = int(floatValue)
		} else {
			return false, fmt.Errorf("No estoy recibiendo un numero en progress")
		}
		activity = true
	}
	if value, exists := updates["tag"]; exists {
		v := strings.TrimSpace(value.(string))
		if !utils.ValidTagName(v) {
			return false, fmt.Errorf("El nombre de etiqueta es inválido.")
		}
		foundAssignment.Tag = v
	}
	return activity, self.UpdateAssignment(foundAssignment)
}

// Determines if the assignment was assigned to the user
func (self *AssignmentController) AssignedTo(assignment *models.Assignment, user *models.User) bool {
	classes := NewClassController(self.DB)
	class := models.Class{ID: assignment.ClassID}
	err := classes.Get(&class)
	if err != nil {
		return false
	}
	return class.OwnerUsername == user.Username
}
