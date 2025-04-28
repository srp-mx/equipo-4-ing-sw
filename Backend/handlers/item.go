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
)

// Handles /rename_armor
func RenameArmor(c *fiber.Ctx) error {
	// Get the user requesting this with their character loaded in
	user, err := characterGetBase(c)
	if err != nil {
		return err
	}

	// How the post request object should look
	type Req struct {
		ID   uint   `json:"id"`
		Name string `json:"name"`
	}

	// Parses the request
	body, err := parseRequestBody[Req](c)
	if err != nil {
		return err
	}

	// Check if the item is owned by that character
	items := controllers.NewItemController(database.DB.Db)
	armor := &models.Armor{Item: models.Item{ID: body.ID}}
	if err := items.GetArmor(user.Character, armor); err != nil {
		return getNotFound(c, "La armadura no está en el inventario del personaje")
	}

	// Cleans up the proposed name
	body.Name = cleanDisplayName(body.Name)

	// Rename
	if err := items.RenameArmor(user.Character, armor, body.Name); err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"alive": true,
	})
}

// Handles /rename_weapon
func RenameWeapon(c *fiber.Ctx) error {
	// Get the user requesting this with their character loaded in
	user, err := characterGetBase(c)
	if err != nil {
		return err
	}

	// How the post request object should look
	type Req struct {
		ID   uint   `json:"id"`
		Name string `json:"name"`
	}

	// Parses the request
	body, err := parseRequestBody[Req](c)
	if err != nil {
		return err
	}

	// Check if the item is owned by that character
	items := controllers.NewItemController(database.DB.Db)
	weapon := &models.Weapon{Item: models.Item{ID: body.ID}}
	if err := items.GetWeapon(user.Character, weapon); err != nil {
		return getNotFound(c, "El arma no está en el inventario del personaje")
	}

	// Cleans up the proposed name
	body.Name = cleanDisplayName(body.Name)

	// Rename
	if err := items.RenameWeapon(user.Character, weapon, body.Name); err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"alive": true,
	})
}

// Handles /rename_pet
func RenamePet(c *fiber.Ctx) error {
	// Get the user requesting this with their character loaded in
	user, err := characterGetBase(c)
	if err != nil {
		return err
	}

	// How the post request object should look
	type Req struct {
		ID   uint   `json:"id"`
		Name string `json:"name"`
	}

	// Parses the request
	body, err := parseRequestBody[Req](c)
	if err != nil {
		return err
	}

	// Check if the item is owned by that character
	items := controllers.NewItemController(database.DB.Db)
	pet := &models.Pet{Item: models.Item{ID: body.ID}}
	if err := items.GetPet(user.Character, pet); err != nil {
		return getNotFound(c, "La mascota no está en el inventario del personaje")
	}

	// Cleans up the proposed name
	body.Name = cleanDisplayName(body.Name)

	// Rename
	if err := items.RenamePet(user.Character, pet, body.Name); err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"alive": true,
	})
}
