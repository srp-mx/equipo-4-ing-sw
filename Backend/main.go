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
	"fmt"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/srp-mx/equipo-4-ing-sw/database"
)

// Entry-point
func main() {
	database.ConnectDb()
	app := fiber.New()

	// Added to debug requests
	app.Use(func(c *fiber.Ctx) error {
		fmt.Println(">>> RECEIVED NEW REQUEST <<<")
		fmt.Println("Request Origin:", c.Get("Origin"))
		fmt.Println("Method:", c.Method())
		fmt.Println("URL:", c.OriginalURL())
		fmt.Println("Headers:", c.GetReqHeaders())
		fmt.Println("Body:", string(c.Body()))
		return c.Next()
	})

	app.Use(cors.New(cors.Config{
		AllowHeaders: strings.Join([]string{
			fiber.HeaderOrigin,
			fiber.HeaderContentType,
			fiber.HeaderConnection,
			fiber.HeaderAccessControlAllowOrigin,
			fiber.HeaderAccessControlAllowCredentials,
			fiber.HeaderAccessControlAllowHeaders,
			fiber.HeaderAccessControlAllowMethods,
			fiber.HeaderAuthorization,
		}, ","),
		AllowOrigins:     "http://localhost:3001",
		AllowCredentials: true,
		AllowMethods: strings.Join([]string{
			fiber.MethodGet,
			fiber.MethodPost,
			fiber.MethodHead,
			fiber.MethodPut,
			fiber.MethodDelete,
			fiber.MethodPatch,
			fiber.MethodOptions,
		}, ","),
	}))

	setupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
