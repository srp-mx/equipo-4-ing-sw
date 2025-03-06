package models

import (
    "gorm.io/gorm"
)

type Befriends struct {
    gorm.Model
    SourceUser User
    DestinationUser User
}

