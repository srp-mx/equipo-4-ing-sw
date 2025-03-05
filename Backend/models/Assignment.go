package models

import (
	"time"
	"gorm.io/gorm"
)

type Assignment struct {
    gorm.Model
    Class Class `gorm:"primaryKey"`
    AssignmentName string
    Notes string `gorm:"type:varchar(500)"`
    Grade float64
    DueDate time.Time `gorm:"type:datetime"`
    Type int
    Optional bool
    Done bool
}

