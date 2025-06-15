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
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/models"
)

// Test data struct
type dungeonTestData struct {
	userController *controllers.UserController
	itemController *controllers.ItemController
	controller     *controllers.CharacterController
	user           *models.User
	character      *models.Character
	pet1           *models.Pet
	weapon1        *models.Weapon
	armor1         *models.Armor
	pet2           *models.Pet
	weapon2        *models.Weapon
	armor2         *models.Armor
}

// Creates test data
func newDungeonTestData() (result dungeonTestData) {
	result = dungeonTestData{}
	result.userController = controllers.NewUserController(db)
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
		Hp:                   100,
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
