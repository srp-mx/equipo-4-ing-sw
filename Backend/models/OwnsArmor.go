package models

import "gorm.io/gorm"

type OwnsArmor struct {
    gorm.Model
    Armor Armor
    Character Character
}
