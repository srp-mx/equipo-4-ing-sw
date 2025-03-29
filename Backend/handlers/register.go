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

func Register(c *fiber.Ctx) error {
	type registerRequest struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}

	badReq := func(msg string) error {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    400,
				Message: msg,
			},
		})
	}

	request := new(registerRequest)
	if err := c.BodyParser(request); err != nil {
		return badReq(err.Error())
    }

	if request.Username == "" {
		return badReq("Falta el campo: username")
	}

	if request.Email == "" {
		return badReq("Falta el campo: email")
	}

	if request.Password == "" {
		return badReq("Falta el campo: password")
	}

	if request.Name == "" {
		return badReq("Falta el campo: name")
	}

	users := controllers.NewUserController(database.DB.Db)

	if yes, err := users.ExistsUsername(request.Username); yes || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    409,
				Message: "El nombre de usuario ya está en uso.",
			},
		})
	}

	if yes, err := users.ExistsEmail(request.Email); yes || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    409,
				Message: "El correo ya está en uso.",
			},
		})
	}

	err := users.CreateUser(&models.User{
		Username: request.Username,
		Email:    request.Email,
		Name:     request.Name,
		Password: request.Password,
	})

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}
