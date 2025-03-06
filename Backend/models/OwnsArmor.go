package models

import (
	"time"
	"gorm.io/gorm"
)

type OwnsArmor struct {
	gorm.Model
	Armor Armor
	Character Character
	since time.Time `gorm:"type:datetime"`
}
