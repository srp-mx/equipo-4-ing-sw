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
	"github.com/srp-mx/equipo-4-ing-sw/middlewares"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

func Login(c *fiber.Ctx) error {
	type loginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	type loginResponse struct {
		Token string      `json:"token"`
		User  models.User `json:"user"`
	}

	// Get the credentials from the request body
	request := new(loginRequest)
	if err := c.BodyParser(request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Get the user by credentials
	userController := controllers.NewUserController(database.DB.Db)
	user, err := userController.FindByCredentials(request.Email, request.Password)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    401,
				Message: "El usuario o contraseña no es correcto.",
			},
		})
	}

	// Create JWT claims with user ID and expiry time
	claims := jwt.MapClaims{
		"username": user.Username,
		"name":     user.Name,
		"email":    user.Email,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
		"emitted":  time.Now().Unix(),
	}

	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate and send token
	t, err := token.SignedString([]byte(middlewares.JwtSecret))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(loginResponse{
		Token: t,
		User:  *user,
	})
}
