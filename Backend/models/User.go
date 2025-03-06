package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"text;not null;default:null;unique"`
	Name string `json:"name" gorm:"text;not null;default:null"`
	Email string `json:"email" gorm:"not null;unique"`
	Password string `json:"password" gorm:"not null"`
}
