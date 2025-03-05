package models

import(
    "time"
)

type Character struct {
    User User `gorm:"primaryKey"`
    Username string `gorm:"primaryKey"`
    ExtraPoints int
    MomentOfLatestAction time.Time `gorm:"type:datetime"`
    Streak int
    Hp int
    StrengthExtra int
    DefenseExtra int
    IntelligenceExtra int
    HeartExtra int
    Type string `gorm:"type:varchar(20);check type in ('wizzard', 'knight', 'sage')"`
}
