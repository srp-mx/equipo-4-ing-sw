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

const MAX_HP int = 100

type Character struct {
	ID                   uint      `gorm:"primaryKey" json:"id"`
	UserUsername         string    `gorm:"not null" json:"user_username"`
	Name                 string    `gorm:"unique;not null" json:"name"`
	MomentOfLatestAction time.Time `gorm:"datetime;not null" json:"moment_of_last_action,string"`
	// Number of consecutive days
	Streak int `gorm:"check:streak >= 0" json:"streak"`
	// Health
	Hp int `json:"hp"`
	// Points dedicated to Strength
	StrengthExtra int `json:"-"`
	// Points dedicated to Defense
	DefenseExtra int `json:"-"`
	// Points dedicated to Intelligence
	IntelligenceExtra int `json:"-"`
	// Points dedicated to Heart
	HeartExtra int `json:"-"`
	// Extra XP gained from events
	ExtraPoints uint64      `json:"-"`
	Accompanies Accompanies `gorm:"foreignKey:CharacterID;references:ID" json:"-"`
	Wears       Wears       `gorm:"foreignKey:CharacterID;references:ID" json:"-"`
	Equips      Equips      `gorm:"foreignKey:CharacterID;references:ID" json:"-"`
	Armors      []Armor     `gorm:"foreignKey:OwnerID;references:Name;constraint:OnDelete:CASCADE" json:"armors,omitempty"`
	Pets        []Pet       `gorm:"foreignKey:OwnerID;references:Name;constraint:OnDelete:CASCADE" json:"pets,omitempty"`
	Weapons     []Weapon    `gorm:"foreignKey:OwnerID;references:Name;constraint:OnDelete:CASCADE" json:"weapons,omitempty"`
}
