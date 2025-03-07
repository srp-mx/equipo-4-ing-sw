package models

import (
	"time"
	_ "gorm.io/gorm"
)

type Accompanies struct {
	CharacterName string 
	PetID uint 
	since time.Time `gorm:"type:datetime;autoUpdateTime"`
}



