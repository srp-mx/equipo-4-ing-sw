package models

import _ "gorm.io/gorm"

type Pet struct {
	Item
	Bond int `json:"bond"`
	Name string `json:"name" gorm:"default:'';not null"`
	Accompanies []Accompanies
	OwnsPet []OwnsPet
}
