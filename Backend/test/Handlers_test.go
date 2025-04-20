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

package test

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/utils"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/stretchr/testify/assert"
)

// Tests the handlers
func TestHandlers(t *testing.T) {
	resetDb()
	fillDummyDb()

	app.Get("/test", func(c *fiber.Ctx) error {
		return c.SendString("testing")
	})

	t.Run("Test for endpoint testing framework", testEndpoint)

	t.Run("Test for /login", testLogin)
	t.Run("Test for /register", testRegister)
	t.Run("Test for /verify_formula", testVerifyFormula)

	t.Run("Test for /user_classes", testUserClasses)

	t.Run("Test for /post_class", testPostClass)
	resetDb()
	fillDummyDb()
	t.Run("Test for /get_class", testGetClass)
	t.Run("Test for /delete_class", testDeleteClass)
	t.Run("Test for /patch_class", testPatchClass)

	t.Run("Test for /class_assignments", testClassAssignments)
	resetDb()
	fillDummyDb()
	t.Run("Test for /class_tags", testClassTags)
	t.Run("Test for /class_grade", testClassGrade)

	t.Run("Test for /post_assignment", testPostAssignment)
	resetDb()
	fillDummyDb()
	t.Run("Test for /get_assignment", testGetAssignment)
	t.Run("Test for /delete_assignment", testDeleteAssignment)
	t.Run("Test for /patch_assignment", testPatchAssignment)
}

// Tests the endpoint testing framework
func testEndpoint(t *testing.T) {
	req := httptest.NewRequest("GET", "/test", nil)
	resp, err := app.Test(req, -1)
	assert.Nil(t, err)
	assert.Equal(t, fiber.StatusOK, resp.StatusCode)
	body, _ := io.ReadAll(resp.Body)
	assert.Equal(t, "testing", string(body))
}

// Test for the /login route
func testLogin(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /register route
func testRegister(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /verify_formula route
func testVerifyFormula(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /user_classes route
func testUserClasses(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /post_class route
func testPostClass(t *testing.T) {
	// The BODY to send to the endpoint
	payload := map[string]any{
		"name":          "mate",
		"start_date":    "2025-03-29T15:47:00Z",
		"end_date":      "2025-03-30T15:47:00Z",
		"grade_formula": "0.3*average(tareas) + 0.7*average(examenes)",
		"color":         "FFFFFFFF",
	}

	// The response collected with the interpreted class_id field
	resp := postWithAuth(t, "/post_class", payload)
	idAny, ok := resp["class_id"]
	assert.True(t, ok)
	id := uint(idAny.(float64))

	// We retrieve the created class from the database
	classes := controllers.NewClassController(database.DB.Db)
	class := models.Class{ID: id}
	err := classes.Get(&class)
	assert.NoError(t, err)

	// We check that the fields match

	assert.Equal(t, payload["name"], class.Name)

	startTime, err := time.Parse(controllers.DATETIME_FMT, payload["start_date"].(string))
	assert.NoError(t, err)
	assert.Equal(t, startTime, class.StartDate)

	endTime, err := time.Parse(controllers.DATETIME_FMT, payload["end_date"].(string))
	assert.NoError(t, err)
	assert.Equal(t, endTime, class.EndDate)

	assert.Equal(t, payload["grade_formula"], class.GradeFormula)

	assert.Equal(t, payload["color"], class.Color)
}

// Test for the /get_class route
func testGetClass(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /delete_class route
func testDeleteClass(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /patch_class route
func testPatchClass(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /class_assignments route
func testClassAssignments(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /class_tags route
func testClassTags(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /class_grade route
func testClassGrade(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /post_assignment route
func testPostAssignment(t *testing.T) {
	// Get the test user's testing class
	users := controllers.NewUserController(database.DB.Db)
	user := models.User{
		Username: "test",
	}
	err := users.Get(&user)
	assert.NoError(t, err)
	err = users.LoadClasses(&user)
	assert.NoError(t, err)

	// The BODY to send to the endpoint
	payload := map[string]any{
		"class_id": user.Classes[0].ID,
		"due_date": "2025-04-29T15:47:00Z",
		"notes":    "Hello, world!",
		"grade":    0.0,
		"name":     "Homework 2",
		"optional": false,
		"progress": 0,
		"tag":      "homework",
	}

	// The response collected with the interpreted assignment_id field
	resp := postWithAuth(t, "/post_assignment", payload)
	idAny, ok := resp["assignment_id"]
	assert.True(t, ok)
	id := uint(idAny.(float64))

	// We retrieve the created assignment from the database
	assignments := controllers.NewAssignmentController(database.DB.Db)
	assignment := models.Assignment{ID: id}
	err = assignments.Get(&assignment)
	assert.NoError(t, err)

	// We check that the fields match

	assert.Equal(t, payload["class_id"], assignment.ClassID)

	dueDate, err := time.Parse(controllers.DATETIME_FMT, payload["due_date"].(string))
	assert.NoError(t, err)
	assert.Equal(t, dueDate, assignment.DueDate)

	assert.Equal(t, payload["notes"], assignment.Notes)

	assert.Equal(t, payload["grade"], assignment.Grade)

	assert.Equal(t, payload["name"], assignment.Name)

	assert.Equal(t, payload["optional"], assignment.Optional)

	assert.Equal(t, payload["progress"], assignment.Progress)

	assert.Equal(t, payload["tag"], assignment.Tag)
}

// Test for the /get_assignment route
func testGetAssignment(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /delete_assignment route
func testDeleteAssignment(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Test for the /patch_assignment route
func testPatchAssignment(t *testing.T) {
	// TODO
	assert.True(t, true)
}

// Fills up the database with dummy values
func fillDummyDb() {
	// Controllers
	var users = controllers.NewUserController(db)
	var classes = controllers.NewClassController(db)
	var assignments = controllers.NewAssignmentController(db)

	// User
	user := models.User{
		Username: "test",
		Name:     "Test",
		Email:    "test@test.com",
		Password: "test",
	}

	if err := users.CreateUser(&user); err != nil {
		panic(err)
	}

	// Class
	class := models.Class{
		Name:          "math",
		StartDate:     time.Now(),
		EndDate:       time.Now().Add(128 * 24 * time.Hour),
		OwnerUsername: "test",
		GradeFormula:  "0.3*average(homework) + 0.7*average(exams)",
		Color:         "FFFFFFFF",
	}

	if err := classes.CreateClass(&class); err != nil {
		panic(err)
	}

	if err := users.LoadClasses(&user); err != nil {
		panic(err)
	}

	class = user.Classes[0]

	// Assignment
	homework := models.Assignment{
		ClassID:  class.ID,
		DueDate:  time.Now().Add(time.Hour),
		Notes:    "Lorem ipsum dolor sit amet",
		Grade:    9.6,
		Name:     "Homework 1",
		Optional: false,
		Progress: 1,
		Tag:      "homework",
	}

	exam := models.Assignment{
		ClassID:  class.ID,
		DueDate:  time.Now().Add(time.Hour),
		Notes:    "Lorem ipsum dolor sit amet",
		Grade:    8.7,
		Name:     "Midterm",
		Optional: false,
		Progress: 1,
		Tag:      "exams",
	}

	if err := assignments.CreateAssignment(&homework); err != nil {
		panic(err)
	}

	if err := assignments.CreateAssignment(&exam); err != nil {
		panic(err)
	}

	if err := classes.LoadAssignments(&class); err != nil {
		panic(err)
	}

	if class.Assignments[0].Tag == "homework" {
		homework = class.Assignments[0]
		exam = class.Assignments[1]
	} else {
		exam = class.Assignments[0]
		homework = class.Assignments[1]
	}
}

// Sends a POST payload with credentials
func postWithAuth(t *testing.T, route string, payload map[string]any) map[string]any {
	jsonContent, _ := json.Marshal(payload)
	req := httptest.NewRequest("POST", route, bytes.NewBuffer(jsonContent))
	tok := getToken(t)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+tok)

	resp, err := app.Test(req)
	assert.NoError(t, err)
	bytes, err := io.ReadAll(resp.Body)
	assert.NoError(t, err)
	body := utils.CopyBytes(bytes)
	var resultMap map[string]any
	err = json.Unmarshal(body, &resultMap)

	assert.Equal(t, fiber.StatusOK, resp.StatusCode, string(body))
	return resultMap
}

// Gets the token for the testing user
func getToken(t *testing.T) string {
	jsonContent, _ := json.Marshal(map[string]string{
		"email":    "test@test.com",
		"password": "test",
	})
	req := httptest.NewRequest("POST", "/login", bytes.NewBuffer(jsonContent))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	assert.NoError(t, err)
	assert.Equal(t, resp.StatusCode, fiber.StatusOK)

	bytes, err := io.ReadAll(resp.Body)
	assert.NoError(t, err)
	body := utils.CopyBytes(bytes)
	var resultMap map[string]string
	err = json.Unmarshal(body, &resultMap)
	return resultMap["token"]
}
