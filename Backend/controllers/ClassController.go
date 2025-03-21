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
	"regexp"
	"strings"
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
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

func (self *ClassController) Exists(class models.Class) (bool, error) {
	var count int64
	result := self.DB.Model(&models.Class{}).
		Where(&models.Class{
			Name:          class.Name,
			StartDate:     class.StartDate,
			EndDate:       class.EndDate,
			OwnerUsername: class.OwnerUsername,
		}).Count(&count)
	return count > 0, result.Error
}

func (self *ClassController) Get(receiver *models.Class) error {
	err := self.DB.
		Where(&models.Class{
			Name:          receiver.Name,
			StartDate:     receiver.StartDate,
			EndDate:       receiver.EndDate,
			OwnerUsername: receiver.OwnerUsername,
		}).
		First(receiver).Error

	if err != nil {
		return err
	}

	return nil
}

func (self *ClassController) GetWithCopy(receiver models.Class) (*models.Class, error) {
	result := models.Class{}
	err := self.DB.
		Where(&models.Class{
			Name:          receiver.Name,
			StartDate:     receiver.StartDate,
			EndDate:       receiver.EndDate,
			OwnerUsername: receiver.OwnerUsername,
		}).
		First(&result).Error

	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (self *ClassController) UpdateWithMap(source *models.Class, updates map[string]any) error {
	foundClass, err := self.GetWithCopy(*source)
	if err != nil {
		return err
	}
	if value, exists := updates["grade_formula"]; exists {
		v := strings.TrimSpace(value.(string))
		foundClass.GradeFormula = v
		form, err := utils.NewFormula(v)
		if err != nil {
			return err
		}

		if !form.VerifyPlausibility() {
			return form.Error
		}
	}
	if value, exists := updates["color"]; exists {
		v := value.(string)
		re := regexp.MustCompile(`^[0-9A-Fa-f]{8}$`)
		if !re.MatchString(v) {
			return fmt.Errorf("El color de la materia no es válido.")
		}
		foundClass.Color = v
	}
	if value, exists := updates["name"]; exists {
		v := value.(string)
		foundClass.Name = v
	}
	if value, exists := updates["start_date"]; exists {
		v := value.(time.Time)
		foundClass.StartDate = v
	}
	if value, exists := updates["end_date"]; exists {
		v := value.(time.Time)
		foundClass.EndDate = v
	}
	return self.UpdateClass(foundClass)
}
