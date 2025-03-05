package models

type Pet struct {
    Item
    Bond int `json:"bond"`
    Name string `json:"name" gorm:"default:'';not null"`
}
