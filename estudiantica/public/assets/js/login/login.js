const emailButton = document.getElementById('email-button');
const googleButton = document.getElementById('google-button');
const emailContainer = document.getElementById('email-container');
const returnBotton = document.getElementById("return-botton");
const messageLogin = document.getElementById('message-login');
const notificationContainer = document.getElementById("notification-container");
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const loginButton = document.getElementById('login-button');

const url = 'URL de prueba';
let params = {};

function showNotification(message,type) {
    notificationContainer.classList.remove('hidden')

    const notification = document.createElement('div');
    notification.className = `pixel-corner-notification flex items-center justify-between px-4 py-2 text-white 
    transition-opacity opacity-0 transform translate-x-5
    ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-yellow-500"}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-4 text-xl">&times;</button>
    `;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove("opacity-0", "translate-x-5");
    }, 100);

    setTimeout(() => {
        notification.classList.add("opacity-0", "translate-x-5");
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

emailButton.addEventListener('click', () => {
    googleButton.classList.add('hidden');
    emailButton.classList.add('hidden');
    emailContainer.classList.remove('hidden');
    returnBotton.classList.remove('hidden');
    messageLogin.classList.add('hidden');
    notificationContainer.classList.add('hidden')
});

googleButton.addEventListener('click', () => {
    showNotification('No disponible por el momento','error')
});

const togglePassword = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eye-icon");

togglePassword.addEventListener("click", () => {
if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M10.73 10.73a3.75 3.75 0 105.27 5.27M6.53 6.53A9.77 9.77 0 012.25 12a9.77 9.77 0 011.47-2.25m15.8 2.25a9.77 9.77 0 00-1.47-2.25" />
    `;
} else {
    passwordInput.type = "password";
    eyeIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12c2.25-4.5 6.75-7.5 9.75-7.5s7.5 3 9.75 7.5c-2.25 4.5-6.75 7.5-9.75 7.5s-7.5-3-9.75-7.5z" />
    `;
}
});

returnBotton.addEventListener("click", () =>{
    googleButton.classList.remove("hidden");
    emailButton.classList.remove("hidden");
    emailContainer.classList.add("hidden");
    messageLogin.classList.remove('hidden');
});

loginButton.addEventListener('click', () => {
    if(url === 'URL de prueba'){
        showNotification("La url es de prueba","error")
        return;
    }
    const email = inputEmail.value;
    const password = inputPassword.value;
    if(email === '' || password === ''){
        showNotification('Se deben de completar todos los campos','error');
    }else{
        params = {
            method : "POST",
            body : JSON.stringify({
                email,password
            })
        }

        fetch(`${url}/login`,params).then(response => {
            if(!response.ok) throw new Error("Invalid credentials");
            return response.json();
        }).then(data => {
            localStorage.setItem('token',data.token);
            window.location.href = 'index.html'
            return data;
        }).catch((error) => {
            showNotification('Error al iniciar sesión','error');
        });
    }
})




