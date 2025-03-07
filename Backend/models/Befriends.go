package models

import (
	"time"
	"gorm.io/gorm"
)

type Befriends struct {
	gorm.Model
	SourceUser string
	DestinationUser string
	since time.Time `gorm:"type:datetime"`
}

