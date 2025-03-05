package models

type Armor struct {
    Item
    DamageReceived int `json:"damage_received" gorm:"check:damage_received >= 0"`
}
