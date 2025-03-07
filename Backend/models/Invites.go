package models

import (
	"gorm.io/gorm"
	"time"
)

type Invites struct {
	gorm.Model
	UserUsername string
	ClanName string 
	ExpiryDate time.Time 
}
