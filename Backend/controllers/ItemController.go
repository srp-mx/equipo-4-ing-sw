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

package controllers

import (
	"fmt"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/gorm"
)

// Item controller type
type ItemController struct {
	DB *gorm.DB
}

// Creates a new item controller
func NewItemController(db *gorm.DB) *ItemController {
	return &ItemController{DB: db}
}

// Creates an armor given the item data and owner
func (self *ItemController) CreateArmor(character *models.Character, item *models.Item) error {
	if item == nil || character == nil {
		return fmt.Errorf("No se dio un personaje o item.")
	}
	item.OwnerID = character.ID
	armor := &models.Armor{
		Item:           *item,
		DamageReceived: 0,
		WearsID:        nil,
	}
	return self.DB.Create(armor).Error
}

// Creates a weapon given the item data and owner
func (self *ItemController) CreateWeapon(character *models.Character, item *models.Item) error {
	if item == nil || character == nil {
		return fmt.Errorf("No se dio un personaje o item.")
	}
	item.OwnerID = character.ID
	weapon := &models.Weapon{
		Item:      *item,
		EquipsID:  nil,
		SlayCount: 0,
	}
	return self.DB.Create(weapon).Error
}

// Creates a pet given the item data and owner
func (self *ItemController) CreatePet(character *models.Character, item *models.Item) error {
	if item == nil || character == nil {
		return fmt.Errorf("No se dio un personaje o item.")
	}
	item.OwnerID = character.ID
	pet := &models.Pet{
		Item:          *item,
		AccompaniesID: nil,
		Bond:          0,
	}
	return self.DB.Create(pet).Error
}

// Gets an armor associated with a character with a given ID.
func (self *ItemController) GetArmor(character *models.Character, armor *models.Armor) error {
	if armor == nil || character == nil {
		return fmt.Errorf("No se dio un personaje o item.")
	}
	characters := NewCharacterController(self.DB)
	err := characters.Get(character)
	if err != nil {
		return err
	}
	err = self.DB.
		Where(&models.Armor{
			Item: models.Item{
				ID:      armor.ID,
				OwnerID: character.ID,
			},
		}).
		First(armor).Error
	if err != nil {
		return err
	}
	return nil
}

// Gets a weapon associated with a character with a given ID.
func (self *ItemController) GetWeapon(character *models.Character, weapon *models.Weapon) error {
	if weapon == nil || character == nil {
		return fmt.Errorf("No se dio un personaje o item.")
	}
	characters := NewCharacterController(self.DB)
	err := characters.Get(character)
	if err != nil {
		return err
	}
	err = self.DB.
		Where(&models.Weapon{
			Item: models.Item{
				ID:      weapon.ID,
				OwnerID: character.ID,
			},
		}).
		First(weapon).Error
	if err != nil {
		return err
	}
	return nil
}

// Gets a pet associated with a character with a given ID.
func (self *ItemController) GetPet(character *models.Character, pet *models.Pet) error {
	if pet == nil || character == nil {
		return fmt.Errorf("No se dio un personaje o item.")
	}
	characters := NewCharacterController(self.DB)
	err := characters.Get(character)
	if err != nil {
		return err
	}
	err = self.DB.
		Where(&models.Pet{
			Item: models.Item{
				ID:      pet.ID,
				OwnerID: character.ID,
			},
		}).
		First(pet).Error
	if err != nil {
		return err
	}
	return nil
}

// Updates an armor that matches the given's ID with the provided data.
func (self *ItemController) UpdateArmor(armor *models.Armor) error {
	return self.DB.Save(armor).Error
}

// Updates a weapon that matches the given's ID with the provided data.
func (self *ItemController) UpdateWeapon(weapon *models.Weapon) error {
	return self.DB.Save(weapon).Error
}

// Updates a pet that matches the given's ID with the provided data.
func (self *ItemController) UpdatePet(pet *models.Pet) error {
	return self.DB.Save(pet).Error
}

// Renames the given armor associated with the character.
func (self *ItemController) RenameArmor(character *models.Character, armor *models.Armor, name string) error {
	if err := self.GetArmor(character, armor); err != nil {
		return err
	}
	armor.Name = name
	return self.UpdateArmor(armor)
}

// Renames the given weapon associated with the character.
func (self *ItemController) RenameWeapon(character *models.Character, weapon *models.Weapon, name string) error {
	if err := self.GetWeapon(character, weapon); err != nil {
		return err
	}
	weapon.Name = name
	return self.UpdateWeapon(weapon)
}

// Renames the given pet associated with the character.
func (self *ItemController) RenamePet(character *models.Character, pet *models.Pet, name string) error {
	if err := self.GetPet(character, pet); err != nil {
		return err
	}
	pet.Name = name
	return self.UpdatePet(pet)
}
