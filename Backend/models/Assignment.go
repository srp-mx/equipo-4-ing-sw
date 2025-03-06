package models

import (
	"time"
	"gorm.io/gorm"
)

type Assignment struct {
	gorm.Model
	Class Class `gorm:"primaryKey"`
	DueDate time.Time `gorm:"type:datetime"`
	Notes string `gorm:"type:varchar(500)"`
	Grade float64
	AssignmentName string
	Type int
	Optional bool
	Done bool
}

