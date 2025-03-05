package models

import(
    "time"
)

type Character struct {
    User User `gorm:"primaryKey"`
    Username string `gorm:"primaryKey"`
    MomentOfLatestAction time.Time `gorm:"type:datetime"`
    Streak int `gorm:"check:streak >= 0"`
    Hp int
    StrengthExtra int
    DefenseExtra int
    IntelligenceExtra int
    HeartExtra int
    ExtraPoints int
    Type string `gorm:"type:varchar(20);check type in ('wizzard', 'knight', 'sage')"`
}
