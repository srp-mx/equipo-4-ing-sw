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

// Class controller type
type ClassController struct {
	DB *gorm.DB
}

// ClassController constructor
func NewClassController(db *gorm.DB) *ClassController {
	return &ClassController{DB: db}
}

// Creates a new class on the database
func (self *ClassController) CreateClass(class *models.Class) error {
	return self.DB.Create(class).Error
}

// Updates an existing class on the database
func (self *ClassController) UpdateClass(class *models.Class) error {
	return self.DB.Save(class).Error
}

// Deletes an existing class on the database
func (self *ClassController) DeleteClass(class *models.Class) error {
	return self.DB.Delete(class).Error
}

// Loads the related assignments to the class passed in
func (self *ClassController) LoadAssignments(class *models.Class) error {
	return self.DB.Model(class).Association("Assignments").Find(class.Assignments)
}

// Returns an array of unique tags used in all assignments for this class
func (self *ClassController) GetTags(class *models.Class) ([]string, error) {
	err := self.LoadAssignments(class)
	if err != nil {
		return []string{}, err
	}

	tagsSeen := make(map[string]bool)
	tags := []string{}

	for _, assignment := range class.Assignments {
		if assignment.Tag == "" {
			continue
		}
		if !tagsSeen[assignment.Tag] {
			tagsSeen[assignment.Tag] = true
			tags = append(tags, assignment.Tag)
		}
	}

	return tags, nil
}

// Computes the class' grade so far given the grading formula, tags, progress,
// and optional assignments.
func (self *ClassController) GetGrade(class *models.Class) (float64, error) {
	err := self.Get(class)
	if err != nil {
		return 0.0, err
	}

	tagsAvailable, err := self.GetTags(class)
	if err != nil {
		return 0.0, err
	}

	tagsAvailableSet := make(map[string]([]float64))
	for _, t := range tagsAvailable {
		tagsAvailableSet[t] = []float64{}
	}

	form, err := utils.NewFormula(class.GradeFormula)
	if err != nil {
		return 0.0, err
	}

	for _, t := range form.TagsUsed {
		if _, exists := tagsAvailableSet[t]; !exists {
			return 0.0, fmt.Errorf("La etiqueta '" + t + "' requerida para" +
				" calcular la calificación no existe")
		}
	}

	if !form.VerifyPlausibility() {
		return 0.0, form.Error
	}

	for _, assignment := range class.Assignments {
		if !assignment.Optional || assignment.Progress > 0 {
			tagsAvailableSet[assignment.Tag] = append(tagsAvailableSet[assignment.Tag], assignment.Grade)
		}
	}

	tagMap := make(map[string]any)
	for key, value := range tagsAvailableSet {
		tagMap[key] = value
	}

	return form.Evaluate(tagMap)
}

// Checks whether or not a class with matching candidate key exists
// (name, start date, end date, owner username)
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

// Fills in the receiver with an existing class' data that matches its ID
func (self *ClassController) Get(receiver *models.Class) error {
	err := self.DB.
		Where(&models.Class{
			ID: receiver.ID,
		}).
		First(receiver).Error

	if err != nil {
		return err
	}

	return nil
}

// Returns a class that matches the query's ID on the database
func (self *ClassController) GetWithCopy(query models.Class) (*models.Class, error) {
	result := models.Class{ID: query.ID}
	err := self.DB.
		Where(&models.Class{
			ID: query.ID,
		}).
		First(&result).Error

	if err != nil {
		return nil, err
	}

	return &result, nil
}

// Updates the class which matches the source's ID with the valid entries on
// the updates map in the database
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
		v, err := time.Parse(DATETIME_FMT, value.(string))
		if err != nil {
			return fmt.Errorf("La fecha de inicio no es válida")
		}
		foundClass.StartDate = v
	}
	if value, exists := updates["end_date"]; exists {
		v, err := time.Parse(DATETIME_FMT, value.(string))
		if err != nil {
			return fmt.Errorf("La fecha de fin no es válida")
		}
		foundClass.EndDate = v
	}
	return self.UpdateClass(foundClass)
}
