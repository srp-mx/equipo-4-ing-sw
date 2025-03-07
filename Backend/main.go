package main

import (
	"log"
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/handlers"
	"github.com/srp-mx/equipo-4-ing-sw/middlewares"
)

func main() {
	database.ConnectDb()
	app := fiber.New()

    jwt := middlewares.NewAuthMiddleware()
	
	app.Get("/", handlers.Home)

    app.Post("/login", handlers.Login)

    app.Get("/landing", jwt, handlers.Landing)
	
	log.Fatal(app.Listen(":3000"))
}
