package models

import (
	"time"
	"gorm.io/gorm"
)

type OwnsPet struct {
	gorm.Model
	PetID uint
	CharacterName string
	since time.Time `gorm:"type:datetime"`
}
