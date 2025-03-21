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

package test

import (
	"github.com/stretchr/testify/assert"
	"math"
	"testing"
)

func TestAbs(t *testing.T) {
	t.Run("absolute value test", func(t *testing.T) {
		got := math.Abs(-1.0)
		assert.Equal(t, 1.0, got)
	})
}
