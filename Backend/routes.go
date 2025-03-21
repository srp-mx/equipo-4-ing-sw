package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/handlers"
	"github.com/srp-mx/equipo-4-ing-sw/middlewares"
)

func setupRoutes(app *fiber.App) {
	jwt := middlewares.NewAuthMiddleware()
	app.Get("/", handlers.Home)

	app.Post("/login", handlers.Login)

	app.Get("/landing", jwt, handlers.Landing)
	app.Post("/landing", jwt, handlers.LandingPostData)

}
