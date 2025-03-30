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
	err := self.DB.
		Where(&models.Assignment{
			ID: receiver.ID,
		}).
		First(receiver).Error

	if err != nil {
		return err
	}

	return nil
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
// on the updates map in the database
func (self *AssignmentController) UpdateWithMap(source *models.Assignment, updates map[string]any) error {
	foundAssignment, err := self.GetWithCopy(*source)
	if err != nil {
		return err
	}

	if value, exists := updates["due_date"]; exists {
		v := value.(time.Time)
		foundAssignment.DueDate = v
	}
	if value, exists := updates["notes"]; exists {
		v := value.(string)
		foundAssignment.Notes = v
	}
	if value, exists := updates["grade"]; exists {
		v := value.(float64)
		foundAssignment.Grade = v
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
		v := value.(int)
		foundAssignment.Progress = v
	}
	if value, exists := updates["tag"]; exists {
		v := strings.TrimSpace(value.(string))
		if !utils.ValidTagName(v) {
			return fmt.Errorf("El nombre de etiqueta es inválido.")
		}
		foundAssignment.Tag = v
	}
	return self.UpdateAssignment(foundAssignment)
}
