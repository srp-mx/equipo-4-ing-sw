package models

import (
	"time"
	"gorm.io/gorm"
)

type Assignment struct {
	gorm.Model `gorm:"primaryKey"`
	ClassName string `gorm:"primaryKey"`
	ClassStartDate time.Time `gorm:"primaryKey"`
	ClassEndDate time.Time `gorm:"primaryKey"`
	UserUsername string `gorm:"primaryKey"`
	DueDate time.Time
	Notes string `gorm:"type:varchar(500)"`
	Grade float64
	AssignmentName string
	Type int
	Optional bool
	Done bool
	//Tag []Tag `gorm:"foreignKey:ID"` 
}

