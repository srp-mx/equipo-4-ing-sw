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

	app.Post("/post_class", jwt, handlers.PostClass)
	app.Post("/get_class", jwt, handlers.GetClass)
	app.Post("/delete_class", jwt, handlers.DeleteClass)
	app.Post("/patch_class", jwt, handlers.PatchClass)

	app.Post("/class_assignments", jwt, handlers.GetClassAssignments)
	app.Post("/class_tags", jwt, handlers.GetClassTags)
	app.Post("/class_grade", jwt, handlers.GetClassGrade)

	app.Post("/post_assignment", jwt, handlers.PostAssignment)
	app.Post("/get_assignment", jwt, handlers.GetAssignment)
	app.Post("/delete_assignment", jwt, handlers.DeleteAssignment)
	app.Post("/patch_assignment", jwt, handlers.PatchAssignment)
}
