package models

type Weapon struct {
    Item
    SlayCount int `json:"slay_count" gorm:"check:slay_count >= 0"`
}
