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
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/gorm"
)

type AssignmentController struct {
	DB *gorm.DB
}

func NewAssignmentController(db *gorm.DB) *AssignmentController {
	return &AssignmentController{DB: db}
}

func (self *AssignmentController) CreateAssignment(assignment *models.Assignment) error {
	return self.DB.Create(assignment).Error
}

func (self *AssignmentController) UpdateAssignment(assignment *models.Assignment) error {
	return self.DB.Save(assignment).Error
}

func (self *AssignmentController) DeleteAssignment(assignment *models.Assignment) error {
	return self.DB.Delete(assignment).Error
}
