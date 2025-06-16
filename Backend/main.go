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
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/srp-mx/equipo-4-ing-sw/assets"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/routes"
)

// Entry-point
func main() {
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

	// Added CORS setup
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

	// Added to debug responses
	app.Use(func(c *fiber.Ctx) error {
		fmt.Println(">>> EMITTING NEW RESPONSE <<<")
		err := c.Next()
		fmt.Println("Body:", c.Response().String())
		return err
	})

	// Routes
	routes.SetupRoutes(app)

	// Wait for assets and database
	if err := database.ConnectDb(); err != nil {
		log.Fatal("Database connection failed\n", err)
		os.Exit(2)
	}
	if err := assets.LoadAssetRepository(); err != nil {
		log.Fatal("Asset loading failed\n", err)
		os.Exit(2)
	}

	// Start listening
	log.Println("Listening...")
	log.Fatal(app.Listen(":3000"))
}
