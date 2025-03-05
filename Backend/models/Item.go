package models

import (
	"gorm.io/gorm"
)

type Item struct {
    gorm.Model
    Rarity int
    DescriptionUri string `json:"description_uri" gorm:"not null"`
    ImageUri string `json:"image-uri" gorm:"not null"`
    Strength int `json:"strength" gorm:"check:strength >= 0"`
    Defence int `json:"defence" gorm:"check:defence >= 0"`
    Intelligence int `json:"intelligence" gorm:"check:intelligence >= 0"`
    Heart int `json:"heart" gorm:"check:heart >= 0"`
}

