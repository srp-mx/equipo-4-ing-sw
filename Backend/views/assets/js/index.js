// Verificar si el token existe en localStorage
if (!localStorage.getItem('Token')) {
    // Si no existe el token, redirigir a la página de login
    window.location.href = 'login.html';
}

fetch('/landing', {
    method: 'GET',
    headers: {
        'Authorization': localStorage.getItem('Token')
    }
})
.then(response => {
    if (response.status !== 200) {
        window.location.href = 'login.html';
    }
})
.catch(error => {
    console.error('Error al verificar el token:', error);
    window.location.href = 'login.html';
});

// Evento para manejar el cierre de sesión
document.getElementById('logout-button').addEventListener('click', function() {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    
    // Redirigir a la página de login
    window.location.href = 'login.html';
});