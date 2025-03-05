package models

type Clan struct {
    Name string `gorm:"primaryKey"`
    Admin User
    Description string `gorm:"type:varchar(500)"`
    VictoryCount int `gorm:"check: victory_count >= 0"`
    LogoUri string
    Xp int `gorm:"check: xp >= 0"`
}
