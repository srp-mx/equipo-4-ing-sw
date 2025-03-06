package models

import (
	"time"
	"gorm.io/gorm"
)

type OwnsWeapon struct {
	gorm.Model
	Weapon Weapon
	Character Character
	since time.Time `gorm:"type:datetime"`
}
