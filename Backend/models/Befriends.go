package models

import (
	"time"
	"gorm.io/gorm"
)

type Befriends struct {
	gorm.Model
	SourceUser User 
	DestinationUser User 
	since time.Time `gorm:"type:datetime;autoUpdateTime"`
}

