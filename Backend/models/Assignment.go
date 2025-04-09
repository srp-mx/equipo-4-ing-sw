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

const MAX_TAG_LEN int = 25

type Assignment struct {
	ID       uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	ClassID  uint      `gorm:"not null" json:"class_id"`
	DueDate  time.Time `json:"due_date"`
	Notes    string    `gorm:"type:varchar(500)" json:"notes"`
	Grade    float64   `json:"grade,omitempty"`
	Name     string    `json:"name"`
	Optional bool      `json:"optional,omitempty"`
	Progress int       `json:"progress"`
	Tag      string    `gorm:"type:varchar(25)" json:"tag,omitempty"`
}
