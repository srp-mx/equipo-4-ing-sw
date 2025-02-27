package main

import (
	"fmt"
	"os"
	"github.com/gofiber/fiber/v2"
)

func main () {
	port := os.Getenv("PORT")
	if port == "" {
		fmt.Println("Port undefined, exiting app...")
		os.Exit(0)
	}
	app := fiber.New()
	app.Get("/", func(ctx *fiber.Ctx) error {
		err := ctx.SendString("Hello fiber!")
		return err
	})
	app.Listen(":" + port)
}
