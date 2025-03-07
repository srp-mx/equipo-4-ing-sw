package models

import (
	"time"
	_ "gorm.io/gorm"
)

type Equips struct {
    CharacterName string
    WeaponID uint
    Since time.Time 
}
