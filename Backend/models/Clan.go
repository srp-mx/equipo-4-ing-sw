package models

import (
  _ "gorm.io/gorm"
)

type Clan struct {
	Name string `gorm:"primaryKey"`
	Admin User
	MembersName []User `gorm:"foreignkey:Username"`
	Invites []Invites 
	Description string `gorm:"type:varchar(500)"`
	VictoryCount int `gorm:"check: victory_count >= 0"`
	LogoUri string
	Xp int `gorm:"check: xp >= 0"`
}
