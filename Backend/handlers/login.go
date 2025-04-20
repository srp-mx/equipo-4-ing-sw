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

// Handles /login
func Login(c *fiber.Ctx) error {
	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	type TokenResponse struct {
		Token string      `json:"token"`
		User  models.User `json:"user"`
	}

	// Get the credentials from the request body
	request := new(LoginRequest)
	if err := c.BodyParser(request); err != nil {
		return getBadReq(c, err.Error())
	}

	// Get the user by credentials
	users := controllers.NewUserController(database.DB.Db)
	user, err := users.FindByCredentials(request.Email, request.Password)
	if err != nil {
		return getUnauth(c, "El usuario o contraseña no es correcto.")
	}

	// Generate the token
	token, ok := tokenFromUser(user)
	if !ok {
		return getServerErr(c)
	}

	// Update user time-related data
	_, err = tickData(*user)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(TokenResponse{
		Token: token,
		User:  *user,
	})
}

// Gives a new token given the old one
func RefreshToken(c *fiber.Ctx) error {
	type TokenResponse struct {
		Token string      `json:"token"`
		User  models.User `json:"user"`
	}

	// Get user credentials
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Generate new token
	token, ok := tokenFromUser(user)
	if !ok {
		return getServerErr(c)
	}

	return c.JSON(TokenResponse{
		Token: token,
		User:  *user,
	})
}

// Generates a new token for a user
func tokenFromUser(user *models.User) (string, bool) {
	claims := jwt.MapClaims{
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
		"emitted":  time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(middlewares.JwtSecret))
	if err != nil {
		return "", false
	}

	return signedToken, true
}
