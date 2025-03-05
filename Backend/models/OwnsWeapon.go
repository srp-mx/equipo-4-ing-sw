package models

import "gorm.io/gorm"

type OwnsWeapon struct {
    gorm.Model
    Weapon Weapon
    Character Character
}
