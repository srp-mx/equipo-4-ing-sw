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
	"errors"

	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/gorm"
)

// User controller type
type UserController struct {
	DB *gorm.DB
}

// UserController constructor
func NewUserController(db *gorm.DB) *UserController {
	return &UserController{DB: db}
}

// Creates a new user on the database
func (self *UserController) CreateUser(user *models.User) error {
	return self.DB.Create(user).Error
}

// Updates an existing user on the database
func (self *UserController) UpdateUser(user *models.User) error {
	return self.DB.Save(user).Error
}

// Deletes an existing user on the database
func (self *UserController) DeleteUser(user *models.User) error {
	return self.DB.Delete(user).Error
}

// Returns the user matching the email if the email and password are correct
func (self *UserController) FindByCredentials(email string, password string) (*models.User, error) {
	var user models.User

	err := self.DB.
		Where("email = ? AND password = ?", email, password).
		First(&user).Error

	if err != nil {
		return nil, err

	}
	return &user, nil
}

// Fills in the receiver with an existing user's data that matches its username
func (self *UserController) Get(receiver *models.User) error {
	err := self.DB.
		Where("username = ?", receiver.Username).
		First(receiver).Error

	if err != nil {
		return err
	}

	return nil
}

// Checks whether or not a user with the username given exists
func (self *UserController) ExistsUsername(username string) (bool, error) {
	var count int64
	result := self.DB.Model(&models.User{}).Where("username = ?", username).Count(&count)
	return count > 0, result.Error
}

// Checks whether or not a user with the email given exists
func (self *UserController) ExistsEmail(email string) (bool, error) {
	var count int64
	result := self.DB.Model(&models.User{}).Where("email = ?", email).Count(&count)
	return count > 0, result.Error
}

// Loads the related character to the user passed in
func (self *UserController) LoadCharacter(user *models.User) error {
	return self.DB.Preload("Character").First(user, "username=?", user.Username).Error
}

// Loads the related classes to the user passed in
func (self *UserController) LoadClasses(user *models.User) error {
	return self.DB.Preload("Classes").First(user, "username=?", user.Username).Error
}

// TODO: Rename to GetAssignments
func (self *UserController) LoadAssignments(user *models.User) ([]models.Assignment, error) {
	err := self.LoadClasses(user)
	if err != nil {
		return nil, err
	}
	var assignment = []models.Assignment{}
	c := NewClassController(self.DB)
	for _, class := range user.Classes {
		err = c.LoadAssignments(&class)
		if err != nil {
			return nil, err
		}
		assignment = append(assignment, class.Assignments...)
	}
	return assignment, nil
}

// Determines whether a user is enrolled in a class or not
func (self *UserController) EnrolledIn(user *models.User, classID uint) (bool, error) {
	// Gets any class with the given ID belonging to the user
	class := models.Class{}
	err := self.DB.
		Where("id=? AND owner_username=?", classID, user.Username).
		First(&class).
		Error

	// No problems, but not enrolled
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return false, nil
	}

	// Problems
	if err != nil {
		return false, err
	}

	// They are enrolled
	return true, nil
}
