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
	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

// Converts an incoming request into the generic class type
func parseRequest[T any](c *fiber.Ctx) (*T, error) {
	request := new(T)
	if err := c.BodyParser(request); err != nil {
		return nil, c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return request, nil
}

// Verifies that credentials are valid and correspond to the request body user
func checkJwt(c *fiber.Ctx, user *models.User) error {
	bearer := c.Locals("user").(*jwt.Token)
	claims := bearer.Claims.(jwt.MapClaims)
	username := claims["username"].(string)
	name := claims["name"].(string)
	email := claims["email"].(string)
	expire := int64(claims["exp"].(float64))
	_ = int64(claims["emitted"].(float64))
	if !bearer.Valid || time.Now().Unix() >= expire {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Token is invalid or expired",
		})
	}

	users := controllers.NewUserController(database.DB.Db)
	users.Get(user)

	if username != user.Username || email != user.Email || name != user.Name {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Token is not this user's",
		})
	}
	return nil
}
