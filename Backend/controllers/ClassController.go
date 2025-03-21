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

type ClassController struct {
	DB *gorm.DB
}

func NewClassController(db *gorm.DB) *ClassController {
	return &ClassController{DB: db}
}

func (self *ClassController) CreateClass(class *models.Class) error {
	return self.DB.Create(class).Error
}

func (self *ClassController) UpdateClass(class *models.Class) error {
	return self.DB.Save(class).Error
}

func (self *ClassController) DeleteClass(class *models.Class) error {
	return self.DB.Delete(class).Error
}

func (self *ClassController) LoadAssignments(class *models.Class) error {
	return self.DB.Model(class).Association("Assignments").Find(class.Assignments)
}

func (self *ClassController) GetTags(class *models.Class) ([]string, error) {
	err := self.LoadAssignments(class)
	if err != nil {
		return []string{}, err
	}

	tagsSeen := make(map[string]bool)
	tags := []string{}

	for _, assignment := range class.Assignments {
		if !tagsSeen[assignment.Tag] {
			tagsSeen[assignment.Tag] = true
			tags = append(tags, assignment.Tag)
		}
	}

	return tags, nil
}
