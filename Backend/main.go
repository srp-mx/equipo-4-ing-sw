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
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"log"
)

func main() {
	database.ConnectDb()
	app := fiber.New()

    app.Use(cors.New(cors.Config {
        AllowHeaders: "Origin,Content-Type,Connection,Access-Control-Allow-Origin",
    AllowOrigins: "http://localhost:3001",
        AllowCredentials: true,
        AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
    }))

    setupRoutes(app)
	  log.Fatal(app.Listen(":3000"))
}
