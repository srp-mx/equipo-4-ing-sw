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
	"errors"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/controllers"
	"github.com/srp-mx/equipo-4-ing-sw/database"
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"math/rand"
	"time"
)

type RequestBody struct {
	Dungeon int `json:"dungeon"`
}

// Handles /getDungeon
func GetDungeon(c *fiber.Ctx) error {
	_, err := getCredentials(c)

	if err != nil {
		return err
	}
	var body RequestBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("JSON inválido")
	}

	d := body.Dungeon

	type Req struct {
		Name string `json:"name"`
	}

	request, err := parseRequestBody[Req](c)
	if err != nil {
		return err
	}

	request.Name = cleanDisplayName(request.Name)
	characters := controllers.NewCharacterController(database.DB.Db)
	character, err := characters.FindByName(request.Name)
	if err != nil {
		return err
	}

	switch {
	case d == 1:
		return dungeon1(character)
	case d == 2:
		return dungeon2(character)
	case d == 3:
		return dungeon3(character)
	case d == 4:
		return dungeon4(character)
	default:
		return errors.New("No coindide la dungeon")
	}

}

func checkHP(d int, character *models.Character) error {
	if character.Hp < d {
		return errors.New("No hay suficiente vida")
	}
	return nil
}

func getArmor(armor *models.Item, itemController *controllers.ItemController, character *models.Character) error {
	return itemController.CreateArmor(character, armor)
}

func getWeapon(weapon *models.Item, itemController *controllers.ItemController, character *models.Character) error {
	return itemController.CreateWeapon(character, weapon)
}

func getPet(pet *models.Item, itemController *controllers.ItemController, character *models.Character) error {
	return itemController.CreatePet(character, pet)
}

func dungeon1(character *models.Character) error {
	rand.Seed(time.Now().UnixNano())
	err := checkHP(20, character)
	if err != nil {
		return err
	}

	characterController := controllers.NewCharacterController(database.DB.Db)
	itemController := controllers.NewItemController(database.DB.Db)

	// Narrativa inicial
	story := "Te adentras en la Cueva de los Novatos, un lugar oscuro pero relativamente seguro.\n"

	if dungeonSuccess(character, 1) {
		// Éxito
		story += "Derrotas fácilmente a los slimes y ratas gigantes que habitan la cueva.\n"

		// Recompensa
		reward, rewardText, tipo := generateReward(character, 1)
		story += rewardText + "\n"

		// Aplicar recompensa
		switch tipo {
		case "armor":
			err = getArmor(reward, itemController, character)
		case "weapon":
			err = getWeapon(reward, itemController, character)
		case "pet":
			err = getPet(reward, itemController, character)
		}

		if err != nil {
			return err
		}
	} else {
		// Fracaso
		damage := 10 + rand.Intn(10)
		story += fmt.Sprintf("¡Los enemigos te superan! Pierdes %d HP al huir.\n", damage)
		err = characterController.Damage(character, damage)
		if err != nil {
			return err
		}
	}

	// Actualizar personaje
	_, err = characterController.ActivityUpdate(character, true)
	if err != nil {
		return err
	}

	return errors.New(story)
}

func dungeon2(character *models.Character) error {
	rand.Seed(time.Now().UnixNano())
	err := checkHP(30, character)
	if err != nil {
		return err
	}

	characterController := controllers.NewCharacterController(database.DB.Db)
	itemController := controllers.NewItemController(database.DB.Db)

	// Narrativa inicial
	story := "Desciendes a las Catacumbas Olvidadas, donde los no-muertos acechan en las sombras.\n"

	if dungeonSuccess(character, 2) {
		// Éxito
		story += "Logras purgar a los no-muertos y encontrar un tesoro escondido.\n"

		// Recompensa
		reward, rewardText, tipo := generateReward(character, 2)
		story += rewardText + "\n"

		// Aplicar recompensa
		switch tipo {
		case "armor":
			err = getArmor(reward, itemController, character)
		case "weapon":
			err = getWeapon(reward, itemController, character)
		case "pet":
			err = getPet(reward, itemController, character)
		}

		if err != nil {
			return err
		}
	} else {
		// Fracaso
		damage := 15 + rand.Intn(15)
		story += fmt.Sprintf("¡Los no-muertos son demasiado! Pierdes %d HP en la retirada.\n", damage)
		err = characterController.Damage(character, damage)
		if err != nil {
			return err
		}
	}

	// Actualizar personaje
	_, err = characterController.ActivityUpdate(character, true)
	if err != nil {
		return err
	}

	return errors.New(story)
}

func dungeon3(character *models.Character) error {
	rand.Seed(time.Now().UnixNano())
	err := checkHP(40, character)
	if err != nil {
		return err
	}

	characterController := controllers.NewCharacterController(database.DB.Db)
	itemController := controllers.NewItemController(database.DB.Db)

	// Narrativa inicial
	story := "Entras en el Templo Maldito, donde demonios menores adoran a un antiguo dios.\n"

	if dungeonSuccess(character, 3) {
		// Éxito
		story += "Derrotas a los demonios y rompes parte de la maldición del templo.\n"

		// Recompensa
		reward, rewardText, tipo := generateReward(character, 3)
		story += rewardText + "\n"

		// Aplicar recompensa
		switch tipo {
		case "armor":
			err = getArmor(reward, itemController, character)
		case "weapon":
			err = getWeapon(reward, itemController, character)
		case "pet":
			err = getPet(reward, itemController, character)
		}

		if err != nil {
			return err
		}
	} else {
		// Fracaso
		damage := 20 + rand.Intn(20)
		story += fmt.Sprintf("¡Los demonios son demasiado poderosos! Pierdes %d HP al escapar.\n", damage)
		err = characterController.Damage(character, damage)
		if err != nil {
			return err
		}
	}

	// Actualizar personaje
	_, err = characterController.ActivityUpdate(character, true)
	if err != nil {
		return err
	}

	return errors.New(story)
}

func dungeon4(character *models.Character) error {
	rand.Seed(time.Now().UnixNano())
	err := checkHP(50, character)
	if err != nil {
		return err
	}

	characterController := controllers.NewCharacterController(database.DB.Db)
	itemController := controllers.NewItemController(database.DB.Db)

	// Narrativa inicial
	story := "Te enfrentas al Dragón Ancestral en su guarida en lo alto de la Montaña del Fin.\n"

	if dungeonSuccess(character, 4) {
		// Éxito
		story += "¡Increíble! Has derrotado al Dragón Ancestral y obtenido su tesoro.\n"

		// Recompensa
		reward, rewardText, tipo := generateReward(character, 4)
		story += rewardText + "\n"

		// Aplicar recompensa
		switch tipo {
		case "armor":
			err = getArmor(reward, itemController, character)
		case "weapon":
			err = getWeapon(reward, itemController, character)
		case "pet":
			err = getPet(reward, itemController, character)
		}

		if err != nil {
			return err
		}
	} else {
		// Fracaso
		damage := 30 + rand.Intn(20)
		story += fmt.Sprintf("¡El dragón es invencible! Pierdes %d HP al huir por tu vida.\n", damage)
		err = characterController.Damage(character, damage)
		if err != nil {
			return err
		}
	}

	// Actualizar personaje
	_, err = characterController.ActivityUpdate(character, true)
	if err != nil {
		return err
	}

	return errors.New(story)
}
func dungeonSuccess(character *models.Character, dungeonLevel int) bool {
	characterController := controllers.NewCharacterController(database.DB.Db)
	stats, _, err := characterController.ComputeStats(character)
	if err != nil {
		return false
	}

	// Calculamos probabilidad de éxito basada en stats
	successChance := 0.0
	switch dungeonLevel {
	case 1:
		successChance = (float64(stats.Strength+stats.Defense) / 20.0) * 0.7
	case 2:
		successChance = (float64(stats.Strength+stats.Intelligence) / 30.0) * 0.7
	case 3:
		successChance = (float64(stats.Defense+stats.Heart) / 40.0) * 0.7
	case 4:
		successChance = (float64(stats.Strength+stats.Defense+stats.Intelligence+stats.Heart) / 100.0) * 0.7
	}

	// Añadir bonus por nivel
	level, _, _, err := characterController.ComputeLevel(character)
	if err == nil {
		successChance += float64(level) / 100.0
	}

	// Asegurarnos que está en rango [0.1, 0.9]
	successChance = max(0.1, min(0.9, successChance))

	return rand.Float64() <= successChance
}

func generateReward(character *models.Character, dungeonLevel int) (*models.Item, string, string) {
	rewardType := rand.Intn(3)
	prefixes := []string{"Común", "Raro", "Épico", "Legendario"}
	prefix := prefixes[min(dungeonLevel-1, len(prefixes)-1)]

	var itemName, itemType string
	var statsBonus int

	switch rewardType {
	case 0: // Armadura
		itemType = "armor"
		armorTypes := []string{"Cota de Malla", "Armadura de Cuero", "Placas de Acero", "Armadura Élfica"}
		itemName = fmt.Sprintf("%s %s", prefix, armorTypes[rand.Intn(len(armorTypes))])
		statsBonus = dungeonLevel * (rand.Intn(3) + 1)
	case 1: // Arma
		itemType = "weapon"
		weaponTypes := []string{"Espada", "Hacha", "Arco", "Báculo"}
		itemName = fmt.Sprintf("%s %s", prefix, weaponTypes[rand.Intn(len(weaponTypes))])
		statsBonus = dungeonLevel * (rand.Intn(3) + 1)
	case 2: // Mascota
		itemType = "pet"
		petTypes := []string{"Dragón", "Lobo", "Águila", "Golem"}
		itemName = fmt.Sprintf("%s %s", prefix, petTypes[rand.Intn(len(petTypes))])
		statsBonus = dungeonLevel * (rand.Intn(2) + 1)
	}

	return &models.Item{
		Name:    itemName,
		OwnerID: character.ID,
	}, fmt.Sprintf("¡Has obtenido %s! (+%d a tus stats)", itemName, statsBonus), itemType
}
