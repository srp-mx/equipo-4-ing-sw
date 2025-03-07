package models

import (
	"time"
	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model `gorm:"primaryKey"`
	Assignment uint `gorm:"primaryKey"`
	ClassName string `gorm:"primaryKey"`
	ClassStartDate time.Time `gorm:"primaryKey"`
	ClassEndDate time.Time `gorm:"primaryKey"`
	UserUsername string `gorm:"primaryKey"`
}

