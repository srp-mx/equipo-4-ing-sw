package main

import (
	"github.com/gofiber/fiber/v2"
)

func main () {
	app := fiber.New()
	app.Get("/", func(ctx *fiber.Ctx) error {
		err := ctx.SendString("Hello fiber!")
		return err
	})
	app.Listen(":8080")
}
