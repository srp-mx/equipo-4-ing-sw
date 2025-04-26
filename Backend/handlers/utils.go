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
	"errors"
	"strconv"
	"strings"
	"time"
	"unicode"

	"github.com/gofiber/fiber/v2"
	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

// Creates a JSON with an error status
func getStatusError(c *fiber.Ctx, fiberStatus int, message string) error {
	err := c.Status(fiberStatus).JSON(fiber.Map{
		"error": fiber.Error{
			Code:    fiberStatus,
			Message: message,
		},
	})
	if err != nil {
		return err
	}
	return errors.New(message)
}

// Creates a bad request JSON error
func getBadReq(c *fiber.Ctx, message string) error {
	return getStatusError(c, fiber.StatusBadRequest, message)
}

// Creates an unauthorized JSON error
func getUnauth(c *fiber.Ctx, message string) error {
	return getStatusError(c, fiber.StatusUnauthorized, message)
}

// Creates a not found JSON error
func getNotFound(c *fiber.Ctx, message string) error {
	return getStatusError(c, fiber.StatusNotFound, message)
}

// Creates a conflict JSON error
func getConflict(c *fiber.Ctx, message string) error {
	return getStatusError(c, fiber.StatusConflict, message)
}

// Creates an internal server error JSON error
func getServerErr(c *fiber.Ctx) error {
	return c.Status(fiber.StatusInternalServerError).
		JSON(fiber.Map{"error": fiber.ErrInternalServerError})
}

// Converts an incoming request into the generic class type
func parseRequestBody[T any](c *fiber.Ctx) (*T, error) {
	request := new(T)
	if err := c.BodyParser(request); err != nil {
		return nil, getBadReq(c, err.Error())
	}
	return request, nil
}

// Validates a token and obtains the user's credentials from it
func getCredentials(c *fiber.Ctx) (*models.User, error) {
	bearer, ok := c.Locals("user").(*jwt.Token)
	if !ok {
		return nil, getBadReq(c, "JWT not in request.")
	}

	claims, ok := bearer.Claims.(jwt.MapClaims)
	if !ok {
		return nil, getBadReq(c, "Couldn't obtain claims from token.")
	}

	usernameAny, ok := claims["username"]
	if !ok {
		return nil, getBadReq(c, "Claims don't contain the username.")
	}

	username, ok := usernameAny.(string)
	if !ok {
		return nil, getBadReq(c, "Claims username is not a string.")
	}

	expAny, ok := claims["exp"]
	if !ok {
		return nil, getBadReq(c, "Claims don't contain expiry datetime.")
	}

	expFloat, ok := expAny.(float64)
	if !ok {
		return nil, getBadReq(c, "Claims exp field is not a number.")
	}

	expire := int64(expFloat)

	emitAny, ok := claims["emitted"]
	if !ok {
		return nil, getBadReq(c, "Claims don't contain emitted datetime.")
	}

	emitFloat, ok := emitAny.(float64)
	if !ok {
		return nil, getBadReq(c, "Claims emitted field is not a number.")
	}

	_ = int64(emitFloat)

	if !bearer.Valid || time.Now().Unix() >= expire {
		return nil, getUnauth(c, "Token is invalid or expired.")
	}

	user := models.User{
		Username: username,
	}

	users := controllers.NewUserController(database.DB.Db)
	if exists, err := users.ExistsUsername(user.Username); !exists || err != nil {
		return nil, getUnauth(c, "Token owner does not exist.")
	}

	err := users.Get(&user)
	if err != nil {
		return nil, getServerErr(c)
	}

	return &user, nil
}

// Get the value of a field called "id" from a query parameter
func getQueryId(c *fiber.Ctx) (uint, error) {
	// Get ID requested
	idString := c.Query("id")
	if idString == "" {
		return 0, getBadReq(c, "No se dio un ID.")
	}

	// Parse ID to uint
	id, err := strconv.ParseUint(idString, 10, 32)
	if err != nil {
		return 0, getBadReq(c, "El ID no es un número válido.")
	}

	return uint(id), nil
}

// Cleans up a display name
func cleanDisplayName(input string) string {
	// Trim leading and trailing space
	result := strings.TrimSpace(input)

	// Remove control and space characters except <space>
	result = strings.Map(func(r rune) rune {
		if unicode.IsControl(r) || unicode.IsSpace(r) && r != ' ' {
			return -1
		}
		return r
	}, result)

	// Remove duplicated spaces
	result = strings.Join(strings.Fields(result), " ")

	return result
}

// Does timing updates before fetching data
func tickData(user models.User) (deleted bool, err error) {
	users := controllers.NewUserController(database.DB.Db)
	characters := controllers.NewCharacterController(database.DB.Db)

	err = users.LoadCharacter(&user)
	if err != nil {
		return false, err
	}

	if user.Character == nil {
		return true, nil
	}

	return characters.ActivityUpdate(user.Character, false)
}

// Indicates user activity
func pingActive(user models.User) (deleted bool, err error) {
	users := controllers.NewUserController(database.DB.Db)
	characters := controllers.NewCharacterController(database.DB.Db)

	err = users.LoadCharacter(&user)
	if err != nil {
		return false, err
	}

	return characters.ActivityUpdate(user.Character, true)
}
