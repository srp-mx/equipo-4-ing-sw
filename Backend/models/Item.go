/*Copyright (C) 2025

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

package models

import (
	"gorm.io/gorm"
)

type Item struct {
    gorm.Model
    Rarity int
    DescriptionUri string `json:"description_uri" gorm:"not null"`
    ImageUri string `json:"image-uri" gorm:"not null"`
    Strength int `json:"strength" gorm:"check:strength >= 0"`
    Defence int `json:"defence" gorm:"check:defence >= 0"`
    Intelligence int `json:"intelligence" gorm:"check:intelligence >= 0"`
    Heart int `json:"heart" gorm:"check:heart >= 0"`
}

