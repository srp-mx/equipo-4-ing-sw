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
	"regexp"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
)

// Handles /post_class
func PostClass(c *fiber.Ctx) error {
	// Gets user asking this
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Builds a new class from the body
	newClass, err := parseRequestBody[models.Class](c)
	if err != nil {
		return err
	}

	// Assigns the user as the class' owner
	newClass.OwnerUsername = user.Username

	// Checks if there already is a class with the same candidate key
	classes := controllers.NewClassController(database.DB.Db)
	yes, err := classes.Exists(*newClass)
	if err != nil {
		return getServerErr(c)
	} else if yes {
		return getConflict(c, "Una clase con estos datos ya existe.")
	}

	// Validate and clean the grading formula
	newClass.GradeFormula = strings.TrimSpace(newClass.GradeFormula)
	form, err := utils.NewFormula(newClass.GradeFormula)
	if err != nil || !form.VerifyPlausibility() {
		return getBadReq(c, form.Error.Error())
	}

	// Validate the color field
	newClass.Color = strings.TrimSpace(newClass.Color)
	re := regexp.MustCompile(`^[0-9A-Fa-f]{8}$`)
	if !re.MatchString(newClass.Color) {
		return getBadReq(c, "El color de la materia no es válido.")
	}

	// Create the class (creation should fill in the ID field)
	err = classes.CreateClass(newClass)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"class_id": newClass.ID,
	})
}

// Handles /get_class
func GetClass(c *fiber.Ctx) error {
	class := models.Class{}
	err := getClassInGetRequest(c, &class)
	if err != nil {
		return err
	}
	return c.JSON(class)
}

// Handles /delete_class
func DeleteClass(c *fiber.Ctx) error {
	// Get the user requesting this to determine if we should actually do it
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Parse the body
	class, err := parseRequestBody[models.Class](c)
	if err != nil {
		return err
	}

	// Get the class to remove
	classes := controllers.NewClassController(database.DB.Db)
	err = classes.Get(class)
	if err != nil || class.OwnerUsername != user.Username {
		return getNotFound(c, "La clase a borrar no existe.")
	}

	// Remove
	err = classes.DeleteClass(class)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}

// Handles /patch_class
func PatchClass(c *fiber.Ctx) error {
	// Get the user requesting this
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Request type
	type ClassPatchRequest struct {
		Class    models.Class   `json:"class"`
		NewClass map[string]any `json:"new_class"`
	}
	request, err := parseRequestBody[ClassPatchRequest](c)
	if err != nil {
		return err
	}

	// Get the Class object
	classes := controllers.NewClassController(database.DB.Db)
	err = classes.Get(&request.Class)
	if err != nil || request.Class.OwnerUsername != user.Username {
		return getNotFound(c, "No existe la clase a actualizar.")
	}

	// Do the updates
	err = classes.UpdateWithMap(&request.Class, request.NewClass)
	if err != nil {
		return getBadReq(c, "No se pudo actualizar.\n"+err.Error())
	}

	// Obtain the class with the new information on the database
	err = classes.Get(&request.Class)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(request.Class)
}

// Handles /class_assignments
func GetClassAssignments(c *fiber.Ctx) error {
	// Get the class
	class := models.Class{}
	err := getClassInGetRequest(c, &class)
	if err != nil {
		return err
	}

	// Fill in the class' assignments
	classes := controllers.NewClassController(database.DB.Db)
	err = classes.LoadAssignments(&class)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(class.Assignments)
}

// Handles /class_tags
func GetClassTags(c *fiber.Ctx) error {
	// Get the class
	class := models.Class{}
	err := getClassInGetRequest(c, &class)
	if err != nil {
		return err
	}

	// Fill in the tags
	classes := controllers.NewClassController(database.DB.Db)
	tags, err := classes.GetTags(&class)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(tags)
}

// Handles /class_grade
func GetClassGrade(c *fiber.Ctx) error {
	// Get the class
	class := models.Class{}
	err := getClassInGetRequest(c, &class)
	if err != nil {
		return err
	}

	// Get the grade
	classes := controllers.NewClassController(database.DB.Db)
	grade, err := classes.GetGrade(&class)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"grade": grade,
	})
}

// Helper function to get the validated class related to the GET request
func getClassInGetRequest(c *fiber.Ctx, class *models.Class) error {
	// Get the user requesting this to determine if we should actually do it
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Get class ID requested
	classId, err := getQueryId(c)
	if err != nil {
		return err
	}

	// Make a class skeleton
	class.ID = classId

	// Get the class asked
	classes := controllers.NewClassController(database.DB.Db)
	err = classes.Get(class)
	if err != nil || class.OwnerUsername != user.Username {
		return getNotFound(c, "No se encontró la clase.")
	}

	return nil
}
