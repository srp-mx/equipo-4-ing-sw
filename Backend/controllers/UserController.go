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



