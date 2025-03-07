package config

import (
	"os"
)

const Secret = os.Getenv("SECRET")
