package test

import (
	"testing"
	"github.com/srp-mx/equipo-4-ing-sw/Controllers/UserController.go"
	"github.com/srp-mx/equipo-4-ing-sw/models/User.go"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockUserController struct {
	mock.Mock
}

func (m *MockUserController) CreateUser(user *models.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func (m *MockUserController) UpdateUser(user *models.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func (m *MockUserController) DeleteUser(user *models.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func (m *MockUserController) FindByCredentials (email string, password string) (* models.User, error) {
	args := m.Called(email, password)
	return args.Get(0).(*modelsUser), args.Error(1)
}

func TestCreateUser(t *testing.T) {
	mockRepo := new(MockUserController)
	userController := UserController.NewUserController(mockRepo)

	user := &models.User{
		Username: "pedrito",
		Name: "Pedrote",
		Email: "Pedrito@piedras.com",
		Password: "piedras",
	}

	mockRepo.On("CreateUser", user).Return(nil)
	err := userController.CreateUser(user)
	assert.NoError(t,err)
	mockRepo.AssertCalled(t, "CreateUser", user)
}

func TestUpdateUser(t *testing.T) {
	mockRepo := new(MockUserController)
	userController := UserController.NewUserController(mockRepo)

	user := &models.User{
		Username: "pedrito",
		Name: "Pedrote",
		Email: "Pedrito@piedras.com",
		Password: "piedras",
	}

	mockRepo.On("UpdateUser", user).Return(nil)
	err := userController.UpdateUser(user)
	assert.NoError(t,err)
	mockRepo.AssertCalled(t, "UpdateUser", user)
}

func DeleteUser(t *testing.T) {
	mockRepo := new(MockUserController)
	userController := UserController

	user := &models.User{
		username: "pedrito",
		name: "Pedrote",
		Email: "Pedrito@piedras.com",
		Password: "piedras",
	}
	
	mockRepo.On("DeleteUser", user).Return(nil)
	err := userController.DeleteUser(user)
	assert.NoError(t,err)
	mockRepo.AssertCalled(t, "DeleteUser", user)
}

func TestFindByCredentials(t *testing.T) {
	mockRepo := new(MockUserController)
	userController := UserController.NewUserController(mockRepo)
	
	user := &models.User{
		Username: "pedrito",
		Name: "Pedrote",
		Email: "Pedrito@piedras.com",
		Password: "piedras",
	}

	mockRepo.On("FidnByCredentials", "pedrito", "piedras").Return(user, nil)
	ruser, err := userController.FindByCredentials("pedrito", "piedras")
	assert.NoError(t, err)
	assert.Equal(t,user,ruser)
	mockRepo.AssertCalled(t,"FindBycredentials", "pedrito", "piedras")
}


