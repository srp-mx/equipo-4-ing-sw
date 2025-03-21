package models

import (
	_ "gorm.io/gorm"
	"time"
)

type Class struct {
	ID            uint         `gorm:"primaryKey;autoIncrement"`
	Name          string       `gorm:"not null;uniqueIndex:unique_class"`
	StartDate     time.Time    `gorm:"datetime;not null;uniqueIndex:unique_class"`
	EndDate       time.Time    `gorm:"datetime;not null;uniqueIndex:unique_class"`
	OwnerUsername string       `gorm:"not null;uniqueIndex:unique_class"`
	GradeFormula  string       `gorm:"not null;type:varchar(400)"`
	Assignments   []Assignment `gorm:"foreignKey:ClassID;references:ID;constraint:OnDelete:CASCADE"`
}
