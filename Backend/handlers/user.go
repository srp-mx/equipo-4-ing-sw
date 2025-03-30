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

// Handles /user_classes
func GetUserClasses(c *fiber.Ctx) error {
	// Get the user from the request body
	request, err := initUserRequest(c)
	if err != nil {
		return err
	}

	users := controllers.NewUserController(database.DB.Db)
	if exists, err := users.ExistsUsername(request.Username); !exists || err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "Usuario no encontrado.",
			},
		})
	}

	err = users.Get(request)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	err = users.LoadClasses(request)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(request)
}

// Utility function to initialize and verify the incoming user request
func initUserRequest(c *fiber.Ctx) (*models.User, error) {
	var request *models.User
	request, err := parseRequest[models.User](c)

	if err != nil {
		return nil, err
	}

	err = checkJwt(c, request)
	if err != nil {
		return nil, err
	}

	userController := controllers.NewUserController(database.DB.Db)
	err = userController.Get(request)
	if err != nil {
		return nil, c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    401,
				Message: "El usuario no existe.",
			},
		})
	}

	return request, nil
}
