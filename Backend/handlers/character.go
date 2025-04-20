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
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

// Handles /post_character
func PostCharacter(c *fiber.Ctx) error {
	// Gets user asking this
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Checks that the user has no character
	users := controllers.NewUserController(database.DB.Db)
	err = users.LoadCharacter(user)
	if err != nil {
		return getConflict(c, "El usuario ya tiene un personaje")
	}

	// How the post request object should look
	type Req struct {
		Name string `json:"name"`
	}

	// Parses the character
	body, err := parseRequestBody[Req](c)
	if err != nil {
		return err
	}

	// Checks if the character name is already in use
	characters := controllers.NewCharacterController(database.DB.Db)
	_, err = characters.FindByName(body.Name)
	if err == nil {
		return getConflict(c, "Ya hay un personaje con este nombre")
	}

	// Create the character
	newCharacter := models.Character{
		Name:                 body.Name,
		UserUsername:         user.Username,
		MomentOfLatestAction: time.Now(),
		Hp:                   models.MAX_HP,
	}
	err = characters.CreateCharacter(&newCharacter)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"character_name": newCharacter.Name,
	})
}

// Handles /delete_character
func DeleteCharacter(c *fiber.Ctx) error {
	// Get the user requesting this to determine if we should actually do it
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Load the character from the user
	users := controllers.NewUserController(database.DB.Db)
	err = users.LoadCharacter(user)
	if err != nil {
		return getServerErr(c)
	}

	// Check if the character exists
	if user.Character == nil {
		return getNotFound(c, "El usuario no tiene personaje")
	}

	// Removal
	characters := controllers.NewCharacterController(database.DB.Db)
	err = characters.DeleteCharacter(user.Character)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}

// Handles /patch_character
func PatchCharacter(c *fiber.Ctx) error {
	// Get the user requesting this
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Request type
	type Req struct {
		Name string `json:"name"`
	}
	request, err := parseRequestBody[Req](c)
	if err != nil {
		return err
	}

	// Cleanup character name
	request.Name = cleanDisplayName(request.Name)

	// Get the character
	users := controllers.NewUserController(database.DB.Db)
	err = users.LoadCharacter(user)
	if err != nil {
		return getServerErr(c)
	}
	if user.Character == nil {
		return getNotFound(c, "El personaje del usuario no existe")
	}

	// Check if the name is already taken
	characters := controllers.NewCharacterController(database.DB.Db)
	if _, err := characters.FindByName(request.Name); err == nil {
		return getConflict(c, "El nombre del personaje ya está en uso")
	}

	// Do the updates
	updates := make(map[string]any)
	updates["name"] = request.Name
	err = characters.UpdateWithMap(user.Character, updates)
	if err != nil {
		return getBadReq(c, "No se pudo actualizar.\n"+err.Error())
	}

	// Obtain the character with the new information on the database
	err = characters.Get(user.Character)
	if err != nil || user.Character.Name != request.Name {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"name": user.Character.Name,
	})
}

// Handles /character_basic_data
func CharacterBasicData(c *fiber.Ctx) error {
	// Get the user requesting this with their character loaded in
	user, err := characterGetBase(c)
	if err != nil {
		return err
	}

	return c.JSON(fiber.Map{
		"alive": true,
		"data":  user.Character,
	})
}

// Handles /character_stats
func CharacterStats(c *fiber.Ctx) error {
	// Get the user requesting this with their character loaded in
	user, err := characterGetBase(c)
	if err != nil {
		return err
	}

	// Get the skills
	characters := controllers.NewCharacterController(database.DB.Db)
	skills, streakMultiplier, err := characters.ComputeStats(user.Character)
	if err != nil {
		return getServerErr(c)
	}

	// Get the xp
	xp, err := characters.ComputeXp(user.Character)
	if err != nil {
		return getServerErr(c)
	}

	// Get the level data
	level, levelPercent, xpUntilNext, err := characters.ComputeLevel(user.Character)
	if err != nil {
		return getServerErr(c)
	}

	// Return the data
	return c.JSON(fiber.Map{
		"alive": true,
		"stats": fiber.Map{
			"skills":               skills,
			"streak_bonus_percent": streakMultiplier,
			"xp":                   xp,
			"level":                level,
			"level_percent":        levelPercent,
			"xp_to_next_level":     xpUntilNext,
		},
	})
}

// Handles /character_next_refresh
func CharacterNextRefresh(c *fiber.Ctx) error {
	// Get the user requesting this with their character loaded in
	user, err := characterGetBase(c)
	if err != nil {
		return err
	}

	// Get the moment the streak would be lost
	characters := controllers.NewCharacterController(database.DB.Db)
	streakLoss, err := characters.StreakLossDate(user.Character)
	if err != nil {
		return getServerErr(c)
	}

	// Get the moment the character would be deleted for inactivity
	deletion, err := characters.DeletionDate(user.Character)
	if err != nil {
		return getServerErr(c)
	}

	// Each hour a passive heal occurs, so get the time of the next hour
	heal := time.Now().Truncate(time.Hour).Add(time.Hour)
	if err != nil {
		return getServerErr(c)
	}

	// Get the earliest of the datetimes
	earliest := streakLoss
	if deletion.Before(earliest) {
		earliest = deletion
	}
	if heal.Before(earliest) {
		earliest = heal
	}

	return c.JSON(fiber.Map{
		"alive":      true,
		"next_check": earliest,
		"timers": fiber.Map{
			"streak_loss": streakLoss,
			"deletion":    deletion,
			"next_heal":   heal,
		},
	})
}

// Handles /character_free_skill
func CharacterFreeSkill(c *fiber.Ctx) error {
	// Get the user requesting this with their character loaded in
	user, err := characterGetBase(c)
	if err != nil {
		return err
	}

	// Get the free skill points
	characters := controllers.NewCharacterController(database.DB.Db)
	points, err := characters.ComputeFreeSkillPoints(user.Character)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"alive":  true,
		"points": points,
	})
}

// Handles /character_add_skills
func CharacterAddSkills(c *fiber.Ctx) error {
	// Get the user requesting this
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Load in their character
	users := controllers.NewUserController(database.DB.Db)
	err = users.LoadCharacter(user)
	if err != nil {
		return getServerErr(c)
	}

	// If the character is not alive, 404
	if user.Character == nil {
		return getNotFound(c, "El usuario no tiene personaje")
	}

	// Get the request
	request, err := parseRequestBody[models.CharacterStats](c)
	if err != nil {
		return err
	}

	// Try to assign those skill points
	characters := controllers.NewCharacterController(database.DB.Db)
	_, err = characters.ComputeFreeSkillPoints(user.Character)
	if err != nil {
		return getServerErr(c)
	}
	err = characters.AssignFreeSkillPoints(user.Character, request)
	return c.JSON(fiber.Map{
		"ok": err == nil,
	})
}

// Utility function to load a user with their character and returns a not-alive
// JSON if the character does not exist.
func characterGetBase(c *fiber.Ctx) (*models.User, error) {
	// Get the user requesting this
	user, err := getCredentials(c)
	if err != nil {
		return nil, err
	}

	// Load in their character
	users := controllers.NewUserController(database.DB.Db)
	err = users.LoadCharacter(user)
	if err != nil {
		return nil, getServerErr(c)
	}

	// If the character is not alive, report it
	if user.Character == nil {
		return user, c.JSON(fiber.Map{
			"alive": false,
		})
	}

	return user, nil
}
