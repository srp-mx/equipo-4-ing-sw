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

package utils

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/models"
)

// Random number generator
var rng = rand.New(rand.NewSource(time.Now().UnixNano()))

// Rarity names
var raritySuffixes = []string{
	"Común",
	"Raro",
	"Épico",
	"Legendario",
}

// Available armor types
var armorTypes = []string{
	"Cota de Malla",
	"Armadura de Cuero",
	"Placas de Acero",
	"Armadura Élfica",
}

// Available weapon types
var weaponTypes = []string{
	"Espada",
	"Hacha",
	"Arco",
	"Báculo",
}

// Available pet types
var petTypes = []string{
	"Dragón",
	"Lobo",
	"Águila",
	"Golem",
}

// Dungeon data
type Dungeon struct {
	entryHp               int
	entryText             string
	level                 int
	successText           string
	damageBase            int
	damageExtraRange      int
	lossFtext             string
	randomWeightCommon    int
	randomWeightRare      int
	randomWeightEpic      int
	randomWeightLegendary int
}

// Non-database-backed output of running a dungeon
type DungeonResult struct {
	Damage     int
	Story      string
	Reward     *models.Item
	RewardType models.ItemType
}

// Dungeon list
var dungeons = []Dungeon{
	// Cueva de los Novatos
	{
		entryHp:               20,
		entryText:             "Te adentras en la Cueva de los Novatos, un lugar oscuro pero relativamente seguro.\n\n",
		level:                 1,
		successText:           "Derrotas fácilmente a los slimes y ratas gigantes que habitan la cueva.\n\n",
		damageBase:            10,
		damageExtraRange:      10,
		lossFtext:             "¡Los enemigos te superan! Pierdes %d HP al huir.\n\n",
		randomWeightCommon:    10,
		randomWeightRare:      1,
		randomWeightEpic:      0,
		randomWeightLegendary: 0,
	},
	// Catacumbas Olvidadas
	{
		entryHp:               30,
		entryText:             "Desciendes a las Catacumbas Olvidadas, donde los no-muertos acechan en las sombras.\n\n",
		level:                 2,
		successText:           "Logras purgar a los no-muertos y encontrar un tesoro escondido.\n\n",
		damageBase:            15,
		damageExtraRange:      15,
		lossFtext:             "¡Los no-muertos son demasiado! Pierdes %d HP en la retirada.\n\n",
		randomWeightCommon:    2,
		randomWeightRare:      10,
		randomWeightEpic:      1,
		randomWeightLegendary: 0,
	},
	// Templo Maldito
	{
		entryHp:               40,
		entryText:             "Entras en el Templo Maldito, donde demonios menores adoran a un antiguo dios.\n\n",
		level:                 3,
		successText:           "Derrotas a los demonios y rompes parte de la maldición del templo.\n\n",
		damageBase:            20,
		damageExtraRange:      20,
		lossFtext:             "¡Los demonios son demasiado poderosos! Pierdes %d HP al escapar.\n\n",
		randomWeightCommon:    0,
		randomWeightRare:      20,
		randomWeightEpic:      100,
		randomWeightLegendary: 1,
	},
	// Dragón Ancestral
	{
		entryHp:               50,
		entryText:             "Te enfrentas al Dragón Ancestral en su guarida en lo alto de la Montaña del Fin.\n\n",
		level:                 4,
		successText:           "¡Increíble! Has derrotado al Dragón Ancestral y obtenido su tesoro.\n\n",
		damageBase:            30,
		damageExtraRange:      20,
		lossFtext:             "¡El dragón es invencible! Pierdes %d HP al huir por tu vida.\n",
		randomWeightCommon:    0,
		randomWeightRare:      0,
		randomWeightEpic:      10,
		randomWeightLegendary: 1,
	},
}

// Gets a dungeon by its ID
func GetDungeon(id int) (*Dungeon, error) {
	if id >= len(dungeons) {
		return nil, fmt.Errorf("La mazmorra %d no existe", id)
	}
	return &dungeons[id], nil
}

// Executes the story
func (self Dungeon) Execute(character *models.Character, stats *models.CharacterStats) *DungeonResult {
	// The result
	result := DungeonResult{}

	// Check if entry health is enough
	if character.Hp < self.entryHp {
		result.Story = fmt.Sprintf("Tienes %d puntos de salud, pero se necesitan %d para entrar.\n",
			character.Hp, self.entryHp)
		return &result
	}

	// Start the narration
	result.Story = self.entryText

	// Gauge success
	if self.success(stats) {
		result.Story += self.successText
		self.reward(character, &result)
	} else {
		result.Damage = self.damageBase + rng.Intn(self.damageExtraRange)
		result.Story += fmt.Sprintf(self.lossFtext, result.Damage)
	}

	return &result
}

// Decides weather an encounter is a success or not
func (self Dungeon) success(stats *models.CharacterStats) bool {
	successChance := 0.0

	// Compute success chance based on dungeon level
	switch self.level {
	case 1:
		successChance = (float64(stats.Strength+stats.Defense) / 20.0) * 0.7
	case 2:
		successChance = (float64(stats.Strength+stats.Intelligence) / 30.0) * 0.7
	case 3:
		successChance = (float64(stats.Defense+stats.Heart) / 40.0) * 0.7
	case 4:
		successChance = (float64(stats.Strength+stats.Defense+stats.Intelligence+stats.Heart) / 100.0) * 0.7
	}

	// Make sure it's in range
	successChance = max(0.1, min(0.9, successChance))

	// Random chance
	return rng.Float64() <= successChance
}

// Rewards the character
func (self Dungeon) reward(character *models.Character, result *DungeonResult) {
	// Select random reward type
	result.RewardType = models.ItemType(rng.Intn(3))

	// Select random reward rarity based on weights
	rewardRarity, err := RandomClass(
		self.randomWeightCommon,
		self.randomWeightRare,
		self.randomWeightEpic,
		self.randomWeightLegendary)

	// Set reward rarity to common when in doubt
	if err != nil {
		rewardRarity = 0
	}

	// Reward stats
	stats := models.CharacterStats{}

	// Construct weapon name and stats bonus
	suffix := raritySuffixes[rewardRarity]
	itemName := ""
	statsBonus := 0
	switch result.RewardType {
	case models.ITEM_ARMOR:
		itemName = fmt.Sprintf("%s %s", armorTypes[rng.Intn(len(armorTypes))], suffix)
		stats.Strength = self.level * (rng.Intn(2))
		stats.Defense = self.level * (rng.Intn(3) + 1 + rewardRarity)
		stats.Intelligence = self.level * (rng.Intn(3))
		stats.Heart = self.level * (rng.Intn(2))
	case models.ITEM_WEAPON:
		itemName = fmt.Sprintf("%s %s", weaponTypes[rng.Intn(len(weaponTypes))], suffix)
		stats.Strength = self.level * (rng.Intn(3) + 1 + rewardRarity)
		stats.Defense = self.level * (rng.Intn(3))
		stats.Intelligence = self.level * (rng.Intn(2))
		stats.Heart = self.level * (rng.Intn(3))
	case models.ITEM_PET:
		itemName = fmt.Sprintf("%s %s", petTypes[rng.Intn(len(petTypes))], suffix)
		stats.Strength = self.level * (rng.Intn(4))
		stats.Defense = self.level * (rng.Intn(4))
		stats.Intelligence = self.level * (rng.Intn(2))
		stats.Heart = self.level * (rng.Intn(3) + 1 + rewardRarity)
	}
	statsBonus = stats.Strength + stats.Defense + stats.Intelligence + stats.Heart

	// Add to story
	result.Story += fmt.Sprintf("¡Has obtenido %s! (+%d a tus stats)",
		itemName, statsBonus)

	// Set to reward
	result.Reward = &models.Item{
		Name:         itemName,
		OwnerID:      character.ID,
		Strength:     stats.Strength,
		Defense:      stats.Defense,
		Intelligence: stats.Intelligence,
		Heart:        stats.Heart,
	}
}

// Gets a random class from their weights
func RandomClass(weights ...int) (int, error) {
	// Get sum of odds
	total := 0
	for i, n := range weights {
		total += n
		if n < 0 {
			return 0, fmt.Errorf("La clase %d tiene peso inválido %d\n", i, n)
		}
	}

	// If total adds to zero, weights are invalid
	if total == 0 {
		return 0, fmt.Errorf("Todas las clases tienen peso cero\n")
	}

	// Get the random int
	v := rng.Intn(total)

	// Get the class corresponding with the int
	for i, n := range weights {
		if n == 0 {
			continue
		}
		if v < n {
			return i, nil
		}
		v -= n
	}

	// We can only reach this if all odds are non-positive
	return 0, fmt.Errorf("Unknown error when selecting random class")
}
