// Verificar si el token existe en localStorage


// Evento para manejar el cierre de sesión
document.getElementById('logout-button').addEventListener('click', function() {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    
    // Redirigir a la página de login
    window.location.href = 'login.html';
});