package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/srp-mx/equipo-4-ing-sw/utils"
)

func VerifyFormula(c *fiber.Ctx) error {
	type formula struct {
		formula string `json:"formula"`
	}
	request := new(formula)
	if err := c.BodyParser(request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	form, err := utils.NewFormula(request.formula)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(form)
	}

	if !form.VerifyPlausibility() {
		return c.Status(fiber.StatusBadRequest).JSON(form)
	}

	return c.JSON(fiber.Map{
		"ok":      true,
		"formula": form,
	})
}
