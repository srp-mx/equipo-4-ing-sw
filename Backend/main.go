package main

import (
	"log"
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/handlers"
	"github.com/srp-mx/equipo-4-ing-sw/middlewares"
	"html/template"
)

func main() {
	database.ConnectDb()
	app := fiber.New()

    jwt := middlewares.NewAuthMiddleware()
	
	app.Use(func(c *fiber.Ctx) error {
		// Crear una nueva plantilla HTML
		tmpl, err := template.ParseFiles("views/index.html")
		if err != nil {
			return err
		}

		// Ejecutar la plantilla
		return tmpl.Execute(c.Response().BodyWriter(), fiber.Map{
			"Title": "Bienvenido a Estudiantika",
		})
	})
	app.Get("/", handlers.Home)

    app.Post("/login", handlers.Login)

    app.Get("/landing", jwt, handlers.Landing)
	
	log.Fatal(app.Listen(":3000"))
}
