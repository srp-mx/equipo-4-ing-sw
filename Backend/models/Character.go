package models

import(
	"time"
	_ "gorm.io/gorm"
)

type Character struct {
	UserUsername string 
	Name string `gorm:"primaryKey"`
	MomentOfLatestAction time.Time 
	Streak int `gorm:"check:streak >= 0"`
	Hp int
	StrengthExtra int
	DefenseExtra int
	IntelligenceExtra int
	HeartExtra int
	ExtraPoints int
	Type string `gorm:"type:varchar(20);check type in ('wizzard', 'knight', 'sage')"`
	Accompanies Accompanies
	Wears Wears
	Equips Equips
	OwnsArmor []OwnsArmor
	OwnsPet []OwnsPet
	OwnsWeapon []OwnsWeapon
}

