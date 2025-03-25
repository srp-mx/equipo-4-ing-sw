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

package handlers

import (
	"encoding/json"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
)

type assignmentRequest struct {
	user       models.User
	class      models.Class
	assignment models.Assignment
}

func PostAssignment(c *fiber.Ctx) error {
	request, err := initAssignmentRequest(c)
	if err != nil {
		return err
	}

	assignments := controllers.NewAssignmentController(database.DB.Db)

	request.assignment.Tag = strings.TrimSpace(request.assignment.Tag)

	if !utils.ValidTagName(request.assignment.Tag) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    400,
				Message: "El nombre de etiqueta es inválido.",
			},
		})
	}

	err = assignments.CreateAssignment(&request.assignment)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.ErrInternalServerError)
	}

	err = assignments.Get(&request.assignment)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(fiber.Map{
		"user":       request.user,
		"class":      request.class,
		"assignment": request.assignment,
	})
}

func GetAssignment(c *fiber.Ctx) error {
	request, err := initAssignmentRequest(c)
	if err != nil {
		return err
	}

	assignments := controllers.NewAssignmentController(database.DB.Db)

    exists, err := assignments.Exists(request.assignment)

    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error" : fiber.ErrInternalServerError,
        })
    }

	if !exists {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La asignación no se encontró.",
			},
		})
	}

	err = assignments.Get(&request.assignment)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(request.assignment)
}

func DeleteAssignment(c *fiber.Ctx) error {
	request, err := initAssignmentRequest(c)
	if err != nil {
		return err
	}

	assignments := controllers.NewAssignmentController(database.DB.Db)

	if exists, err := assignments.Exists(request.assignment); !exists || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La asignación no se encontró.",
			},
		})
	}

	err = assignments.DeleteAssignment(&request.assignment)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}

func PatchAssignment(c *fiber.Ctx) error {
	request, err := initAssignmentRequest(c)
	if err != nil {
		return err
	}

	assignments := controllers.NewAssignmentController(database.DB.Db)

	if exists, err := assignments.Exists(request.assignment); !exists || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La asignación no se encontró.",
			},
		})
	}

	var updates map[string]any
	if err := json.Unmarshal(c.Body(), &updates); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON",
		})
	}

	err = assignments.UpdateWithMap(&request.assignment, updates)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    400,
				Message: "No se pudo actualizar.\n" + err.Error(),
			},
		})
	}

	err = assignments.Get(&request.assignment)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(fiber.Map{
		"assignment": request.assignment,
	})
}

func initAssignmentRequest(c *fiber.Ctx) (*assignmentRequest, error) {
	var request *assignmentRequest
	request, err := parseRequest[assignmentRequest](c)

	if err != nil {
		return nil, err
	}

	err = checkJwt(c, &request.user)
	if err != nil {
		return nil, err
	}

	if request.class.OwnerUsername != request.user.Username {
		return nil, c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    400,
				Message: "El usuario dueño de la clase debe ser quien la accede.",
			},
		})
	}

	if request.class.ID != request.assignment.ClassID {
		return nil, c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    400,
				Message: "La asignación debe ser de la clase adecuada.",
			},
		})
	}

	return request, nil
}
