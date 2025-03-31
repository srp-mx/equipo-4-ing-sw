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

// Handles /register
func Register(c *fiber.Ctx) error {
	type RegisterRequest struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}

	// Parse request
	request, err := parseRequestBody[RegisterRequest](c)
	if err != nil {
		return err
	}

	// Verify fields
	if request.Username == "" {
		return getBadReq(c, "Falta el campo: username")
	}

	if request.Email == "" {
		return getBadReq(c, "Falta el campo: email")
	}

	if request.Password == "" {
		return getBadReq(c, "Falta el campo: password")
	}

	if request.Name == "" {
		return getBadReq(c, "Falta el campo: name")
	}

	users := controllers.NewUserController(database.DB.Db)

	// Verify new username
	if yes, err := users.ExistsUsername(request.Username); yes || err != nil {
		return getConflict(c, "El nombre de usuario ya está en uso.")
	}

	// Verify new email
	if yes, err := users.ExistsEmail(request.Email); yes || err != nil {
		return getConflict(c, "El correo ya está en uso.")
	}

	// Create the user
	err = users.CreateUser(&models.User{
		Username: request.Username,
		Email:    request.Email,
		Name:     request.Name,
		Password: request.Password,
	})

	// If creation failed, internal server error
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}
