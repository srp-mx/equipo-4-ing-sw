package models

import (
	"time"
)

type Wears struct {
    Character Character `gorm:"unique"`
    Armor Armor
    Since time.Time `gorm:"type:datetime;autoUpdateTime"`
}
