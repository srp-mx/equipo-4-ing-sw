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
