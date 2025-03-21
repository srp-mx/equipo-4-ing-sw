package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

func parseRequest[T any](c *fiber.Ctx) (*T, error) {
    request := new(T)
    if err := c.BodyParser(request); err != nil {
		return nil, c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
    return request, nil
}

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
