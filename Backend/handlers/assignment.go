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
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
)

// Handles /post_assignment
func PostAssignment(c *fiber.Ctx) error {
	// Gets user asking this
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Parses the assignment
	newAssignment, err := parseRequestBody[models.Assignment](c)
	if err != nil {
		return err
	}

	// Rejects assignments without a valid class
	users := controllers.NewUserController(database.DB.Db)
	enrolled, err := users.EnrolledIn(user, newAssignment.ClassID)
	if err != nil {
		return getServerErr(c)
	}
	if !enrolled {
		return getNotFound(c, "No se encontró la clase para la asignación.")
	}

	// Clean up the assignment's tag and name
	newAssignment.Tag = strings.TrimSpace(newAssignment.Tag)
	newAssignment.Name = strings.TrimSpace(newAssignment.Name)

	// Validate tag name
	if !utils.ValidTagName(newAssignment.Tag) {
		return getBadReq(c, "El nombre de la etiqueta es inválido.")
	}

	// Create the assignment (the variable's ID field should get populated)
	assignments := controllers.NewAssignmentController(database.DB.Db)
	err = assignments.CreateAssignment(newAssignment)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"assignment_id": newAssignment.ID,
	})
}

// Handles /get_assignment
func GetAssignment(c *fiber.Ctx) error {
	// Get the user requesting this to determine if we should actually do it
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Get assignment ID requested
	assignmentId, err := getQueryId(c)
	if err != nil {
		return err
	}

	// Make an assignment skeleton
	assignment := models.Assignment{ID: assignmentId}

	// Get the assignment asked
	assignments := controllers.NewAssignmentController(database.DB.Db)
	err = assignments.Get(&assignment)
	if err != nil || !assignments.AssignedTo(&assignment, user) {
		return getNotFound(c, "No se encontró la asignación.")
	}

	return c.JSON(assignment)
}

// Handles /delete_assignment
func DeleteAssignment(c *fiber.Ctx) error {
	// Get the user requesting this to determine if we should actually do it
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Parse the assignment
	assignment, err := parseRequestBody[models.Assignment](c)
	if err != nil {
		return err
	}

	// Get the assignment and verify if the user owns it
	assignments := controllers.NewAssignmentController(database.DB.Db)
	err = assignments.Get(assignment)
	if err != nil || !assignments.AssignedTo(assignment, user) {
		return getNotFound(c, "No se encontró la asignación a borrar.")
	}

	// Removal
	err = assignments.DeleteAssignment(assignment)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(fiber.Map{
		"ok": true,
	})
}

// Handles /patch_assignment
func PatchAssignment(c *fiber.Ctx) error {
	// Get the user requesting this
	user, err := getCredentials(c)
	if err != nil {
		return err
	}

	// Request type
	type AssignmentPatchRequest struct {
		Assignment    models.Assignment `json:"assignment"`
		NewAssignment map[string]any    `json:"new_assignment"`
	}
	request, err := parseRequestBody[AssignmentPatchRequest](c)
	if err != nil {
		return err
	}

	// Get the Assignment object
	assignments := controllers.NewAssignmentController(database.DB.Db)
	err = assignments.Get(&request.Assignment)
	if err != nil || !assignments.AssignedTo(&request.Assignment, user) {
		return getNotFound(c, "No existe la asignación a actualizar.")
	}

	// Do the updates
	err = assignments.UpdateWithMap(&request.Assignment, request.NewAssignment)
	if err != nil {
		return getBadReq(c, "No se pudo actualizar.\n"+err.Error())
	}

	// Obtain the assignment with the new information on the database
	err = assignments.Get(&request.Assignment)
	if err != nil {
		return getServerErr(c)
	}

	return c.JSON(request.Assignment)
}
