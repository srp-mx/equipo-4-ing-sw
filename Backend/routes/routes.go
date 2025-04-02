/*Copyright (C) 2025

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/handlers"
	"github.com/srp-mx/equipo-4-ing-sw/middlewares"
)

// Sets up the API
func SetupRoutes(app *fiber.App) {
	jwt := middlewares.NewAuthMiddleware()

	app.Post("/login", handlers.Login)
	app.Post("/register", handlers.Register)
	app.Post("/verify_formula", handlers.VerifyFormula)

	app.Get("/refresh_token", jwt, handlers.RefreshToken)
	app.Get("/user_classes", jwt, handlers.GetUserClasses)

	app.Post("/post_class", jwt, handlers.PostClass)
	app.Get("/get_class", jwt, handlers.GetClass)
	app.Post("/delete_class", jwt, handlers.DeleteClass)
	app.Post("/patch_class", jwt, handlers.PatchClass)

	app.Get("/class_assignments", jwt, handlers.GetClassAssignments)
	app.Get("/class_tags", jwt, handlers.GetClassTags)
	app.Get("/class_grade", jwt, handlers.GetClassGrade)

	app.Post("/post_assignment", jwt, handlers.PostAssignment)
	app.Get("/get_assignment", jwt, handlers.GetAssignment)
	app.Post("/delete_assignment", jwt, handlers.DeleteAssignment)
	app.Post("/patch_assignment", jwt, handlers.PatchAssignment)
}
