package models

import (
	"time"
	"gorm.io/gorm"
)

type OwnsArmor struct {
	gorm.Model
	ArmorID uint 
	CharacterName string
	since time.Time `gorm:"type:datetime"`
}
