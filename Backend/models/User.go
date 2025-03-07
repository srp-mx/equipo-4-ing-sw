package models

import (
	_ "gorm.io/gorm"
)

type User struct {
	Username string `gorm:"primaryKey"`
	Name string 
	Email string 
	Password string 
	DestinationUser []Befriends `gorm:"foreignKey:DestinationUser"`
	SourceUser []Befriends `gorm:"foreignKey:SourceUser"`
	ClanName string 
	Invites []Invites 
	Class []Class 
}


