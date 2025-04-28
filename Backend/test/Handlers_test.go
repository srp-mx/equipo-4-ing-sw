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
	"math"
	"net/http/httptest"
	"net/url"
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
	refillDummyDb()

	app.Get("/test", func(c *fiber.Ctx) error {
		return c.SendString("testing")
	})

	t.Run("Test for endpoint testing framework", testEndpoint)

	t.Run("Test for /login", testLogin)
	t.Run("Test for /register", testRegister)
	t.Run("Test for /verify_formula", testVerifyFormula)

	t.Run("Test for /user_classes", testUserClasses)

	t.Run("Test for /post_class", testPostClass)
	t.Run("Test for /get_class", testGetClass)
	t.Run("Test for /delete_class", testDeleteClass)
	t.Run("Test for /patch_class", testPatchClass)

	t.Run("Test for /class_assignments", testClassAssignments)
	t.Run("Test for /class_tags", testClassTags)
	t.Run("Test for /class_grade", testClassGrade)

	t.Run("Test for /post_assignment", testPostAssignment)
	t.Run("Test for /get_assignment", testGetAssignment)
	t.Run("Test for /delete_assignment", testDeleteAssignment)
	t.Run("Test for /patch_assignment", testPatchAssignment)

	t.Run("Test for /post_character", testPostCharacter)
	t.Run("Test for /delete_character", testDeleteCharacter)
	t.Run("Test for /patch_character", testPatchCharacter)

	t.Run("Test for /character_basic_data", testCharacterBasicData)
	t.Run("Test for /character_stats", testCharacterStats)
	t.Run("Test for /character_next_refresh", testCharacterNextRefresh)
	t.Run("Test for /character_free_skill", testCharacterFreeSkill)
	t.Run("Test for /character_add_skills", testCharacterAddSkills)

	t.Run("Test for /get_character_wears", testGetCharacterWears)
	t.Run("Test for /get_character_equips", testGetCharacterEquips)
	t.Run("Test for /get_character_accompanies", testGetCharacterAccompanies)
	t.Run("Test for /character_armors", testCharacterArmors)
	t.Run("Test for /character_pets", testCharacterPets)
	t.Run("Test for /character_weapons", testCharacterWeapons)
	t.Run("Test for /post_character_wears", testPostCharacterWears)
	t.Run("Test for /post_character_equips", testPostCharacterEquips)
	t.Run("Test for /post_character_accompanies", testPostCharacterAccompanies)
	t.Run("Test for /rename_armor", testRenameArmor)
	t.Run("Test for /rename_weapon", testRenameWeapon)
	t.Run("Test for /rename_pet", testRenamePet)
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
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

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
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

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

// Test for the /post_character route
func testPostCharacter(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Sneakily delete the user's character just for this test
	users := controllers.NewUserController(db)
	user := models.User{Username: "test"}
	err := users.LoadCharacter(&user)
	assert.NoError(t, err)
	characters := controllers.NewCharacterController(db)
	characters.DeleteCharacter(user.Character)

	// The BODY to send to the endpoint
	payload := map[string]any{
		"name": "testington",
	}

	// Get and verify the response
	resp := postWithAuth(t, "/post_character", payload)
	respNameAny, ok := resp["character_name"]
	assert.True(t, ok)
	respName, ok := respNameAny.(string)
	assert.True(t, ok)
	assert.Equal(t, "testington", respName)

	// Check that the character created on the database makes sense
	err = users.LoadCharacter(&user)
	assert.NoError(t, err)
	assert.NotNil(t, user.Character)
	assert.True(t, time.Now().Add(-time.Hour).Before(user.Character.MomentOfLatestAction))
	assert.Equal(t, user.Username, user.Character.UserUsername)
	assert.Equal(t, "testington", user.Character.Name)
}

// Test for the /delete_character route
func testDeleteCharacter(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Get the response
	resp := postWithAuth(t, "/delete_character", map[string]any{})
	okAny, ok := resp["ok"]
	assert.True(t, ok)

	// Interpret the ok
	okk, ok := okAny.(bool)
	assert.True(t, ok)
	assert.True(t, okk)

	// Verify deletion
	users := controllers.NewUserController(db)
	user := models.User{Username: "test"}
	err := users.LoadCharacter(&user)
	assert.NoError(t, err)
	assert.Nil(t, user.Character)
}

// Test for the /patch_character route
func testPatchCharacter(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// The BODY to send to the endpoint
	payload := map[string]any{
		"name": "testington",
	}

	// Get the response and verify it
	resp := postWithAuth(t, "/patch_character", payload)
	nameAny, ok := resp["name"]
	assert.True(t, ok)
	name, ok := nameAny.(string)
	assert.True(t, ok)
	assert.Equal(t, "testington", name)

	// Check if it was modified on the database successfully
	users := controllers.NewUserController(db)
	user := models.User{Username: "test"}
	err := users.LoadCharacter(&user)
	assert.NoError(t, err)
	assert.Equal(t, "testington", user.Character.Name)
}

// Test for the /character_basic_data route
func testCharacterBasicData(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/character_basic_data", map[string]string{})

	// Make a struct for easier unwrapping
	type Resp struct {
		Alive bool             `json:"alive"`
		Data  models.Character `json:"data"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// Get the character from the DB to cross-reference the response
	users := controllers.NewUserController(db)
	user := models.User{Username: "test"}
	err = users.LoadCharacter(&user)
	assert.NoError(t, err)

	// Verify response
	assert.True(t, interpResp.Alive)
	assert.Equal(t, user.Character.ID, interpResp.Data.ID)
	assert.Equal(t, user.Character.UserUsername, interpResp.Data.UserUsername)
	assert.Equal(t, user.Character.Name, interpResp.Data.Name)
	assert.Equal(t, user.Character.MomentOfLatestAction.UTC(),
		interpResp.Data.MomentOfLatestAction.UTC())
	assert.Equal(t, user.Character.Streak, interpResp.Data.Streak)
	assert.Equal(t, user.Character.Hp, interpResp.Data.Hp)
}

// Test for the /character_stats route
func testCharacterStats(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/character_stats", map[string]string{})

	// Make a struct for easier unwrapping
	type Stats struct {
		Skills             models.CharacterStats `json:"skills"`
		StreakBonusPercent float64               `json:"streak_bonus_percent"`
		Xp                 uint64                `json:"xp"`
		Level              int                   `json:"level"`
		LevelPercent       float64               `json:"level_percent"`
		XpToNext           uint64                `json:"xp_to_next_level"`
	}
	type Resp struct {
		Alive bool  `json:"alive"`
		Stats Stats `json:"stats"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// Get the character from the DB to cross-reference the response
	users := controllers.NewUserController(db)
	user := models.User{Username: "test"}
	err = users.LoadCharacter(&user)
	assert.NoError(t, err)

	// Verify the response
	assert.True(t, interpResp.Alive)
	assert.Greater(t, interpResp.Stats.StreakBonusPercent, 0.0)
	assert.Greater(t, interpResp.Stats.Xp, uint64(0))

	// TODO: Modify this when we take items into account for skills
	streakBonus := interpResp.Stats.StreakBonusPercent
	expStrength := user.Character.StrengthExtra
	expStrength += int(math.Round(float64(expStrength) * streakBonus))
	expDefense := user.Character.DefenseExtra
	expDefense += int(math.Round(float64(expDefense) * streakBonus))
	expIntelligence := user.Character.IntelligenceExtra
	expIntelligence += int(math.Round(float64(expIntelligence) * streakBonus))
	expHeart := user.Character.HeartExtra
	expHeart += int(math.Round(float64(expHeart) * streakBonus))
	assert.Equal(t, expStrength, interpResp.Stats.Skills.Strength)
	assert.Equal(t, expDefense, interpResp.Stats.Skills.Defense)
	assert.Equal(t, expIntelligence, interpResp.Stats.Skills.Intelligence)
	assert.Equal(t, expHeart, interpResp.Stats.Skills.Heart)
}

// Test for the /character_next_refresh route
func testCharacterNextRefresh(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/character_next_refresh", map[string]string{})

	// Make a struct for easier unwrapping
	type Timers struct {
		StreakLoss int64 `json:"streak_loss"`
		Deletion   int64 `json:"deletion"`
		NextHeal   int64 `json:"next_heal"`
	}
	type Resp struct {
		Alive     bool   `json:"alive"`
		NextCheck int64  `json:"next_check"`
		Timers    Timers `json:"timers"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// Get the character from the DB to cross-reference the response
	users := controllers.NewUserController(db)
	user := models.User{Username: "test"}
	err = users.LoadCharacter(&user)
	assert.NoError(t, err)
	mola := user.Character.MomentOfLatestAction

	// Construct the times of the next evaluations
	streakLoss := time.Now().
		Add(time.Millisecond * time.Duration(interpResp.Timers.StreakLoss))
	deletion := time.Now().
		Add(time.Millisecond * time.Duration(interpResp.Timers.Deletion))
	nextHeal := time.Now().
		Add(time.Millisecond * time.Duration(interpResp.Timers.NextHeal))

	// Check validity
	millisecondsEpsilon := time.Duration(500 * time.Millisecond)
	assert.True(t, interpResp.Alive)
	assert.LessOrEqual(t, interpResp.NextCheck, interpResp.Timers.StreakLoss)
	assert.LessOrEqual(t, interpResp.NextCheck, interpResp.Timers.Deletion)
	assert.LessOrEqual(t, interpResp.NextCheck, interpResp.Timers.NextHeal)
	expHeal := mola.Truncate(time.Hour).Add(time.Hour).UTC()
	assert.GreaterOrEqual(t, millisecondsEpsilon,
		expHeal.Sub(nextHeal.UTC()).Milliseconds())
	expStreak := mola.Truncate(24*time.Hour).AddDate(0, 0, 2).UTC()
	//assert.Equal(t, expStreak, streakLoss.UTC())
	assert.GreaterOrEqual(t, millisecondsEpsilon,
		expStreak.Sub(streakLoss.UTC()).Milliseconds())
	expDel := mola.AddDate(0, 0, controllers.DAYS_TO_DIE).UTC()
	//assert.Equal(t, expDel, deletion.UTC())
	assert.GreaterOrEqual(t, millisecondsEpsilon,
		expDel.Sub(deletion.UTC()).Milliseconds())
}

// Test for the /character_free_skill route
func testCharacterFreeSkill(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/character_free_skill", map[string]string{})

	// Make a struct for easier unwrapping
	type Resp struct {
		Alive  bool `json:"alive"`
		Points int  `json:"points"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// Since we assigned a lot of skill points, we shouldn't have any left
	assert.GreaterOrEqual(t, 0, interpResp.Points)
}

// Test for the /character_add_skills route
func testCharacterAddSkills(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Set to 1 all skill points to allow testing
	users := controllers.NewUserController(db)
	user := models.User{Username: "test"}
	err := users.LoadCharacter(&user)
	assert.NoError(t, err)
	user.Character.StrengthExtra = 1
	user.Character.DefenseExtra = 1
	user.Character.IntelligenceExtra = 1
	user.Character.HeartExtra = 1
	characters := controllers.NewCharacterController(db)
	characters.UpdateCharacter(user.Character)

	// The BODY to send to the endpoint
	payload := map[string]any{
		"strength":     2,
		"defense":      0,
		"intelligence": 1,
		"heart":        1,
	}

	// Get the response and verify it
	resp := postWithAuth(t, "/character_add_skills", payload)
	okAny, ok := resp["ok"]
	assert.True(t, ok)
	okk, ok := okAny.(bool)
	assert.True(t, ok)
	assert.True(t, okk)

	// Verify modification
	err = users.LoadCharacter(&user)
	assert.NoError(t, err)
	assert.Equal(t, 3, user.Character.StrengthExtra)
	assert.Equal(t, 1, user.Character.DefenseExtra)
	assert.Equal(t, 2, user.Character.IntelligenceExtra)
	assert.Equal(t, 2, user.Character.HeartExtra)
}

// Test for the /get_character_wears route
func testGetCharacterWears(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/get_character_wears", map[string]string{})

	// Make a struct for easier unwrapping
	type Armor struct {
		ID             uint      `json:"id"`
		CreatedAt      time.Time `json:"created_at"`
		Name           string    `json:"name"`
		Rarity         int       `json:"rarity"`
		Description    string    `json:"description"`
		ImageUri       string    `json:"image_uri"`
		Strength       int       `json:"strength"`
		Defense        int       `json:"defense"`
		Intelligence   int       `json:"intelligence"`
		Heart          int       `json:"heart"`
		DamageReceived int       `json:"damage_received"`
		Since          time.Time `json:"since"`
	}
	type Resp struct {
		Alive bool   `json:"alive"`
		Armor *Armor `json:"armor"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// Since the test character has no armor, it should return nil
	assert.True(t, interpResp.Alive)
	assert.Nil(t, interpResp.Armor)
}

// Test for the /get_character_equips route
func testGetCharacterEquips(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/get_character_equips", map[string]string{})

	// Make a struct for easier unwrapping
	type Weapon struct {
		ID           uint      `json:"id"`
		CreatedAt    time.Time `json:"created_at"`
		Name         string    `json:"name"`
		Rarity       int       `json:"rarity"`
		Description  string    `json:"description"`
		ImageUri     string    `json:"image_uri"`
		Strength     int       `json:"strength"`
		Defense      int       `json:"defense"`
		Intelligence int       `json:"intelligence"`
		Heart        int       `json:"heart"`
		SlayCount    int       `json:"slay_count"`
		Since        time.Time `json:"since"`
	}
	type Resp struct {
		Alive  bool    `json:"alive"`
		Weapon *Weapon `json:"weapon"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// Since the test character has a weapon, it should not return nil
	assert.True(t, interpResp.Alive)
	assert.NotNil(t, interpResp.Weapon)
	assert.Equal(t, "weapon1", interpResp.Weapon.Name)
}

// Test for the /get_character_accompanies route
func testGetCharacterAccompanies(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/get_character_accompanies", map[string]string{})

	// Make a struct for easier unwrapping
	type Pet struct {
		ID           uint      `json:"id"`
		CreatedAt    time.Time `json:"created_at"`
		Name         string    `json:"name"`
		Rarity       int       `json:"rarity"`
		Description  string    `json:"description"`
		ImageUri     string    `json:"image_uri"`
		Strength     int       `json:"strength"`
		Defense      int       `json:"defense"`
		Intelligence int       `json:"intelligence"`
		Heart        int       `json:"heart"`
		Bond         int       `json:"bond"`
		Since        time.Time `json:"since"`
	}
	type Resp struct {
		Alive bool `json:"alive"`
		Pet   *Pet `json:"pet"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// Since the test character has no pet, it should return nil
	assert.True(t, interpResp.Alive)
	assert.Nil(t, interpResp.Pet)
}

// Test for the /character_armors route
func testCharacterArmors(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/character_armors", map[string]string{})

	// Make a struct for easier unwrapping
	type Armor struct {
		ID             uint      `json:"id"`
		CreatedAt      time.Time `json:"created_at"`
		Name           string    `json:"name"`
		Rarity         int       `json:"rarity"`
		Description    string    `json:"description"`
		ImageUri       string    `json:"image_uri"`
		Strength       int       `json:"strength"`
		Defense        int       `json:"defense"`
		Intelligence   int       `json:"intelligence"`
		Heart          int       `json:"heart"`
		DamageReceived int       `json:"damage_received"`
		Since          time.Time `json:"since"`
	}
	type Resp struct {
		Alive  bool    `json:"alive"`
		Armors []Armor `json:"armors"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// The character exists and owns two armors
	assert.True(t, interpResp.Alive)
	assert.Len(t, interpResp.Armors, 2)
}

// Test for the /character_pets route
func testCharacterPets(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/character_pets", map[string]string{})

	// Make a struct for easier unwrapping
	type Pet struct {
		ID           uint      `json:"id"`
		CreatedAt    time.Time `json:"created_at"`
		Name         string    `json:"name"`
		Rarity       int       `json:"rarity"`
		Description  string    `json:"description"`
		ImageUri     string    `json:"image_uri"`
		Strength     int       `json:"strength"`
		Defense      int       `json:"defense"`
		Intelligence int       `json:"intelligence"`
		Heart        int       `json:"heart"`
		Bond         int       `json:"bond"`
		Since        time.Time `json:"since"`
	}
	type Resp struct {
		Alive bool  `json:"alive"`
		Pets  []Pet `json:"pets"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// The test character exists and has two pets
	assert.True(t, interpResp.Alive)
	assert.Len(t, interpResp.Pets, 2)
}

// Test for the /character_weapons route
func testCharacterWeapons(t *testing.T) {
	// Get the response
	resp := getWithAuth(t, "/character_weapons", map[string]string{})

	// Make a struct for easier unwrapping
	type Weapon struct {
		ID           uint      `json:"id"`
		CreatedAt    time.Time `json:"created_at"`
		Name         string    `json:"name"`
		Rarity       int       `json:"rarity"`
		Description  string    `json:"description"`
		ImageUri     string    `json:"image_uri"`
		Strength     int       `json:"strength"`
		Defense      int       `json:"defense"`
		Intelligence int       `json:"intelligence"`
		Heart        int       `json:"heart"`
		SlayCount    int       `json:"slay_count"`
		Since        time.Time `json:"since"`
	}
	type Resp struct {
		Alive   bool     `json:"alive"`
		Weapons []Weapon `json:"weapons"`
	}
	interpResp, err := mapToStruct[Resp](resp)
	assert.NoError(t, err)

	// The test character exists and has two weapons
	assert.True(t, interpResp.Alive)
	assert.Len(t, interpResp.Weapons, 2)
}

// Test for the /post_character_wears route
func testPostCharacterWears(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Get the ID of the armor2 item
	var armor models.Armor
	db.Find(&armor, "name='armor2'")

	// The BODY to send to the endpoint
	payload := map[string]any{
		"id": armor.ID,
	}

	// Get the response
	resp := postWithAuth(t, "/post_character_wears", payload)
	aliveAny, ok := resp["alive"]
	assert.True(t, ok)
	alive, ok := aliveAny.(bool)
	assert.True(t, ok)
	assert.True(t, alive)

	// Verify modification
	characters := controllers.NewCharacterController(db)
	character, err := characters.FindByName("test")
	assert.NoError(t, err)
	assert.NoError(t, characters.LoadWearing(character))
	assert.Equal(t, armor, character.Wears.Armor)
}

// Test for the /post_character_equips route
func testPostCharacterEquips(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Get the ID of the weapon2 item
	var weapon models.Weapon
	db.Find(&weapon, "name='weapon2'")

	// The BODY to send to the endpoint
	payload := map[string]any{
		"id": weapon.ID,
	}

	// Get the response
	resp := postWithAuth(t, "/post_character_equips", payload)
	aliveAny, ok := resp["alive"]
	assert.True(t, ok)
	alive, ok := aliveAny.(bool)
	assert.True(t, ok)
	assert.True(t, alive)

	// Verify modification
	characters := controllers.NewCharacterController(db)
	character, err := characters.FindByName("test")
	assert.NoError(t, err)
	assert.NoError(t, characters.LoadEquipped(character))
	assert.Equal(t, weapon, character.Equips.Weapon)
}

// Test for the /post_character_accompanies route
func testPostCharacterAccompanies(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Get the ID of the pet2 item
	var pet models.Pet
	db.Find(&pet, "name='pet2'")

	// The BODY to send to the endpoint
	payload := map[string]any{
		"id": pet.ID,
	}

	// Get the response
	resp := postWithAuth(t, "/post_character_accompanies", payload)
	aliveAny, ok := resp["alive"]
	assert.True(t, ok)
	alive, ok := aliveAny.(bool)
	assert.True(t, ok)
	assert.True(t, alive)

	// Verify modification
	characters := controllers.NewCharacterController(db)
	character, err := characters.FindByName("test")
	assert.NoError(t, err)
	assert.NoError(t, characters.LoadAccompanying(character))
	assert.Equal(t, pet, character.Accompanies.Pet)
}

// Test for the /rename_armor route
func testRenameArmor(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Get the ID of the armor2 item
	var armor models.Armor
	db.Find(&armor, "name='armor2'")

	// The BODY to send to the endpoint
	payload := map[string]any{
		"id":   armor.ID,
		"name": "my armor",
	}

	// Get the response
	resp := postWithAuth(t, "/rename_armor", payload)
	aliveAny, ok := resp["alive"]
	assert.True(t, ok)
	alive, ok := aliveAny.(bool)
	assert.True(t, ok)
	assert.True(t, alive)

	// Verify modification
	assert.NoError(t, db.Find(&armor, "name='my armor'").Error)
	assert.Equal(t, "my armor", armor.Name)
}

// Test for the /rename_weapon route
func testRenameWeapon(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Get the ID of the weapon2 item
	var weapon models.Weapon
	db.Find(&weapon, "name='weapon2'")

	// The BODY to send to the endpoint
	payload := map[string]any{
		"id":   weapon.ID,
		"name": "my weapon",
	}

	// Get the response
	resp := postWithAuth(t, "/rename_weapon", payload)
	aliveAny, ok := resp["alive"]
	assert.True(t, ok)
	alive, ok := aliveAny.(bool)
	assert.True(t, ok)
	assert.True(t, alive)

	// Verify modification
	assert.NoError(t, db.Find(&weapon, "name='my weapon'").Error)
	assert.Equal(t, "my weapon", weapon.Name)
}

// Test for the /rename_pet route
func testRenamePet(t *testing.T) {
	// Since we modify the DB, we want to clean it up after we exit
	defer refillDummyDb()

	// Get the ID of the pet2 item
	var pet models.Pet
	db.Find(&pet, "name='pet2'")

	// The BODY to send to the endpoint
	payload := map[string]any{
		"id":   pet.ID,
		"name": "my pet",
	}

	// Get the response
	resp := postWithAuth(t, "/rename_pet", payload)
	aliveAny, ok := resp["alive"]
	assert.True(t, ok)
	alive, ok := aliveAny.(bool)
	assert.True(t, ok)
	assert.True(t, alive)

	// Verify modification
	assert.NoError(t, db.Find(&pet, "name='my pet'").Error)
	assert.Equal(t, "my pet", pet.Name)
}

// Resets the database and fills it in again
func refillDummyDb() {
	resetDb()
	fillDummyDb()
}

// Fills up the database with dummy values
func fillDummyDb() {
	// Controllers
	var users = controllers.NewUserController(db)
	var characters = controllers.NewCharacterController(db)
	var classes = controllers.NewClassController(db)
	var assignments = controllers.NewAssignmentController(db)
	var items = controllers.NewItemController(db)

	// Raw data

	// User
	user := models.User{
		Username: "test",
		Name:     "Test",
		Email:    "test@test.com",
		Password: "test",
	}
	// Character
	character := models.Character{
		UserUsername:         user.Username,
		Name:                 "test",
		MomentOfLatestAction: time.Now(),
		Streak:               10,
		Hp:                   40,
		StrengthExtra:        3,
		DefenseExtra:         4,
		IntelligenceExtra:    5,
		HeartExtra:           7,
		ExtraPoints:          10,
	}
	// Classes
	class1 := models.Class{
		Name:          "math",
		StartDate:     time.Now(),
		EndDate:       time.Now().Add(128 * 24 * time.Hour),
		OwnerUsername: user.Username,
		GradeFormula:  "0.3*average(homework) + 0.7*average(exams)",
		Color:         "FF0000FF",
	}
	class2 := models.Class{
		Name:          "history",
		StartDate:     time.Now().AddDate(0, -5, 0),
		EndDate:       time.Now().AddDate(0, -1, 0),
		OwnerUsername: user.Username,
		GradeFormula:  "average(top(2, exams))",
		Color:         "00FF00FF",
	}
	// Assignments
	assignment1_1 := models.Assignment{
		DueDate:  time.Now().Add(time.Hour),
		Notes:    "Lorem ipsum dolor sit amet",
		Grade:    96,
		Name:     "Homework 1",
		Optional: false,
		Progress: 1,
		Tag:      "homework",
	}
	assignment1_2 := models.Assignment{
		DueDate:  time.Now().Add(time.Hour),
		Notes:    "Lorem ipsum dolor sit amet",
		Grade:    87,
		Name:     "Midterm",
		Optional: false,
		Progress: 1,
		Tag:      "exams",
	}
	assignment2_1 := models.Assignment{
		DueDate:  time.Now().AddDate(0, -1, -1),
		Notes:    "Lorem ipsum dolor sit amet",
		Grade:    100,
		Name:     "Exam 1",
		Optional: false,
		Progress: 1,
		Tag:      "exams",
	}
	assignment2_2 := models.Assignment{
		DueDate:  time.Now().AddDate(0, -1, -1),
		Notes:    "Lorem ipsum dolor sit amet",
		Grade:    100,
		Name:     "Exam 2",
		Optional: false,
		Progress: 1,
		Tag:      "exams",
	}
	assignment2_3 := models.Assignment{
		DueDate:  time.Now().AddDate(0, -1, -1),
		Notes:    "Lorem ipsum dolor sit amet",
		Grade:    0,
		Name:     "Exam 3",
		Optional: false,
		Progress: 1,
		Tag:      "exams",
	}
	// Items
	armor1 := models.Item{
		Name:           "armor1",
		Rarity:         1,
		DescriptionUri: "",
		ImageUri:       "",
		Strength:       1,
		Defense:        5,
		Intelligence:   1,
		Heart:          1,
	}
	armor2 := models.Item{
		Name:           "armor2",
		Rarity:         2,
		DescriptionUri: "",
		ImageUri:       "",
		Strength:       2,
		Defense:        7,
		Intelligence:   2,
		Heart:          2,
	}
	weapon1 := models.Item{
		Name:           "weapon1",
		Rarity:         1,
		DescriptionUri: "",
		ImageUri:       "",
		Strength:       5,
		Defense:        1,
		Intelligence:   1,
		Heart:          1,
	}
	weapon2 := models.Item{
		Name:           "weapon2",
		Rarity:         2,
		DescriptionUri: "",
		ImageUri:       "",
		Strength:       7,
		Defense:        2,
		Intelligence:   2,
		Heart:          2,
	}
	pet1 := models.Item{
		Name:           "pet1",
		Rarity:         1,
		DescriptionUri: "",
		ImageUri:       "",
		Strength:       1,
		Defense:        1,
		Intelligence:   1,
		Heart:          5,
	}
	pet2 := models.Item{
		Name:           "pet2",
		Rarity:         2,
		DescriptionUri: "",
		ImageUri:       "",
		Strength:       2,
		Defense:        2,
		Intelligence:   2,
		Heart:          7,
	}

	// Maps to easily fill-in generated IDs

	classMap := make(map[string]*models.Class)
	classMap[class1.Name] = &class1
	classMap[class2.Name] = &class2
	assignmentMap := make(map[string]*models.Assignment)
	assignmentMap[assignment1_1.Name] = &assignment1_1
	assignmentMap[assignment1_2.Name] = &assignment1_2
	assignmentMap[assignment2_1.Name] = &assignment2_1
	assignmentMap[assignment2_2.Name] = &assignment2_2
	assignmentMap[assignment2_3.Name] = &assignment2_3
	classAssignmentsMap := make(map[string][]*models.Assignment)
	classAssignmentsMap[class1.Name] = []*models.Assignment{
		&assignment1_1,
		&assignment1_2,
	}
	classAssignmentsMap[class2.Name] = []*models.Assignment{
		&assignment2_1,
		&assignment2_2,
		&assignment2_3,
	}

	// Adding to the database

	// Create the user
	if err := users.CreateUser(&user); err != nil {
		panic(err)
	}
	// Create the character
	if err := characters.CreateCharacter(&character); err != nil {
		panic(err)
	}
	// Load the character into the user
	if err := users.LoadCharacter(&user); err != nil {
		panic(err)
	}
	// Set the character's ID properly
	character.ID = user.Character.ID
	// Create the classes
	for _, class := range classMap {
		if err := classes.CreateClass(class); err != nil {
			panic(err)
		}
	}
	// Load the classes into the user
	if err := users.LoadClasses(&user); err != nil {
		panic(err)
	}
	// Assign the ClassID into each assignment
	for _, class := range user.Classes {
		classMap[class.Name].ID = class.ID
		for _, assignment := range classAssignmentsMap[class.Name] {
			assignment.ClassID = class.ID
		}
	}
	// Create the assignments
	for _, assignment := range assignmentMap {
		if err := assignments.CreateAssignment(assignment); err != nil {
			panic(err)
		}
	}
	// Load each assignment into each class and set the assignment ID
	for _, class := range classMap {
		if err := classes.LoadAssignments(class); err != nil {
			panic(err)
		}
		for _, assignment := range class.Assignments {
			assignmentMap[assignment.Name].ID = assignment.ID
		}
	}
	// Create the items
	if err := items.CreateArmor(&character, &armor1); err != nil {
		panic(err)
	}
	if err := items.CreateArmor(&character, &armor2); err != nil {
		panic(err)
	}
	if err := items.CreateWeapon(&character, &weapon1); err != nil {
		panic(err)
	}
	if err := items.CreateWeapon(&character, &weapon2); err != nil {
		panic(err)
	}
	if err := items.CreatePet(&character, &pet1); err != nil {
		panic(err)
	}
	if err := items.CreatePet(&character, &pet2); err != nil {
		panic(err)
	}
	// Equip a weapon
	if err := characters.Equip(&character, &models.Weapon{Item: weapon1}); err != nil {
		panic(err)
	}
}

// Sends a GET request with credentials
func getWithAuth(t *testing.T, route string, queryParams map[string]string) map[string]any {
	req := httptest.NewRequest("GET", route, nil)
	tok := getToken(t)
	req.Header.Set("Authorization", "Bearer "+tok)
	querys := url.Values{}
	for key, value := range queryParams {
		querys.Add(key, value)
	}
	req.URL.RawQuery = querys.Encode()

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

// Converts a map[string]any into a struct
func mapToStruct[T any](m map[string]any) (*T, error) {
	jsonData, err := json.Marshal(m)
	if err != nil {
		return nil, err
	}
	var t = new(T)
	if err := json.Unmarshal(jsonData, t); err != nil {
		return nil, err
	}
	return t, nil
}
