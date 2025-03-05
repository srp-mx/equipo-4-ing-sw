package models

import (
    "time"
)

type Class struct {
    Name string `gorm="primaryKey"`
    StartDate time.Time `gorm="datetime;primaryKey"`
    EndDate time.Time `gorm="datetime;primaryKey"`
    User User `gorm="primaryKey"`
    GradeFormula string `gorm="type:varchar(200)"`
}
