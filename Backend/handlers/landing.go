package handlers

import (
	"github.com/gofiber/fiber/v2"
	jwt "github.com/golang-jwt/jwt/v4"
	"time"
)

func Landing(c *fiber.Ctx) error {
	// Get user from context and return it
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	exp := int64(claims["exp"].(float64))
	if exp < time.Now().Unix() {
		return fiber.NewError(401, "Expired token.")
	}
	email := claims["email"].(string)
	return c.SendString("Welcome " + email)
}

func LandingPostData(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)

	claims := user.Claims.(jwt.MapClaims)
	exp := int64(claims["exp"].(float64))
	if !user.Valid || time.Now().Unix() >= exp {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Token is either invalid or expired",
		})
	}

	return c.JSON(claims)
}
