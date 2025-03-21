package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/handlers"
	"github.com/srp-mx/equipo-4-ing-sw/middlewares"
)

func setupRoutes(app *fiber.App) {
	jwt := middlewares.NewAuthMiddleware()

	app.Post("/login", handlers.Login)
	app.Post("/register", handlers.Register)

    app.Post("/class", jwt, handlers.PostClass)
    app.Get("/class", jwt, handlers.GetClass)
    app.Delete("/class", jwt, handlers.DeleteClass)
    app.Patch("/class", jwt, handlers.PatchClass)

    //app.Post("/assignment", jwt, )
    //app.Get("/assignment", jwt, )
    //app.Delete("/assignment", jwt, )
    //app.Patch("/assignment", jwt, )

	app.Get("/landing", jwt, handlers.Landing)
	app.Post("/landing", jwt, handlers.LandingPostData)

}
