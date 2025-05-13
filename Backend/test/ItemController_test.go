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
	"testing"
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/stretchr/testify/assert"
)

// Test data struct
type itemTestData struct {
	userController      *controllers.UserController
	characterController *controllers.CharacterController
	controller          *controllers.ItemController
	user                *models.User
	character           *models.Character
	petItem             *models.Item
	weaponItem          *models.Item
	armorItem           *models.Item
}

// Creates test data
func newItemTestData() (result itemTestData) {
	result = itemTestData{}
	result.userController = controllers.NewUserController(db)
	result.characterController = controllers.NewCharacterController(db)
	result.controller = controllers.NewItemController(db)

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

	result.petItem = &models.Item{
		ID:             3,
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
	}

	result.weaponItem = &models.Item{
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
	}

	result.armorItem = &models.Item{
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
	}

	return result
}

// Tests armor creation
func TestCreateArmor(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreateArmor(data.character, data.armorItem))

	var found models.Armor
	assert.NoError(t, db.First(&found, "id = ?", data.armorItem.ID).Error)

	assert.Equal(t, data.armorItem.Name, found.Item.Name)
	assert.Equal(t, data.armorItem.Rarity, found.Item.Rarity)
	assert.Equal(t, data.armorItem.DescriptionUri, found.Item.DescriptionUri)
	assert.Equal(t, data.armorItem.ImageUri, found.Item.ImageUri)
	assert.Equal(t, data.armorItem.Strength, found.Item.Strength)
	assert.Equal(t, data.armorItem.Defense, found.Item.Defense)
	assert.Equal(t, data.armorItem.Intelligence, found.Item.Intelligence)
	assert.Equal(t, data.armorItem.Heart, found.Item.Heart)
}

// Tests weapon creation
func TestCreateWeapon(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreateWeapon(data.character, data.weaponItem))

	var found models.Weapon
	assert.NoError(t, db.First(&found, "id = ?", data.weaponItem.ID).Error)

	assert.Equal(t, data.weaponItem.Name, found.Item.Name)
	assert.Equal(t, data.weaponItem.Rarity, found.Item.Rarity)
	assert.Equal(t, data.weaponItem.DescriptionUri, found.Item.DescriptionUri)
	assert.Equal(t, data.weaponItem.ImageUri, found.Item.ImageUri)
	assert.Equal(t, data.weaponItem.Strength, found.Item.Strength)
	assert.Equal(t, data.weaponItem.Defense, found.Item.Defense)
	assert.Equal(t, data.weaponItem.Intelligence, found.Item.Intelligence)
	assert.Equal(t, data.weaponItem.Heart, found.Item.Heart)
}

// Tests pet creation
func TestCreatePet(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreatePet(data.character, data.petItem))

	var found models.Pet
	assert.NoError(t, db.First(&found, "id = ?", data.petItem.ID).Error)

	assert.Equal(t, data.petItem.Name, found.Item.Name)
	assert.Equal(t, data.petItem.Rarity, found.Item.Rarity)
	assert.Equal(t, data.petItem.DescriptionUri, found.Item.DescriptionUri)
	assert.Equal(t, data.petItem.ImageUri, found.Item.ImageUri)
	assert.Equal(t, data.petItem.Strength, found.Item.Strength)
	assert.Equal(t, data.petItem.Defense, found.Item.Defense)
	assert.Equal(t, data.petItem.Intelligence, found.Item.Intelligence)
	assert.Equal(t, data.petItem.Heart, found.Item.Heart)
}

// Tests armor retrieval
func TestGetArmor(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreateArmor(data.character, data.armorItem))

	found := models.Armor{Item: models.Item{ID: data.armorItem.ID}}
	assert.NoError(t, data.controller.GetArmor(data.character, &found))

	assert.Equal(t, data.armorItem.Name, found.Item.Name)
	assert.Equal(t, data.armorItem.Rarity, found.Item.Rarity)
	assert.Equal(t, data.armorItem.DescriptionUri, found.Item.DescriptionUri)
	assert.Equal(t, data.armorItem.ImageUri, found.Item.ImageUri)
	assert.Equal(t, data.armorItem.Strength, found.Item.Strength)
	assert.Equal(t, data.armorItem.Defense, found.Item.Defense)
	assert.Equal(t, data.armorItem.Intelligence, found.Item.Intelligence)
	assert.Equal(t, data.armorItem.Heart, found.Item.Heart)
}

// Tests weapon retrieval
func TestGetWeapon(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreateWeapon(data.character, data.weaponItem))

	found := models.Weapon{Item: models.Item{ID: data.weaponItem.ID}}
	assert.NoError(t, data.controller.GetWeapon(data.character, &found))

	assert.Equal(t, data.weaponItem.Name, found.Item.Name)
	assert.Equal(t, data.weaponItem.Rarity, found.Item.Rarity)
	assert.Equal(t, data.weaponItem.DescriptionUri, found.Item.DescriptionUri)
	assert.Equal(t, data.weaponItem.ImageUri, found.Item.ImageUri)
	assert.Equal(t, data.weaponItem.Strength, found.Item.Strength)
	assert.Equal(t, data.weaponItem.Defense, found.Item.Defense)
	assert.Equal(t, data.weaponItem.Intelligence, found.Item.Intelligence)
	assert.Equal(t, data.weaponItem.Heart, found.Item.Heart)
}

// Tests pet retrieval
func TestGetPet(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreatePet(data.character, data.petItem))

	found := models.Pet{Item: models.Item{ID: data.petItem.ID}}
	assert.NoError(t, data.controller.GetPet(data.character, &found))

	assert.Equal(t, data.petItem.Name, found.Item.Name)
	assert.Equal(t, data.petItem.Rarity, found.Item.Rarity)
	assert.Equal(t, data.petItem.DescriptionUri, found.Item.DescriptionUri)
	assert.Equal(t, data.petItem.ImageUri, found.Item.ImageUri)
	assert.Equal(t, data.petItem.Strength, found.Item.Strength)
	assert.Equal(t, data.petItem.Defense, found.Item.Defense)
	assert.Equal(t, data.petItem.Intelligence, found.Item.Intelligence)
	assert.Equal(t, data.petItem.Heart, found.Item.Heart)
}

// Tests armor renaming
func TestRenameArmor(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreateArmor(data.character, data.armorItem))

	found := models.Armor{Item: models.Item{ID: data.armorItem.ID}}
	assert.NoError(t, data.controller.GetArmor(data.character, &found))

	assert.Equal(t, data.armorItem.Name, found.Item.Name)

	assert.NoError(t, data.controller.RenameArmor(data.character, &found, "camelot"))
	assert.NoError(t, data.controller.GetArmor(data.character, &found))
	assert.Equal(t, "camelot", found.Name)
	assert.NotEqual(t, data.armorItem.Name, found.Name)
}

// Tests weapon renaming
func TestRenameWeapon(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreateWeapon(data.character, data.weaponItem))

	found := models.Weapon{Item: models.Item{ID: data.weaponItem.ID}}
	assert.NoError(t, data.controller.GetWeapon(data.character, &found))

	assert.Equal(t, data.weaponItem.Name, found.Item.Name)

	assert.NoError(t, data.controller.RenameWeapon(data.character, &found, "camelot"))
	assert.NoError(t, data.controller.GetWeapon(data.character, &found))
	assert.Equal(t, "camelot", found.Name)
	assert.NotEqual(t, data.weaponItem.Name, found.Name)
}

// Tests pet renaming
func TestRenamePet(t *testing.T) {
	resetDb()
	data := newItemTestData()

	assert.NoError(t, data.userController.CreateUser(data.user))
	assert.NoError(t, data.characterController.CreateCharacter(data.character))
	assert.NoError(t, data.controller.CreatePet(data.character, data.petItem))

	found := models.Pet{Item: models.Item{ID: data.petItem.ID}}
	assert.NoError(t, data.controller.GetPet(data.character, &found))

	assert.Equal(t, data.petItem.Name, found.Item.Name)

	assert.NoError(t, data.controller.RenamePet(data.character, &found, "camelot"))
	assert.NoError(t, data.controller.GetPet(data.character, &found))
	assert.Equal(t, "camelot", found.Name)
	assert.NotEqual(t, data.petItem.Name, found.Name)
}
