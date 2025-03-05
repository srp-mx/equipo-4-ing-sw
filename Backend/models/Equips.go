package models

import (
	"time"
)

type Equips struct {
    Character Character `gorm:"unique"`
    Weapon Weapon
    Since time.Time `gorm:"type:datetime;autoUpdateTime"`
}
