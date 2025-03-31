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

package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
)

// Handles /verify_formula
func VerifyFormula(c *fiber.Ctx) error {
	type Formula struct {
		Formula string `json:"formula"`
	}

	request := new(Formula)
	if err := c.BodyParser(request); err != nil {
		return getBadReq(c, err.Error())
	}

	form, err := utils.NewFormula(request.Formula)
	if err != nil {
		return c.JSON(fiber.Map{
			"ok":      false,
			"formula": form,
		})
	}

	if !form.VerifyPlausibility() {
		return c.JSON(fiber.Map{
			"ok":      false,
			"formula": form,
		})
	}

	return c.JSON(fiber.Map{
		"ok":      true,
		"formula": form,
	})
}
