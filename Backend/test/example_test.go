package main

import (
	"testing"
	"math"
	"github.com/stretchr/testify/assert"
)

func TestAbs(t *testing.T) {
    t.Run("absolute value test", func(t *testing.T) {
        got := math.Abs(-1.0)
        assert.Equal(t, 1.0, got)
    })
}
