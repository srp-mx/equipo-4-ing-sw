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
	_ "gorm.io/gorm"
	"time"
)

type Accompanies struct {
	ID          uint      `gorm:"primaryKey;autoIncrement" json:"-"`
	CharacterID uint      `json:"-"`
	Pet         *Pet      `gorm:"foreignKey:AccompaniesID;references:ID;constraint:OnDelete:SET NULL" json:"-"`
	Since       time.Time `gorm:"datetime;not null" json:"since"`
}
