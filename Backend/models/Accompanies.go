package models

import (
	"time"
)

type Accompanies struct {
    Character Character
    Pet Pet
    Since time.Time
}
