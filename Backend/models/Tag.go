package models

type Tag struct {
    Assignment Assignment `gorm:"primaryKey"`
    Name string `gorm:"primaryKey"`
}
