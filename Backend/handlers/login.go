package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/srp-mx/equipo-4-ing-sw/middlewares"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/gorm"
)

func Login(c *fiber.Ctx) error {
    type loginRequest struct {
        Username string `json:"username"`
        Password string `json:"password"`
    }

    type loginResponse struct {
        Token string `json:"token"`
    }

    // Get the credentials from the request body
    request := new(loginRequest)
    if err := c.BodyParser(request); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": err.Error(),
        })
    }

    // Get the user by credentials
    // TODO(srp): Change to real database lookup
    if request.Username != "marinela" || request.Password != "gansitos" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": fiber.Error{
                Code: -69,
                Message: "El usuario o contraseña no es correcto.",
            },
        })
    }
    user := models.User{
        Model: gorm.Model{
            ID: 1,
        },
        Username: "marinela",
        Email: "juanin.juan.harry@ciencias.unam.mx",
        Name: "Juanin Juan Harry",
    }

    // Create JWT claims with user ID and expiry time
    claims := jwt.MapClaims{
        "id": user.ID,
        "email": user.Email,
        "username": user.Username,
        "name": user.Name,
        "exp": time.Now().Add(time.Hour * 24).Unix(),
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
    })
}
