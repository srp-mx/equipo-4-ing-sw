package middlewares

import (
	"os"

	"github.com/gofiber/fiber/v2"
	jwt "github.com/gofiber/jwt/v3"
)

var JwtSecret string = os.Getenv("JWT_SECRET")

func NewAuthMiddleware() fiber.Handler {
    return jwt.New(jwt.Config{
        SigningKey: []byte(JwtSecret),
    })
}
