/*
Copyright (C) 2025

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
	"math"
	"testing"
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/stretchr/testify/assert"
)

// Test data struct
type characterTestData struct {
	userController       *controllers.UserController
	classController      *controllers.ClassController
	assignmentController *controllers.AssignmentController
	itemController       *controllers.ItemController
	controller           *controllers.CharacterController
	user                 *models.User
	character            *models.Character
	class1               *models.Class
	class2               *models.Class
	assignment1_1        *models.Assignment
	assignment1_2        *models.Assignment
	assignment2_1        *models.Assignment
	assignment2_2        *models.Assignment
	assignment2_3        *models.Assignment
	pet1                 *models.Pet
	weapon1              *models.Weapon
	armor1               *models.Armor
	pet2                 *models.Pet
	weapon2              *models.Weapon
	armor2               *models.Armor
}

// Creates test data
func newCharacterTestData() (result characterTestData) {
	result = characterTestData{}
	result.userController = controllers.NewUserController(db)
	result.classController = controllers.NewClassController(db)
	result.assignmentController = controllers.NewAssignmentController(db)
	result.itemController = controllers.NewItemController(db)
	result.controller = controllers.NewCharacterController(db)

	result.user = &models.User{
		Username: "testuser",
		Name:     "Testing Testington",
		Email:    "test@test.com",
		Password: "securepassword",
	}

	result.character = &models.Character{
		ID:                   0,
		UserUsername:         result.user.Username,
		Name:                 "quijote",
		MomentOfLatestAction: time.Now(),
		Streak:               10,
		Hp:                   50,
		StrengthExtra:        1,
		DefenseExtra:         2,
		IntelligenceExtra:    3,
		HeartExtra:           4,
		ExtraPoints:          5,
		Wears: models.Wears{
			ID:          0,
			CharacterID: 0,
			Armor:       nil,
			Since:       time.Now(),
		},
		Equips: models.Equips{
			ID:          0,
			CharacterID: 0,
			Weapon:      nil,
			Since:       time.Now(),
		},
		Accompanies: models.Accompanies{
			ID:          0,
			CharacterID: 0,
			Pet:         nil,
			Since:       time.Now(),
		},
	}

	result.class1 = &models.Class{
		ID:            0,
		Name:          "history",
		StartDate:     time.Now().AddDate(0, 0, -30),
		EndDate:       time.Now().AddDate(0, 0, -10),
		OwnerUsername: result.user.Username,
		GradeFormula:  "0.7*average(homework) + 0.3*average(exam)",
		Color:         "00FF00FF",
	}

	result.class2 = &models.Class{
		ID:            1,
		Name:          "spanish",
		StartDate:     time.Now().AddDate(0, 0, -20),
		EndDate:       time.Now().AddDate(0, 0, 5),
		OwnerUsername: result.user.Username,
		GradeFormula:  "average(exam)",
		Color:         "FF0000FF",
	}

	result.assignment1_1 = &models.Assignment{
		ID:       0,
		ClassID:  result.class1.ID,
		DueDate:  time.Now().AddDate(0, 0, -15),
		Notes:    "",
		Grade:    90,
		Name:     "exam 1",
		Optional: false,
		Progress: 1,
		Tag:      "exam",
	}

	result.assignment1_2 = &models.Assignment{
		ID:       1,
		ClassID:  result.class1.ID,
		DueDate:  time.Now().AddDate(0, 0, -15),
		Notes:    "",
		Grade:    100,
		Name:     "homework 1",
		Optional: false,
		Progress: 1,
		Tag:      "homework",
	}

	result.assignment2_1 = &models.Assignment{
		ID:       2,
		ClassID:  result.class2.ID,
		DueDate:  time.Now().AddDate(0, 0, -5),
		Notes:    "",
		Grade:    80,
		Name:     "exam 1",
		Optional: false,
		Progress: 1,
		Tag:      "exam",
	}

	result.assignment2_2 = &models.Assignment{
		ID:       3,
		ClassID:  result.class2.ID,
		DueDate:  time.Now().AddDate(0, 0, -5),
		Notes:    "",
		Grade:    90,
		Name:     "exam 2",
		Optional: false,
		Progress: 1,
		Tag:      "exam",
	}

	result.assignment2_3 = &models.Assignment{
		ID:       3,
		ClassID:  result.class2.ID,
		DueDate:  time.Now().AddDate(0, 0, 5),
		Notes:    "",
		Grade:    0,
		Name:     "exam 3",
		Optional: false,
		Progress: 0,
		Tag:      "exam",
	}

	result.pet1 = &models.Pet{
		Item: models.Item{
			ID:             0,
			CreatedAt:      time.Now(),
			OwnerID:        result.character.ID,
			Name:           "froggy",
			Rarity:         3,
			DescriptionUri: "froggy",
			ImageUri:       "froggy",
			Strength:       1,
			Defense:        0,
			Intelligence:   0,
			Heart:          6,
		},
		Bond:          5,
		AccompaniesID: nil,
	}

	result.weapon1 = &models.Weapon{
		Item: models.Item{
			ID:             1,
			CreatedAt:      time.Now(),
			OwnerID:        result.character.ID,
			Name:           "sword",
			Rarity:         2,
			DescriptionUri: "sword",
			ImageUri:       "sword",
			Strength:       5,
			Defense:        1,
			Intelligence:   0,
			Heart:          0,
		},
		SlayCount: 500,
		EquipsID:  nil,
	}

	result.armor1 = &models.Armor{
		Item: models.Item{
			ID:             2,
			CreatedAt:      time.Now(),
			OwnerID:        result.character.ID,
			Name:           "chainmail",
			Rarity:         1,
			DescriptionUri: "chainmail",
			ImageUri:       "chainmail",
			Strength:       1,
			Defense:        3,
			Intelligence:   0,
			Heart:          1,
		},
		DamageReceived: 70,
		WearsID:        nil,
	}

	result.pet2 = &models.Pet{
		Item: models.Item{
			ID:             3,
			CreatedAt:      time.Now(),
			OwnerID:        result.character.ID,
			Name:           "fishy",
			Rarity:         3,
			DescriptionUri: "fishy",
			ImageUri:       "fishy",
			Strength:       1,
			Defense:        0,
			Intelligence:   0,
			Heart:          6,
		},
		Bond:          5,
		AccompaniesID: nil,
	}

	result.weapon2 = &models.Weapon{
		Item: models.Item{
			ID:             4,
			CreatedAt:      time.Now(),
			OwnerID:        result.character.ID,
			Name:           "axe",
			Rarity:         2,
			DescriptionUri: "axe",
			ImageUri:       "axe",
			Strength:       5,
			Defense:        1,
			Intelligence:   0,
			Heart:          0,
		},
		SlayCount: 500,
		EquipsID:  nil,
	}

	result.armor2 = &models.Armor{
		Item: models.Item{
			ID:             5,
			CreatedAt:      time.Now(),
			OwnerID:        result.character.ID,
			Name:           "cardboard",
			Rarity:         1,
			DescriptionUri: "cardboard",
			ImageUri:       "cardboard",
			Strength:       1,
			Defense:        3,
			Intelligence:   0,
			Heart:          1,
		},
		DamageReceived: 70,
		WearsID:        nil,
	}

	return result
}

// Tests character creation
func TestCreateCharacter(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	err := data.userController.CreateUser(data.user)
	assert.NoError(t, err)

	err = data.controller.CreateCharacter(data.character)
	assert.NoError(t, err)

	var foundCharacter models.Character
	db.First(&foundCharacter, "name = ?", data.character.Name)

	assert.Equal(t, data.character.ID, foundCharacter.ID)
}

// Tests character updating
func TestUpdateCharacter(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	db.Create(data.user)
	db.Create(data.character)

	data.character.Name = "quixote"
	err := data.controller.UpdateCharacter(data.character)
	assert.NoError(t, err)

	var updated models.Character
	db.First(&updated, "name = ?", data.character.Name)

	assert.Equal(t, "quixote", updated.Name)
}

// Tests character removal
func TestDeleteCharacter(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	db.Create(data.user)
	db.Create(data.character)

	db.Preload("Character").First(&data.user, "username=?", data.user.Username)
	assert.NotNil(t, data.user.Character)

	err := data.controller.DeleteCharacter(data.character)
	assert.NoError(t, err)

	var found models.Character
	result := db.First(&found)
	assert.Error(t, result.Error)

	db.Preload("Character").First(&data.user, "username=?", data.user.Username)
	assert.Nil(t, data.user.Character)
}

// Tests searching by character name
func TestCharacterFindByName(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	db.Create(data.user)
	db.Create(data.character)

	character, err := data.controller.FindByName("quijote")
	assert.NoError(t, err)
	assert.NotNil(t, character)
	assert.Equal(t, data.character.Name, character.Name)

	character, err = data.controller.FindByName("quixote")
	assert.Error(t, err)
}

// Tests existence querying
func TestCharacterExists(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	exists, err := data.controller.Exists(models.Character{
		ID: data.character.ID,
	})

	assert.NoError(t, err)
	assert.False(t, exists)

	db.Create(data.user)
	db.Create(data.character)

	exists, err = data.controller.Exists(models.Character{
		ID: data.character.ID,
	})
	assert.NoError(t, err)
	assert.True(t, exists)
}

// Tests updating with a map
func TestCharacterUpdateMap(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	db.Create(data.user)
	db.Create(data.character)

	db.First(&data.character)
	assert.Equal(t, "quijote", data.character.Name)

	updates := make(map[string]any)
	updates["name"] = "quixote"
	err := data.controller.UpdateWithMap(data.character, updates)
	assert.NoError(t, err)

	db.First(&data.character)
	assert.Equal(t, "quixote", data.character.Name)
}

// Tests the character XP compute
func TestCharacterComputeXp(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	db.Create(data.user)
	db.Create(data.character)

	xp, err := data.controller.ComputeXp(data.character)
	assert.NoError(t, err)
	assert.Equal(t, data.character.ExtraPoints, xp)

	db.Create(data.class1)
	db.Create(data.class2)
	data.assignment1_1.ClassID = data.class1.ID
	data.assignment1_2.ClassID = data.class1.ID
	data.assignment2_1.ClassID = data.class2.ID
	data.assignment2_2.ClassID = data.class2.ID
	data.assignment2_3.ClassID = data.class2.ID
	db.Create(data.assignment1_1)
	db.Create(data.assignment1_2)
	db.Create(data.assignment2_1)
	db.Create(data.assignment2_2)
	db.Create(data.assignment2_3)

	xp, err = data.controller.ComputeXp(data.character)
	assert.NoError(t, err)
	assert.Less(t, data.character.ExtraPoints, xp)

	// 1. Add extra points
	equationXp := data.character.ExtraPoints
	// 2. Add 1 xp per assignment done
	equationXp += 4 // 4 assignments done

	// 3. Add points from grades of done assignments
	equationXp += uint64(math.Round(6 * data.assignment1_1.Grade / 100))
	equationXp += uint64(math.Round(6 * data.assignment1_2.Grade / 100))
	equationXp += uint64(math.Round(6 * data.assignment2_1.Grade / 100))
	equationXp += uint64(math.Round(6 * data.assignment2_2.Grade / 100))

	// 4. Add 24 xp for each class finished
	equationXp += 24 * 1 // 1 class finished

	// 5. Add points from grade of finished class
	class1Grade := 0.3*data.assignment1_1.Grade + 0.7*data.assignment1_2.Grade
	equationXp += uint64(math.Round(201 * class1Grade / 100))

	assert.Equal(t, equationXp, xp)
}

// Tests the character activity pings
func TestCharacterActivityUpdate(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	today := time.Now().Truncate(24 * time.Hour)

	deletableCharacter := models.Character{
		UserUsername:         data.user.Username,
		Name:                 "quijote_1",
		MomentOfLatestAction: today.AddDate(0, 0, -controllers.DAYS_TO_DIE),
	}

	streakLosingCharacter := models.Character{
		UserUsername:         data.user.Username,
		Name:                 "quijote_2",
		MomentOfLatestAction: today.AddDate(0, 0, -2), // 2 days ago
		Streak:               10,
	}

	streakWinningCharacter := models.Character{
		UserUsername:         data.user.Username,
		Name:                 "quijote_3",
		MomentOfLatestAction: today.AddDate(0, 0, -1), // 1 days ago
		Streak:               10,
	}

	streakNeutralCharacter := models.Character{
		UserUsername:         data.user.Username,
		Name:                 "quijote_4",
		MomentOfLatestAction: today,
		Streak:               10,
	}

	db.Create(data.user)

	db.Create(&deletableCharacter)
	_, err := data.controller.FindByName("quijote_1")
	assert.NoError(t, err)
	deleted, err := data.controller.ActivityUpdate(&deletableCharacter, true)
	assert.NoError(t, err)
	assert.True(t, deleted)
	_, err = data.controller.FindByName("quijote_1")
	assert.Error(t, err)

	db.Create(&streakLosingCharacter)
	var updated models.Character
	db.First(&updated, "name = ?", "quijote_2")
	assert.Equal(t, 10, updated.Streak)
	deleted, err = data.controller.ActivityUpdate(&streakLosingCharacter, true)
	assert.NoError(t, err)
	assert.False(t, deleted)
	updated = models.Character{}
	db.First(&updated, "name = ?", "quijote_2")
	assert.Equal(t, 0, updated.Streak)

	err = data.controller.DeleteCharacter(&streakLosingCharacter)
	assert.NoError(t, err)

	updated = models.Character{}
	db.Create(&streakWinningCharacter)
	db.First(&updated, "name = ?", "quijote_3")
	assert.Equal(t, 10, updated.Streak)
	deleted, err = data.controller.ActivityUpdate(&streakWinningCharacter, true)
	assert.NoError(t, err)
	assert.False(t, deleted)
	updated = models.Character{}
	db.First(&updated, "name = ?", "quijote_3")
	assert.Equal(t, 11, updated.Streak)

	err = data.controller.DeleteCharacter(&streakWinningCharacter)
	assert.NoError(t, err)

	updated = models.Character{}
	db.Create(&streakNeutralCharacter)
	db.First(&updated, "name = ?", "quijote_4")
	assert.Equal(t, 10, updated.Streak)
	deleted, err = data.controller.ActivityUpdate(&streakNeutralCharacter, true)
	assert.NoError(t, err)
	assert.False(t, deleted)
	updated = models.Character{}
	db.First(&updated, "name = ?", "quijote_4")
	assert.Equal(t, 10, updated.Streak)
}

// Tests the character's items
func TestCharacterItems(t *testing.T) {
	resetDb()
	data := newCharacterTestData()

	// Create the data in the database
	assert.NoError(t, db.Create(data.user).Error)
	assert.NoError(t, db.Create(data.character).Error)
	data.pet1.OwnerID = data.character.ID
	data.weapon1.OwnerID = data.character.ID
	data.armor1.OwnerID = data.character.ID
	data.pet2.OwnerID = data.character.ID
	data.weapon2.OwnerID = data.character.ID
	data.armor2.OwnerID = data.character.ID
	assert.NoError(t, db.Create(data.pet1).Error)
	assert.NoError(t, db.Create(data.weapon1).Error)
	assert.NoError(t, db.Create(data.armor1).Error)
	assert.NoError(t, db.Create(data.pet2).Error)
	assert.NoError(t, db.Create(data.weapon2).Error)
	assert.NoError(t, db.Create(data.armor2).Error)

	// Check for loading inventory
	assert.Empty(t, data.character.Armors)
	assert.Empty(t, data.character.Weapons)
	assert.Empty(t, data.character.Pets)
	assert.NoError(t, data.controller.LoadArmors(data.character))
	assert.NoError(t, data.controller.LoadWeapons(data.character))
	assert.NoError(t, data.controller.LoadPets(data.character))
	assert.NotEmpty(t, data.character.Armors)
	assert.NotEmpty(t, data.character.Weapons)
	assert.NotEmpty(t, data.character.Pets)

	// Check for unequipped items
	assert.NoError(t, data.controller.LoadWearing(data.character))
	assert.NoError(t, data.controller.LoadEquipped(data.character))
	assert.NoError(t, data.controller.LoadAccompanying(data.character))
	assert.Nil(t, data.character.Wears.Armor)
	assert.Nil(t, data.character.Equips.Weapon)
	assert.Nil(t, data.character.Accompanies.Pet)

	// Check for equipping items
	assert.NoError(t, data.controller.Wear(data.character, data.armor1))
	assert.NoError(t, data.controller.Equip(data.character, data.weapon1))
	assert.NoError(t, data.controller.Accompany(data.character, data.pet1))
	assert.NoError(t, data.controller.LoadWearing(data.character))
	assert.NoError(t, data.controller.LoadEquipped(data.character))
	assert.NoError(t, data.controller.LoadAccompanying(data.character))
	assert.NotNil(t, data.character.Wears.Armor)
	assert.NotNil(t, data.character.Equips.Weapon)
	assert.NotNil(t, data.character.Accompanies.Pet)
	assert.Equal(t, data.armor1, data.character.Wears.Armor)
	assert.Equal(t, data.weapon1, data.character.Equips.Weapon)
	assert.Equal(t, data.pet1, data.character.Accompanies.Pet)

	// Check for swapping items
	assert.NoError(t, data.controller.Wear(data.character, data.armor2))
	assert.NoError(t, data.controller.Equip(data.character, data.weapon2))
	assert.NoError(t, data.controller.Accompany(data.character, data.pet2))
	assert.NoError(t, data.controller.LoadWearing(data.character))
	assert.NoError(t, data.controller.LoadEquipped(data.character))
	assert.NoError(t, data.controller.LoadAccompanying(data.character))
	assert.Equal(t, data.armor2, data.character.Wears.Armor)
	assert.Equal(t, data.weapon2, data.character.Equips.Weapon)
	assert.Equal(t, data.pet2, data.character.Accompanies.Pet)
}
