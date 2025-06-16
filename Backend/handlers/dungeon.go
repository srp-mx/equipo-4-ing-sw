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
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
)

// Handles /getDungeon
func GetDungeon(c *fiber.Ctx) error {
	// Get the requesting user
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Parse the request
	type Req struct {
		Dungeon int `json:"dungeon"`
	}
	body, err := parseRequestBody[Req](c)
	if err != nil {
		return err
	}
	dungeon, err := utils.GetDungeon(body.Dungeon)
	if err != nil {
		return getNotFound(c, "La mazmorra no existe")
	}

	// Get the user's character
	users := controllers.NewUserController(database.DB.Db)
	err = users.LoadCharacter(user)
	if err != nil {
		return getNotFound(c, "No tiene un personaje el usuario")
	}

	// Get the user's stats
	characters := controllers.NewCharacterController(database.DB.Db)
	stats, _, err := characters.ComputeStats(user.Character)

	// Run the dungeon
	dungeonRun := dungeon.Execute(user.Character, &stats)

	// Grant the reward if earned
	if dungeonRun.Reward != nil {
		items := controllers.NewItemController(database.DB.Db)
		switch dungeonRun.RewardType {
		case models.ITEM_ARMOR:
			if items.CreateArmor(user.Character, dungeonRun.Reward) != nil {
				return getServerErr(c)
			}
		case models.ITEM_WEAPON:
			if items.CreateWeapon(user.Character, dungeonRun.Reward) != nil {
				return getServerErr(c)
			}
		case models.ITEM_PET:
			if items.CreatePet(user.Character, dungeonRun.Reward) != nil {
				return getServerErr(c)
			}
		}
	}

	// Deal damage
	if dungeonRun.Damage > 0 {
		err = characters.Damage(user.Character, dungeonRun.Damage)
		if err != nil {
			return getServerErr(c)
		}
	}

	// Ping character activity
	_, err = characters.ActivityUpdate(user.Character, false)
	if err != nil {
		return getServerErr(c)
	}

	// Return the story
	return c.JSON(fiber.Map{
		"string": dungeonRun.Story,
	})
}
