package test

import (
	"testing"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	
	"github.com/srp-mx/equipo-4-ing-sw/models"
	"github.com/srp-mx/equipo-4-ing-sw/Controllers"
	"github.com/stretchr/testify/assert"
)

func setupTestDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&models.User{})
	return db
}

func TestCreateUser(t *testing.T) {
	db := setupTestDB()
	controller := Controllers.NewUserController(db)

	user := &models.User{
		Username: "testuser",
		Password: "securepassword",
	}

	err := controller.CreateUser(user)
	assert.NoError(t, err)

	var foundUser models.User
	db.First(&foundUser, "username = ?", "testuser")

	assert.Equal(t, user.Username, foundUser.Username)
}

func TestUpdateUser(t *testing.T) {
	db := setupTestDB()
	controller := Controllers.NewUserController(db)

	user := &models.User{
		Username: "testuser",
		Password: "oldpassword",
	}
	db.Create(user)

	user.Password = "newpassword"
	err := controller.UpdateUser(user)
	assert.NoError(t, err)

	var updatedUser models.User
	db.First(&updatedUser, "username = ?", "testuser")

	assert.Equal(t, "newpassword", updatedUser.Password)
}

func TestDeleteUser(t *testing.T) {
	db := setupTestDB()
	controller := Controllers.NewUserController(db)

	user := &models.User{
		Username: "testuser",
		Password: "password",
	}
	db.Create(user)

	err := controller.DeleteUser(user)
	assert.NoError(t, err)

	var foundUser models.User
	result := db.First(&foundUser, "username = ?", "testuser")

	assert.Error(t, result.Error) 
}

func TestFindByCredentials(t *testing.T) {
	db := setupTestDB()
	controller := Controllers.NewUserController(db)

	user := &models.User{
		Username: "testuser",
		Password: "securepassword",
	}
	db.Create(user)

	foundUser, err := controller.FindByCredentials("testuser", "securepassword")
	assert.NoError(t, err)
	assert.NotNil(t, foundUser)
	assert.Equal(t, "testuser", foundUser.Username)
}
