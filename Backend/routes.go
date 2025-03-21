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
	app.Post("/verify_formula", handlers.VerifyFormula)

	app.Post("/class", jwt, handlers.PostClass)
	app.Get("/class", jwt, handlers.GetClass)
	app.Delete("/class", jwt, handlers.DeleteClass)
	app.Patch("/class", jwt, handlers.PatchClass)

	app.Post("/class_assignments", jwt, handlers.GetClassAssignments)
	app.Post("/class_tags", jwt, handlers.GetClassTags)
	app.Post("/class_grade", jwt, handlers.GetClassGrade)

	app.Post("/assignment", jwt, handlers.PostAssignment)
	app.Get("/assignment", jwt, handlers.GetAssignment)
	app.Delete("/assignment", jwt, handlers.DeleteAssignment)
	app.Patch("/assignment", jwt, handlers.PatchAssignment)
}
