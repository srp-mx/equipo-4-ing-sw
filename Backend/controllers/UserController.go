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
	"gorm.io/gorm"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

type UserController struct {
	DB *gorm.DB
}

func NewUserController(db *gorm.DB) *UserController {
	return &UserController{DB: db}
}

func(r *UserController) CreateUser(user *models.User) error {
	return r.DB.Create(user).Error
}

func (r *UserController) UpdateUser(user *models.User) error {
	return r.DB.Save(user).Error
}

func(r *UserController) DeleteUser(user *models.User) error {
	return r.DB.Delete(user).Error
}


func (r *UserController) FindByCredentials (username string, password string) (*models.User, error) {
	var user models.User

	err := r.DB.Where("username = ? AND password = ?", username, password).First(&user).Error

	if err != nil {
		return nil, err

	}
	return &user, nil
}



