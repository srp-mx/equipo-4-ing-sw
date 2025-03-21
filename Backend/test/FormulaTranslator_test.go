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
	"testing"

	"github.com/srp-mx/equipo-4-ing-sw/utils"
	"github.com/stretchr/testify/assert"
)

// Grades per tag
var data = map[string]any{
	"x1": []float64{8.0, 9.0, 10.0, 6.0},
	"x2": []float64{3.0, 10.0, 6.0},
	"x3": []float64{2.0, 2.0, 0.0, 1.0},
	"x4": []float64{4.0, 4.0, 6.0, 4.0},
	"x5": []float64{10.4, 11.1, 9.6},
}

// Tests whether or not it accepts formulas with valid syntax and functions.
func TestNewFormula(t *testing.T) {
	formula := "min(0.3 * sum(x1) + 0.7 * average(x2) + 1.0, 10.0)"
	f := assertCreate(t, formula)
	assert.Contains(t, f.TagsUsed, "x1")
	assert.Contains(t, f.TagsUsed, "x2")
	assert.Equal(t, len(f.TagsUsed), 2)

	assertCreateFail(t, "_) gorm+++ (_")
	assertCreateFail(t, "mojitos(0.3)")
}

// Tests if evaluations of multiple functions give the expected output or fail
// graciously.
func TestEvaluateFormula(t *testing.T) {
	assertEval(t, "min(10.0, average(x1))", data, 8.25)
	assertEval(t, "min(10.0, average(x5))", data, 10.0)
	assertEval(t, "min(x1)+min(x2)+max(x3)", data, 6.0+3.0+2.0)
	assertEval(t, "10*median(x1)", data, 85.0)
	assertEval(t, "sum(x3)/4", data, 5.0/4.0)
	assertEval(t, "2*sum(1.0,2.0,3.0,4.0,5.0)", data, 30.0)
	assertEval(t, "sum(top(3,x1,x2,x3,x4,x5))", data, 10.0+10.4+11.1)
	assertEval(t, "sum(bottom(3,x1,x2,x3,x4,x5))", data, 0.0+1.0+2.0)
	assertEval(t, "max(scale(5,x3))-1", data, 9)

	assertEvalFail(t, "min(x6)", data)
	assertEvalFail(t, "offset(-1,max(scale(5,x0)))", data)
}

// Tests if the verification process of a formula is reasonable and catches
// degenerate cases which would pass a syntax check while not disallowing
// valid formulae.
func TestVerifyPlausibilityFormula(t *testing.T) {
	assertVerify(t, "max(1,2,3)", true)
	assertVerify(t, "min(10.0, average(x1))", true)
	assertVerify(t, "min(10.0, average(x5))", true)
	assertVerify(t, "min(x1)+min(x2)+max(x3)", true)
	assertVerify(t, "10*median(x1)", true)
	assertVerify(t, "sum(x3)/4", true)
	assertVerify(t, "2*sum(1.0,2.0,3.0,4.0,5.0)", true)
	assertVerify(t, "sum(top(3,x1,x2,x3,x4,x5))", true)
	assertVerify(t, "sum(bottom(3,x1,x2,x3,x4,x5))", true)

	assertVerify(t, "x2", false)
	assertVerify(t, "bottom(3,x1,x2,x3,x4,x5)", false)
	assertVerify(t, "3/0", false)
	assertVerify(t, "scale(5, x3)", false)
	assertVerify(t, "3*x1", false)
	assertVerify(t, "x4 + 4", false)
	assertVerify(t, "offset(-1,max(scale(5,x3)))", false)
}

// Asserts creation of a Formula should be successful.
func assertCreate(t *testing.T, expr string) *utils.Formula {
	formula, err := utils.NewFormula(expr)
	assert.NoError(t, err)
	return formula
}

// Asserts creation of a Formula should fail.
func assertCreateFail(t *testing.T, expr string) {
	_, err := utils.NewFormula(expr)
	assert.Error(t, err)
}

// Asserts that the result of a formula should be a certain expected value.
func assertEval(t *testing.T, expr string, data map[string]any, expected float64) {
	formula, err := utils.NewFormula(expr)
	assert.NoError(t, err)
	result, err := formula.Evaluate(data)
	assert.NoError(t, err)
	assert.Equal(t, expected, result)
}

// Asserts that the evaluation of a formula should fail given the data.
func assertEvalFail(t *testing.T, expr string, data map[string]any) {
	formula, err := utils.NewFormula(expr)
	assert.NoError(t, err)
	_, err = formula.Evaluate(data)
	assert.Error(t, err)
}

// Asserts that the result of verifying a formula should be the expected value.
func assertVerify(t *testing.T, expr string, expected bool) {
	formula, err := utils.NewFormula(expr)
	assert.NoError(t, err)
	plausible := formula.VerifyPlausibility()
	assert.Equal(t, expected, plausible)
}
