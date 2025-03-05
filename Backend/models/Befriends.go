package models

import (
    "gorm.io/gorm"
    "time"
)

type Befriends struct {
    gorm.Model
    SourceUser User
    DestinationUser User
)

