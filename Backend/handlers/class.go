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
	"regexp"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
)

// Generic class request structure
type classRequest struct {
	user  models.User  `json:"user"`
	class models.Class `json:"class"`
}

// Handles /post_class
func PostClass(c *fiber.Ctx) error {
	request, err := initClassRequest(c)
	if err != nil {
		return err
	}

	classes := controllers.NewClassController(database.DB.Db)
	if exists, err := classes.Exists(request.class); exists || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    409,
				Message: "Una materia con esa especificación ya existe.",
			},
		})
	}

	request.class.GradeFormula = strings.TrimSpace(request.class.GradeFormula)

	form, err := utils.NewFormula(request.class.GradeFormula)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(form)
	}

	if !form.VerifyPlausibility() {
		return c.Status(fiber.StatusBadRequest).JSON(*form)
	}

	re := regexp.MustCompile(`^[0-9A-Fa-f]{8}$`)
	if !re.MatchString(request.class.Color) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    400,
				Message: "El color de la materia no es válido.",
			},
		})
	}

	err = classes.CreateClass(&request.class)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.ErrInternalServerError)
	}

	err = classes.Get(&request.class)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(fiber.Map{
		"user":    request.user,
		"class":   request.class,
		"formula": form,
	})
}

// Handles /get_class
func GetClass(c *fiber.Ctx) error {
	request, err := initClassRequest(c)
	if err != nil {
		return err
	}

	classes := controllers.NewClassController(database.DB.Db)

    exists, err := classes.Exists(request.class)

    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error" : fiber.ErrInternalServerError,
        })
    }

	if !exists {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La clase no se encontró.",
			},
		})
	}

	err = classes.Get(&request.class)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(request.class)
}

// Handles /delete_class
func DeleteClass(c *fiber.Ctx) error {
	request, err := initClassRequest(c)
	if err != nil {
		return err
	}

	classes := controllers.NewClassController(database.DB.Db)

	if exists, err := classes.Exists(request.class); !exists || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La clase no se encontró.",
			},
		})
	}

	err = classes.DeleteClass(&request.class)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}

// Handles /patch_class
func PatchClass(c *fiber.Ctx) error {

    type classPatchRequest struct {
        classRequest
        newClass models.Class `json:"new_class"`
    }

    var request *classPatchRequest
    request, err := parseRequest[classPatchRequest](c)

    if err != nil {
        return err
    }

    err = checkJwt(c, &request.user)
    if err != nil {
        return err
    }

    if request.class.OwnerUsername != request.user.Username {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": fiber.Error{
                Code: 401,
                Message: "El usuario dueño de la clase debe ser quien la accede.",
            },
        })
    }

    users := controllers.NewUserController(database.DB.Db)
    err = users.Get(&request.user)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": fiber.Error{
                Code: 401,
                Message: "El usuario no existe.",
            },
        })
    }

	classes := controllers.NewClassController(database.DB.Db)

	if exists, err := classes.Exists(request.class); !exists || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La clase no se encontró.",
			},
		})
	}

    err = classes.Get(&request.class)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": fiber.Error{
                Code: 500,
                Message: err.Error(),
            },
        })
    }

	var requestJson map[string]any
	if err := json.Unmarshal(c.Body(), &requestJson); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
                Code: 400,
                Message: "Invalid JSON",
            },
		})
	}

    newClass, exists := requestJson["new_class"]
    if !exists {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
                Code: 400,
                Message: "Invalid JSON",
            },
		})
    }

    updates, ok := newClass.(map[string]any)
    if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
                Code: 400,
                Message: "Invalid JSON",
            },
		})
    }

	err = classes.UpdateWithMap(&request.class, updates)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    400,
				Message: "No se pudo actualizar.\n" + err.Error(),
			},
		})
	}

	err = classes.Get(&request.class)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(fiber.Map{
		"class": request.class,
	})
}

// Handles /class_assignments
func GetClassAssignments(c *fiber.Ctx) error {
	request, err := initClassRequest(c)
	if err != nil {
		return err
	}

	classes := controllers.NewClassController(database.DB.Db)

	if exists, err := classes.Exists(request.class); !exists || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La clase no se encontró.",
			},
		})
	}

	err = classes.Get(&request.class)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	err = classes.LoadAssignments(&request.class)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(request.class)
}

// Handles /class_tags
func GetClassTags(c *fiber.Ctx) error {
	request, err := initClassRequest(c)
	if err != nil {
		return err
	}

	classes := controllers.NewClassController(database.DB.Db)

	if exists, err := classes.Exists(request.class); !exists || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La clase no se encontró.",
			},
		})
	}

	tags, err := classes.GetTags(&request.class)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(tags)
}

// Handles /class_grade
func GetClassGrade(c *fiber.Ctx) error {
	request, err := initClassRequest(c)
	if err != nil {
		return err
	}

	classes := controllers.NewClassController(database.DB.Db)

	if exists, err := classes.Exists(request.class); !exists || err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    404,
				Message: "La clase no se encontró.",
			},
		})
	}

	grade, err := classes.GetGrade(&request.class)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).
			JSON(fiber.ErrInternalServerError)
	}

	return c.JSON(fiber.Map{
		"grade": grade,
	})
}

// Utility function to initialize and verify the incoming class request
func initClassRequest(c *fiber.Ctx) (*classRequest, error) {
	var request *classRequest
	request, err := parseRequest[classRequest](c)

	if err != nil {
		return nil, err
	}

	err = checkJwt(c, &request.user)
	if err != nil {
		return nil, err
	}

	if request.class.OwnerUsername != request.user.Username {
		return nil, c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    401,
				Message: "El usuario dueño de la clase debe ser quien la accede.",
			},
		})
	}

    userController := controllers.NewUserController(database.DB.Db)
    err = userController.Get(&request.user)
    if err != nil {
		return nil, c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": fiber.Error{
				Code:    401,
				Message: "El usuario no existe.",
			},
		})
    }

	return request, nil
}
