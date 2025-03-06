package models

import (
	"time"
	"gorm.io/gorm"
)

type OwnsPet struct {
	gorm.Model
	Pet Pet
	Character Character
	since time.Time `gorm:"type:datetime"`
}
