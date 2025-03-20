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
	"sort"

	"github.com/Knetic/govaluate"
)

// Contains uninterpreted and interpreted data of a formula.
type Formula struct {
    Source string
    Expression *govaluate.EvaluableExpression
    TagsUsed []string
    Error error
}

// Formula constructor
func NewFormula(input string) (*Formula, error) {
    expr, err := govaluate.NewEvaluableExpressionWithFunctions(input, functions)
    if err != nil {
        return &Formula {
            Source: input,
            Expression: nil,
            TagsUsed: []string{},
            Error: err,
        }, err
    }

    formula := Formula {
        Source: input,
        Expression: expr,
        TagsUsed: []string{},
        Error: nil,
    }

    formula.parseTags()

    return &formula, nil
}

// Helper method to retrieve the tags needed for a formula to evaluate.
func (self *Formula) parseTags() {
    tokens := self.Expression.Tokens()

    tagMap := make(map[string]bool)
    for _, token := range tokens {
        if token.Kind == govaluate.VARIABLE {
            tagMap[token.Value.(string)] = true
        }
    }

    var tags []string
    for key := range tagMap {
        tags = append(tags, key)
    }

    self.TagsUsed = tags
}

// Given a tag-grades map, evaluates the formula.
func (self *Formula) Evaluate(tagMap map[string]any) (result float64, err error) {
    defer func() {
        if catch := recover(); catch != nil {
            result = 0.0
            err = fmt.Errorf("La fórmula no dio un resultado válido.")
        }
    }()

    if !self.allTagsFilled(tagMap) {
        return 0.0, fmt.Errorf("Hay tags en la fórmula que aún no existen.")
    }

    r, err := self.Expression.Evaluate(tagMap)
    if err != nil {
        return 0.0, err
    }
    if result, ok := r.(float64); ok {
        if math.IsNaN(result) || math.IsInf(result, 0) {
            err = fmt.Errorf("La fórmula se indefinió o fue a infinito.")
        }
        return result, err
    }
    result = 0.0
    err = fmt.Errorf("La fórmula debe evaluarse a un número.")
    return result, err
}

// Helper that checks if all tags used in the formula appear on the assignments.
func (self *Formula) allTagsFilled(tagMap map[string]any) bool {
    for _,tag := range self.TagsUsed {
        if _,exists := tagMap[tag]; !exists {
            return false
        }
    }
    return true
}

// Verifies whether a formula is plausible, i.e. if it fails on execution.
// Please note that some formulae may fail on execution on only some data,
// so we can't catch all without disallowing formulae that may be valid on
// some contexts. Thus, we should also check for errors on evaluation.
func (self *Formula) VerifyPlausibility() (isValid bool) {
    if self.Error != nil {
        return false
    }
    testData := make(map[string]any)
    for i,tag := range self.TagsUsed {
        testData[tag] = []float64 { float64(i+1) }
    }
    defer func() {
        if catch := recover(); catch != nil {
            isValid = false
            self.Error = fmt.Errorf("La fórmula no es válida.")
        }
    }()
    _, err := self.Evaluate(testData)
    self.Error = err
    isValid = err == nil
    return isValid
}

// The map with the custom functions formulae accept.
var functions map[string]govaluate.ExpressionFunction = map[string]govaluate.ExpressionFunction {
    "sum": func(args ...any) (any, error) {
        values := toFloat64Slice(args)
        return sum(values)
    },
    "average": func(args ...any) (any, error) {
        values := toFloat64Slice(args)
        return average(values)
    },
    "median": func(args ...any) (any, error) {
        values := toFloat64Slice(args)
        return median(values)
    },
    "min": func(args ...any) (any, error) {
        values := toFloat64Slice(args)
        return minimum(values)
    },
    "max": func(args ...any) (any, error) {
        values := toFloat64Slice(args)
        return maximum(values)
    },
    "top": func(args ...any) (any, error) {
        if len(args) < 2 {
            return []float64{},
                fmt.Errorf("La función top debe tener al menos dos argumentos.")
        }
        count, ok := args[0].(float64)
        if !ok || count != float64(int(count)) {
            return []float64{},
                fmt.Errorf("El primer argumento debe ser un número entero en top.")
        }
        values := toFloat64Slice(args[1:])
        return takeTop(int(count), values)
    },
    "bottom": func(args ...any) (any, error) {
        if len(args) < 2 {
            return []float64{},
                fmt.Errorf("La función bottom debe tener al menos dos argumentos.")
        }
        count, ok := args[0].(float64)
        if !ok || count != float64(int(count)) {
            return []float64{},
                fmt.Errorf("El primer argumento debe ser un número entero en bottom.")
        }
        values := toFloat64Slice(args[1:])
        return takeBottom(int(count), values)
    },
    "offset": func(args ...any) (any, error) {
        if len(args) < 2 {
            return []float64{},
                fmt.Errorf("La función offset debe tener al menos dos argumentos.")
        }
        off, ok := args[0].(float64)
        if !ok {
            return []float64{},
                fmt.Errorf("El primer argumento debe ser un número en offset.")
        }
        values := toFloat64Slice(args[1:])
        return offset(off, values)
    },
    "scale": func(args ...any) (any, error) {
        if len(args) < 2 {
            return []float64{},
                fmt.Errorf("La función scale debe tener al menos dos argumentos.")
        }
        sc, ok := args[0].(float64)
        if !ok {
            return []float64{},
                fmt.Errorf("El primer argumento debe ser un número en scale.")
        }
        values := toFloat64Slice(args[1:])
        return scale(sc, values)
    },
}

// Utility functions that do the computation for the formulae.

// Adds the values up.
func sum(values []float64) (float64, error) {
    sum := 0.0
    for _,v := range values {
        sum += v
    }
    return sum, nil
}

// Gets the average of the values.
func average(values []float64) (float64, error) {
    if len(values) == 0 {
        return 0.0, nil
    }
    sum, err := sum(values)
    return sum / float64(len(values)), err
}

// Gets the median of the values.
func median(values []float64) (float64, error) {
    if len(values) == 0 {
        return 0.0, nil
    }
    sort.Float64s(values)
    median := values[(len(values))/2]
    if len(values) % 2 == 0 {
        median = (median + values[len(values)/2 - 1]) / 2.0
    }
    return median, nil
}

// Gets the minimum of the values.
func minimum(values []float64) (float64, error) {
    if len(values) == 0 {
        return 0.0, nil
    }
    minV := values[0]
    for _,v := range values {
        if v < minV {
            minV = v
        }
    }
    return minV, nil
}

// Gets the maximum of the values.
func maximum(values []float64) (float64, error) {
    if len(values) == 0 {
        return 0.0, fmt.Errorf("Can't find maximum of zero elements.")
    }
    minV := values[0]
    for _,v := range values {
        if v > minV {
            minV = v
        }
    }
    return minV, nil
}

// Takes the highest n values.
func takeTop(count int, values []float64) ([]float64, error) {
    if count > len(values) || count <= 0 {
        return []float64{}, nil
    }
    sort.Float64s(values)
    return values[len(values)-count:], nil
}

// Takes the lowest n values.
func takeBottom(count int, values []float64) ([]float64, error) {
    if count > len(values) || count <= 0 {
        return []float64{}, nil
    }
    sort.Float64s(values)
    return values[:count], nil
}

// Adds an offset to each entry.
func offset(displacement float64, values []float64) ([]float64, error) {
    for i,value := range values {
        values[i] = value + displacement
    }
    return values, nil
}

// Multiplies each entry by a scaling factor.
func scale(factor float64, values []float64) ([]float64, error) {
    for i,value := range values {
        values[i] = value * factor
    }
    return values, nil
}

// Casts an array into an array of floats.
func toFloat64Slice(args []any) []float64 {
    var result []float64
    for _, arg := range args {
        if list, ok := arg.([]float64); ok {
            result = append(result, list...)
        } else if value, ok := arg.(float64); ok {
            result = append(result, value)
        }
    }
    return result
}
