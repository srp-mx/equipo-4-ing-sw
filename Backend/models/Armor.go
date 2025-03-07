package models

import _ "gorm.io/gorm"

type Armor struct {
	Item
	DamageReceived int `json:"damage_received" gorm:"check:damage_received >= 0"`
	Wears []Wears
	OwnsArmor []OwnsArmor
}
