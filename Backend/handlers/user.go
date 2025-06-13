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
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

const PFP_PATH string = "/resources/uploads/pfp/"

// Handles /user_classes
func GetUserClasses(c *fiber.Ctx) error {
	// Gets the user
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	users := controllers.NewUserController(database.DB.Db)

	// Loads class data into the user
	err = users.LoadClasses(user)
	if err != nil {
		return getServerErr(c)
	}

	// Returns the classes
	return c.JSON(user.Classes)
}

// Handles /all_assignments
func GetAllAssignments(c *fiber.Ctx) error {
	user, err := getCredentials(c)
	if err != nil {
		return err
	}
	users := controllers.NewUserController(database.DB.Db)
	var ass []models.Assignment
	ass, err = users.LoadAssignments(user)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(ass)
}

// Handles /remove_account
func RemoveAccount(c *fiber.Ctx) error {
	// Get the user
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Remove
	users := controllers.NewUserController(database.DB.Db)
	err = users.DeleteUser(user)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}

// Handles /update_profile
func UpdateProfile(c *fiber.Ctx) error {
	// Get the user
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Request type
	type Req struct {
		Name     *string `json:"name"`
		Password *string `json:"password"`
		Email    *string `json:"email"`
	}

	// Parses the request
	body, err := parseRequestBody[Req](c)
	if body.Name != nil {
		user.Name = *body.Name
	}
	if body.Password != nil {
		user.Password = *body.Password
	}
	if body.Email != nil {
		user.Email = *body.Email
	}

	// Updates the record
	users := controllers.NewUserController(database.DB.Db)
	err = users.UpdateUser(user)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(user)
}

// Handles /upload_pfp
func UploadPfp(c *fiber.Ctx) error {
	// Get the user
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Get the file
	file, err := c.FormFile("image")
	if err != nil {
		return getBadReq(c, "No se recibió un archivo")
	}

	// Save the file
	savePath := filepath.Join(PFP_PATH, user.Username)
	if err := c.SaveFile(file, savePath); err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}

// Handles /get_pfp
func GetPfp(c *fiber.Ctx) error {
	// Verify logged in
	_, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Request type
	type Req struct {
		Username string `json:"username"`
	}

	// Parse request
	req, err := parseRequestBody[Req](c)
	if err != nil {
		return err
	}

	// Check if the user exists
	users := controllers.NewUserController(database.DB.Db)
	exists, err := users.ExistsUsername(req.Username)
	if err != nil {
		return getServerErr(c)
	}
	if !exists {
		return getNotFound(c, "No se encontró la imagen")
	}

	// Check if the image exists
	savePath := filepath.Join(PFP_PATH, req.Username)
	if _, err := os.Stat(savePath); os.IsNotExist(err) {
		return getNotFound(c, "No se encontró la imagen")
	}

	// Send the file
	return c.SendFile(req.Username)
}
