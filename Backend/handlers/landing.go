package handlers

import (
	"time"
	"github.com/gofiber/fiber/v2"
	jwt "github.com/golang-jwt/jwt/v4"
)

// TODO: Make the landing page
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
