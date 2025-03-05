package models

import (
	"time"
	"gorm.io/gorm"
)

type Accompanies struct {
    Character Character
    Pet Pet
    Since time.Time
}
