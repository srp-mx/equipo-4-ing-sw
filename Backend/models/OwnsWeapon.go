package models

import (
	"time"
	"gorm.io/gorm"
)

type OwnsWeapon struct {
	gorm.Model
	WeaponID uint
	CharacterName string
	since time.Time `gorm:"type:datetime"`
}
