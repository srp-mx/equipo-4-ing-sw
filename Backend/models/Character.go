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

type Character struct {
	UserUsername         string
	Name                 string `gorm:"primaryKey"`
	MomentOfLatestAction time.Time
	Streak               int `gorm:"check:streak >= 0"`
	Hp                   int
	StrengthExtra        int
	DefenseExtra         int
	IntelligenceExtra    int
	HeartExtra           int
	ExtraPoints          int
	Type                 string `gorm:"type:varchar(20);check type in ('wizzard', 'knight', 'sage')"`
	Accompanies          Accompanies
	Wears                Wears
	Equips               Equips
	OwnsArmor            []OwnsArmor
	OwnsPet              []OwnsPet
	OwnsWeapon           []OwnsWeapon
}
