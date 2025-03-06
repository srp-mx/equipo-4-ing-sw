package models

import (
	"time"
	_ "gorm.io/gorm"
)

type Accompanies struct {
	Character Character `gorm:"unique"`
	Pet Pet
	since time.Time `gorm:"type:datetime;autoUpdateTime"`
}



