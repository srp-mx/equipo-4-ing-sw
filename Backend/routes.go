package main

import (
	"github.com/srp-mx/equipo-4-ing-sw/handlers"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	app.Get("/", handlers.Home)
	
}
