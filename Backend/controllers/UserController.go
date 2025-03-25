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

type UserController struct {
	DB *gorm.DB
}

func NewUserController(db *gorm.DB) *UserController {
	return &UserController{DB: db}
}

func (self *UserController) CreateUser(user *models.User) error {
	return self.DB.Create(user).Error
}

func (self *UserController) UpdateUser(user *models.User) error {
	return self.DB.Save(user).Error
}

func (self *UserController) DeleteUser(user *models.User) error {
	return self.DB.Delete(user).Error
}

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

func (self *UserController) Get(receiver *models.User) error {
	err := self.DB.
		Where("username = ?", receiver.Username).
		First(receiver).Error

	if err != nil {
		return err
	}

	return nil
}

func (self *UserController) ExistsUsername(username string) (bool, error) {
	var count int64
	result := self.DB.Model(&models.User{}).Where("username = ?", username).Count(&count)
	return count > 0, result.Error
}

func (self *UserController) ExistsEmail(email string) (bool, error) {
	var count int64
	result := self.DB.Model(&models.User{}).Where("email = ?", email).Count(&count)
	return count > 0, result.Error
}

func (self *UserController) LoadClasses(user *models.User) {
	self.DB.Model(user).Association("Classes").Find(user.Classes)
}
