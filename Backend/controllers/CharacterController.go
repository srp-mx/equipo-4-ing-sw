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
	"math"
	"time"

	"github.com/srp-mx/equipo-4-ing-sw/models"
	"gorm.io/gorm"
)

// Days of inactivity to delete the character
const DAYS_TO_DIE int = 7

// Number of levels corresponding to one earned skill point
const LEVELS_PER_SKILL_POINT int = 1

// Amount of HP healed passively per hour
const HP_PER_HOUR int = 5

// Character controller type
type CharacterController struct {
	DB *gorm.DB
}

// CharacterController constructor
func NewCharacterController(db *gorm.DB) *CharacterController {
	return &CharacterController{DB: db}
}

// Creates a new character on the database
func (self *CharacterController) CreateCharacter(character *models.Character) error {
	err := self.DB.Create(character).Error
	if err != nil {
		return err
	}

	now := time.Now()

	wears := &models.Wears{
		CharacterID: character.ID,
		Armor:       nil,
		Since:       now,
	}
	equips := &models.Equips{
		CharacterID: character.ID,
		Weapon:      nil,
		Since:       now,
	}
	accompanies := &models.Accompanies{
		CharacterID: character.ID,
		Pet:         nil,
		Since:       now,
	}

	err = self.DB.Create(wears).Error
	if err != nil {
		self.DB.Delete(character)
		return err
	}
	err = self.DB.Create(equips).Error
	if err != nil {
		self.DB.Delete(character)
		return err
	}
	err = self.DB.Create(accompanies).Error
	if err != nil {
		self.DB.Delete(character)
		return err
	}

	return nil
}

// Updates an existing character on the database
func (self *CharacterController) UpdateCharacter(character *models.Character) error {
	return self.DB.Save(character).Error
}

// Deletes an existing character on the database
func (self *CharacterController) DeleteCharacter(character *models.Character) error {
	return self.DB.Delete(character).Error
}

// Fills in the receiver with an existing character's data that matches its ID
func (self *CharacterController) Get(receiver *models.Character) error {
	return self.DB.
		Where(&models.Character{
			ID: receiver.ID,
		}).
		First(receiver).Error
}

// Returns a character that matches the query's ID on the database
func (self *CharacterController) GetWithCopy(query models.Character) (*models.Character, error) {
	result := models.Character{}
	err := self.DB.
		Where(&models.Character{
			ID: query.ID,
		}).
		First(&result).Error
	if err != nil {
		return nil, err
	}

	return &result, nil
}

// Returns a character by their name on the database
func (self *CharacterController) FindByName(name string) (*models.Character, error) {
	var character models.Character

	err := self.DB.
		Where("name = ?", name).
		First(&character).Error

	if err != nil {
		return nil, err
	}

	return &character, nil
}

// Tells whether or not a character with the given ID exists in the database
func (self *CharacterController) Exists(character models.Character) (bool, error) {
	var count int64
	result := self.DB.Model(&models.Character{}).
		Where(&models.Class{
			ID: character.ID,
		}).Count(&count)
	return count > 0, result.Error
}

// Updates the character which matches the source's ID with the valid entries
// on the updates map in the database
func (self *CharacterController) UpdateWithMap(source *models.Character, updates map[string]any) error {
	foundCharacter, err := self.GetWithCopy(*source)
	if err != nil {
		return err
	}

	if value, exists := updates["name"]; exists {
		v, ok := value.(string)
		if !ok {
			return fmt.Errorf("El nuevo nombre no es una cadena")
		}
		if v == "" {
			return fmt.Errorf("El nuevo nombre no puede ser vacío")
		}
		if _, err := self.FindByName(v); err == nil {
			return fmt.Errorf("El nombre ya está en uso")
		}
		foundCharacter.Name = v
	}

	return self.UpdateCharacter(foundCharacter)
}

// Computes net stats and returns the streak multiplier applied too
func (self *CharacterController) ComputeStats(character *models.Character) (models.CharacterStats, float64, error) {
	stats := models.CharacterStats{
		Strength:     0,
		Defense:      0,
		Intelligence: 0,
		Heart:        0,
	}

	err := self.Get(character)
	if err != nil {
		return stats, 0, err
	}

	stats.Strength += character.StrengthExtra
	stats.Defense += character.DefenseExtra
	stats.Intelligence += character.IntelligenceExtra
	stats.Heart += character.HeartExtra

	// Load armor worn and add effects
	err = self.LoadWearing(character)
	if err != nil {
		return stats, 0, err
	}
	if character.Wears.Armor != nil {
		stats.Strength += character.Wears.Armor.Strength
		stats.Defense += character.Wears.Armor.Defense
		stats.Intelligence += character.Wears.Armor.Intelligence
		stats.Heart += character.Wears.Armor.Heart
	}
	// Load weapon equipped and add effects
	err = self.LoadEquipped(character)
	if err != nil {
		return stats, 0, err
	}
	if character.Equips.Weapon != nil {
		stats.Strength += character.Equips.Weapon.Strength
		stats.Defense += character.Equips.Weapon.Defense
		stats.Intelligence += character.Equips.Weapon.Intelligence
		stats.Heart += character.Equips.Weapon.Heart
	}
	// Load pet accompanying and add effects
	err = self.LoadAccompanying(character)
	if err != nil {
		return stats, 0, err
	}
	if character.Accompanies.Pet != nil {
		stats.Strength += character.Accompanies.Pet.Strength
		stats.Defense += character.Accompanies.Pet.Defense
		stats.Intelligence += character.Accompanies.Pet.Intelligence
		stats.Heart += character.Accompanies.Pet.Heart
	}

	multiplier := self.streakBonusMultiplier(character.Streak)
	stats.Strength += int(math.Round(float64(stats.Strength) * multiplier))
	stats.Defense += int(math.Round(float64(stats.Defense) * multiplier))
	stats.Intelligence += int(math.Round(float64(stats.Intelligence) * multiplier))
	stats.Heart += int(math.Round(float64(stats.Heart) * multiplier))

	return stats, multiplier, nil
}

// Gives a bonus stat multiplier given the length of the streak.
func (self *CharacterController) streakBonusMultiplier(streak int) float64 {
	// This function has the following characteristics:
	//     - 0   days: +0%
	//     - 7   days: +48.3%
	//     - 30  days: +100%
	//     - 100 days: +182.6%
	//     - 365 days: +348.8%
	//     - ~5 years: +780%
	return math.Sqrt(float64(streak) / 30.0)
}

// Calculates the XP
func (self *CharacterController) ComputeXp(character *models.Character) (uint64, error) {
	// XP is calculated in the following manner:
	// 1. Add extra points
	// 2. Add 1 point for each assignment done
	// 3. Add round(6*grade%) points for each grade in done assignments
	// 4. For each class with a passed end date, add 24 points
	// 5. For each class with a passed end date, add round(201*grade%)

	err := self.Get(character)
	if err != nil {
		return 0, err
	}
	xp := character.ExtraPoints

	users := NewUserController(self.DB)
	user := models.User{Username: character.UserUsername}
	err = users.Get(&user)
	if err != nil {
		return 0, err
	}

	err = users.LoadClasses(&user)
	if err != nil {
		return 0, err
	}

	assignments, err := users.LoadAssignments(&user)
	if err != nil {
		return 0, err
	}

	for _, assignment := range assignments {
		if assignment.Progress > 0 {
			xp += 1
			xp += uint64(math.Round(6 * assignment.Grade / 100))
			// TODO: Consider the proposed separation of Grade in two 0-100
			//       percentages (grade, extra credits).
		}
	}

	classes := NewClassController(self.DB)
	for _, class := range user.Classes {
		if class.EndDate.Before(time.Now()) {
			xp += 24
			grade, err := classes.GetGrade(&class)
			if err != nil {
				return 0, err
			}
			xp += uint64(math.Round(201 * grade / 100))
		}
	}

	return xp, nil
}

// Calculates the level
func (self *CharacterController) ComputeLevel(character *models.Character) (level int, levelPercent float64, xpUntilNext uint64, err error) {
	// Level is calculated in the following manner:
	// 1. For levels 1-9, the xp per level is y_i = [6 8 13 18 24 26 28 28 29]
	// 2. For levels beyond, the formula is y_i=0.0842i^2 + 0.1954i + 22.05
	// 3. Therefore to get the level based on the xp, we 'integrate' it
	//
	// So, for levels 1-9 the level->xp function is:
	// {1 if xp < 6, 2 if xp < 6+8, 3 if xp < 6+8+13, ..., 9 if xp < 6+8+...+29}
	//
	// We can get the rest of the level->xp with F(x)-F(9)+(6+8+...+29) where:
	// F(x) = 0.08421x^3/3 + 0.1954x^2/2 + 22.05x
	//
	// Ideally, we would simply invert the function of level->xp, but this case
	// is non-trivial, so we do binary search on the level->xp function.

	// 2^63 XP is needed a bit after level 6,900,000 with the current formula.
	const MAX_LEVEL int = 6_900_001

	// Formula level->xp
	levelToXp := func(lvl int) uint64 {
		if lvl >= MAX_LEVEL {
			return math.MaxUint64
		}
		sums1to9 := [10]uint64{0, 6, 14, 27, 45, 69, 95, 123, 151, 180}
		if lvl < 10 {
			return sums1to9[lvl]
		}
		x := float64(lvl)
		x2 := x * x
		F9 := 226.8243
		total1to9 := float64(sums1to9[9])
		return uint64(0.08421*x*x2 + 0.1954*x2 + 22.05*x + total1to9 - F9)
	}

	// Get the XP
	xp, err := self.ComputeXp(character)
	if err != nil {
		return 0, 0, 0, err
	}

	// Binary search to get the level. It's the infimum of unreached XP.
	lo, hi := 1, MAX_LEVEL
	for lo < hi {
		mid := (lo + hi) / 2
		if levelToXp(mid) <= xp {
			lo = mid + 1
		} else {
			hi = mid
		}
	}

	// Since it's the infimum, it is one before the lowest unreached level.
	level = lo - 1
	levelMinXp := levelToXp(level)
	levelMaxXp := levelToXp(level + 1)
	levelPercent = float64(xp-levelMinXp) / float64(levelMaxXp-levelMinXp)
	xpUntilNext = levelMaxXp - xp
	return level, levelPercent, xpUntilNext, err
}

// Updates character's activity data; serves as a ping for user action.
// The isActive flag updates MomentOfLatestAction at the end if it's enabled.
// This might delete the character if it has remained inactive.
func (self *CharacterController) ActivityUpdate(character *models.Character, isActive bool) (deleted bool, err error) {
	if character == nil {
		return true, nil // Not existing is ok
	}

	exists, err := self.Exists(*character)
	if err != nil {
		return false, err
	}
	if !exists {
		return true, nil // Not existing is ok
	}

	err = self.Get(character)
	if err != nil {
		return false, err
	}

	modified, err := self.GetWithCopy(*character)
	if err != nil {
		return false, err
	}

	streak, err := self.NextStreak(character)
	if err != nil {
		return false, err
	}
	if isActive || streak == 0 {
		modified.Streak = streak
	}

	heal, err := self.NextPassiveHeal(character)
	if err != nil {
		return false, err
	}
	if isActive {
		modified.Hp = min(models.MAX_HP, character.Hp+heal)
	}

	shouldDelete, err := self.ShouldDelete(character)
	if err != nil {
		return false, err
	}

	if shouldDelete {
		err = self.DeleteCharacter(character)
		return true, err
	}

	if isActive {
		modified.MomentOfLatestAction = time.Now()
	}
	return false, self.UpdateCharacter(modified)
}

// Gives the value the character's streak should be modified to. Assumes that
// if the MomentOfLatestAction has been set to today, the streak has been
// modified already, i.e. the streak should be modified before that.
func (self *CharacterController) NextStreak(character *models.Character) (int, error) {
	err := self.Get(character)
	if err != nil {
		return 0, err
	}

	dayActive := character.MomentOfLatestAction.Truncate(24 * time.Hour)
	today := time.Now().Truncate(24 * time.Hour)

	activeToday := today.Year() == dayActive.Year()
	activeToday = activeToday && (today.Month() == dayActive.Month())
	activeToday = activeToday && (today.Day() == dayActive.Day())

	// If we were active today, the streak should have been counted already
	if activeToday {
		return character.Streak, nil
	}

	lossDate, err := self.StreakLossDate(character)
	if err != nil {
		return 0, err
	}

	// If we were last active not today, but it's not the loss date yet,
	// it means we are continuing the streak.
	if time.Now().Before(lossDate) {
		return character.Streak + 1, nil
	}

	// If the loss date has come to pass, lose the streak
	return 0, nil
}

// Gives the date a character would lose its streak
func (self *CharacterController) StreakLossDate(character *models.Character) (time.Time, error) {
	exists, err := self.Exists(*character)
	if err != nil {
		return time.Now(), err
	}
	if !exists {
		return time.Now(), fmt.Errorf("El personaje ya no existe")
	}

	err = self.Get(character)
	if err != nil {
		return time.Now(), err
	}

	// We add two days since we want to allow the entirety of the next day
	dayActive := character.MomentOfLatestAction.Truncate(24 * time.Hour)
	return dayActive.AddDate(0, 0, 2), nil
}

// Checks whether a character should be deleted
func (self *CharacterController) ShouldDelete(character *models.Character) (bool, error) {
	deletion, err := self.DeletionDate(character)
	if err != nil {
		return false, nil
	}
	return deletion.Before(time.Now()), nil
}

// Gives the date a character should be deleted if it remains inactive
func (self *CharacterController) DeletionDate(character *models.Character) (time.Time, error) {
	exists, err := self.Exists(*character)
	if err != nil {
		return time.Now(), err
	}
	if !exists {
		return time.Now(), fmt.Errorf("El personaje ya no existe")
	}

	err = self.Get(character)
	if err != nil {
		return time.Now(), err
	}

	return character.MomentOfLatestAction.AddDate(0, 0, DAYS_TO_DIE), nil
}

// Gets all obtained (free or not) skill points
func (self *CharacterController) computeSkillPoints(character *models.Character) (int, error) {
	level, _, _, err := self.ComputeLevel(character)
	if err != nil {
		return 0, err
	}
	return level / LEVELS_PER_SKILL_POINT, nil
}

// Gets the available assignable skill points
func (self *CharacterController) ComputeFreeSkillPoints(character *models.Character) (int, error) {
	points, err := self.computeSkillPoints(character)
	if err != nil {
		return 0, err
	}
	err = self.Get(character)
	if err != nil {
		return 0, err
	}
	points -= character.StrengthExtra
	points -= character.DefenseExtra
	points -= character.IntelligenceExtra
	points -= character.HeartExtra
	return points, nil
}

// Assigns free skill points, errors if there's not enough available
func (self *CharacterController) AssignFreeSkillPoints(character *models.Character, points *models.CharacterStats) error {
	err := self.Get(character)
	if err != nil {
		return err
	}

	free, err := self.ComputeFreeSkillPoints(character)
	if err != nil {
		return nil
	}
	free -= points.Strength
	free -= points.Defense
	free -= points.Intelligence
	free -= points.Heart
	if free < 0 {
		return fmt.Errorf("No hay suficientes puntos de habilidad disponibles")
	}
	character.StrengthExtra += points.Strength
	character.DefenseExtra += points.Defense
	character.IntelligenceExtra += points.Intelligence
	character.HeartExtra += points.Heart

	return self.UpdateCharacter(character)
}

// Adds extra XP points
func (self *CharacterController) AddBonusXp(character *models.Character, points uint) error {
	err := self.Get(character)
	if err != nil {
		return err
	}
	character.ExtraPoints += uint64(points)
	return self.UpdateCharacter(character)
}

// Decreases HP
func (self *CharacterController) Damage(character *models.Character, points int) error {
	if points < 0 {
		return fmt.Errorf("El daño no puede ser negativo")
	}

	err := self.Get(character)
	if err != nil {
		return err
	}

	character.Hp -= points
	if character.Hp < 0 {
		character.Hp = 0
	}
	return self.UpdateCharacter(character)
}

// Increases HP
func (self *CharacterController) Heal(character *models.Character, points int) error {
	if points < 0 {
		return fmt.Errorf("La curación no puede ser negativa")
	}

	err := self.Get(character)
	if err != nil {
		return err
	}

	character.Hp += points
	if character.Hp > models.MAX_HP {
		character.Hp = models.MAX_HP
	}
	return self.UpdateCharacter(character)
}

// Calculates the amount to heal passively based on the MomentOfLatestAction,
// which should be updated on passive heal after calling this.
func (self *CharacterController) NextPassiveHeal(character *models.Character) (int, error) {
	err := self.Get(character)
	if err != nil {
		return 0, err
	}
	currentHour := time.Now().Truncate(time.Hour)
	activeHour := character.MomentOfLatestAction.Truncate(time.Hour)
	hoursDelta := int(currentHour.Sub(activeHour).Hours())
	return max(0, min(HP_PER_HOUR*hoursDelta, models.MAX_HP)), nil
}

// Assigns what armor the character is using now.
func (self *CharacterController) Wear(character *models.Character, armor *models.Armor) error {
	items := NewItemController(self.DB)
	if err := items.GetArmor(character, armor); err != nil {
		return err
	}
	oldArmor := character.Wears.Armor
	if oldArmor != nil {
		oldArmor.WearsID = nil
		err := self.DB.Save(oldArmor).Error
		if err != nil {
			return err
		}
	}
	armor.WearsID = &character.Wears.ID
	character.Wears.Armor = armor
	character.Wears.Since = time.Now()
	err := self.DB.Save(armor).Error
	if err != nil {
		return err
	}
	err = self.DB.Save(&character.Wears).Error
	if err != nil {
		return err
	}
	err = self.DB.Save(character).Error
	if err != nil {
		return err
	}

	return nil
}

// Assigns what weapon the character is using now.
func (self *CharacterController) Equip(character *models.Character, weapon *models.Weapon) error {
	items := NewItemController(self.DB)
	if err := items.GetWeapon(character, weapon); err != nil {
		return err
	}
	oldWeapon := character.Equips.Weapon
	if oldWeapon != nil {
		oldWeapon.EquipsID = nil
		err := self.DB.Save(oldWeapon).Error
		if err != nil {
			return err
		}
	}
	weapon.EquipsID = &character.Equips.ID
	character.Equips.Weapon = weapon
	character.Equips.Since = time.Now()
	err := self.DB.Save(weapon).Error
	if err != nil {
		return err
	}
	err = self.DB.Save(&character.Equips).Error
	if err != nil {
		return err
	}
	err = self.DB.Save(character).Error
	if err != nil {
		return err
	}

	return nil
}

// Assigns what pet the character is using now.
func (self *CharacterController) Accompany(character *models.Character, pet *models.Pet) error {
	items := NewItemController(self.DB)
	if err := items.GetPet(character, pet); err != nil {
		return err
	}
	oldPet := character.Accompanies.Pet
	if oldPet != nil {
		oldPet.AccompaniesID = nil
		err := self.DB.Save(oldPet).Error
		if err != nil {
			return err
		}
	}
	pet.AccompaniesID = &character.Accompanies.ID
	character.Accompanies.Pet = pet
	character.Accompanies.Since = time.Now()
	err := self.DB.Save(pet).Error
	if err != nil {
		return err
	}
	err = self.DB.Save(&character.Accompanies).Error
	if err != nil {
		return err
	}
	err = self.DB.Save(character).Error
	if err != nil {
		return err
	}

	return nil
}

// Loads the armor the character is using into Wears.Armor.
func (self *CharacterController) LoadWearing(character *models.Character) error {
	err := self.Get(character)
	if err != nil {
		return err
	}
	err = self.DB.Preload("Wears").First(character, "id=?", character.ID).Error
	if err != nil {
		return err
	}
	return self.DB.Preload("Armor").
		First(&(character.Wears), "id=?", character.Wears.ID).Error
}

// Loads the weapon the character is using into Equips.Weapon.
func (self *CharacterController) LoadEquipped(character *models.Character) error {
	err := self.Get(character)
	if err != nil {
		return err
	}
	err = self.DB.Preload("Equips").First(character, "id=?", character.ID).Error
	if err != nil {
		return err
	}
	return self.DB.Preload("Weapon").
		First(&(character.Equips), "id=?", character.Equips.ID).Error
}

// Loads the pet the character is using into Accompanies.Pet.
func (self *CharacterController) LoadAccompanying(character *models.Character) error {
	err := self.Get(character)
	if err != nil {
		return err
	}
	err = self.DB.Preload("Accompanies").First(character, "id=?", character.ID).Error
	if err != nil {
		return err
	}
	return self.DB.Preload("Pet").
		First(&(character.Accompanies), "id=?", character.Accompanies.ID).Error
}

// Loads the armors the character owns into Armors.
func (self *CharacterController) LoadArmors(character *models.Character) error {
	return self.DB.Preload("Armors").First(character, "id=?", character.ID).Error
}

// Loads the weapons the character owns into Weapons.
func (self *CharacterController) LoadWeapons(character *models.Character) error {
	return self.DB.Preload("Weapons").First(character, "id=?", character.ID).Error
}

// Loads the pets the character owns into Pets.
func (self *CharacterController) LoadPets(character *models.Character) error {
	return self.DB.Preload("Pets").First(character, "id=?", character.ID).Error
}
