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
)

type User struct {
	Username  string     `gorm:"primaryKey" json:"username"`
	Name      string     `gorm:"not null" json:"name"`
	Email     string     `gorm:"unique;not null" json:"email"`
	Password  string     `gorm:"not null" json:"-"`
	Classes   []Class    `gorm:"foreignKey:OwnerUsername;references:Username;constraint:OnDelete:CASCADE" json:"classes,omitempty"`
	Character *Character `gorm:"unique;foreignKey:UserUsername;references:Username;constraint:OnDelete:CASCADE" json:"character"`
}
