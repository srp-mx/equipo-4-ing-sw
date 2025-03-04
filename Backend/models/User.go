package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	username string `json:"username" gorm:"text; not null; default:null"`
	name string `json:"name" gorm:"text; not null; default:null"`
	email string
	password string
}
