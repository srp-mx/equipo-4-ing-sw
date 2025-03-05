package models

import "time"

type Invites struct {
    User User
    Clan Clan
    ExpiryDate time.Time `gorm:"type:datetime"`
}
