package models

import "gorm.io/gorm"

type OwnsPet struct {
    gorm.Model
    Pet Pet
    Character Character
}
