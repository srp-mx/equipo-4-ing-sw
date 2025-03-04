package main

import (
	"log"
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/database"
)

func main() {
	database.ConnectDb()
	app := fiber.New()
	
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Estudiantica")
	})
	
	log.Fatal(app.Listen(":3000"))
}
