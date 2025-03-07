package models

import (
	"time"
)

type Wears struct {
    CharacterName string 
    ArmorID uint
    Since time.Time
}
