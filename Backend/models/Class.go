package models

import (
	_ "gorm.io/gorm"
	"time"
)

const MAX_FORMULA_LEN int = 400

type Class struct {
    ID            uint         `gorm:"primaryKey;autoIncrement" json:"id"`
    Name          string       `gorm:"not null;uniqueIndex:unique_class" json:"name"`
    StartDate     time.Time    `gorm:"datetime;not null;uniqueIndex:unique_class" json:"start_date"`
    EndDate       time.Time    `gorm:"datetime;not null;uniqueIndex:unique_class" json:"end_date"`
    OwnerUsername string       `gorm:"not null;uniqueIndex:unique_class" json:"owner_username"`
    GradeFormula  string       `gorm:"not null;type:varchar(400)" json:"grade_formula"`
    Assignments   []Assignment `gorm:"foreignKey:ClassID;references:ID;constraint:OnDelete:CASCADE" json:"assignments,omitempty"`
    Color string `gorm:"type:varchar(8);not null" json:"color"`
}
