// ==============================
// SISTEMA DE AUTENTICACIÓN
// ==============================

const USUARIOS = [
    { usuario: "admin", password: "1234", nombre: "Administrador" },
    { usuario: "user",  password: "1234", nombre: "Usuario Demo" }
];

const SESSION_KEY = "sesionActiva";

// 1. Lógica del LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita recargar la página

        const usuario  = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value;
        const errorMsg = document.getElementById("errorMsg");

        const encontrado = USUARIOS.find(
            u => u.usuario === usuario && u.password === password
        );

        if (encontrado) {
            localStorage.setItem(SESSION_KEY, "true");
            localStorage.setItem("usuario", encontrado.nombre);
            // Usamos ruta absoluta para redirigir sin fallos
            window.location.href = "/dashboard.html"; 
        } else {
            errorMsg.textContent = "❌ Usuario o contraseña incorrectos";
        }
    });
}

// 2. Proteger páginas privadas
function protegerPagina() {
    if (localStorage.getItem(SESSION_KEY) !== "true") {
        window.location.replace("/login.html");
    }
}

// 3. Verificar si está logueado
function estaLogueado() {
    return localStorage.getItem(SESSION_KEY) === "true";
}

// 4. Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("usuario");
    window.location.href = "/index.html";
}

// 5. Cambiar el botón del menú
document.addEventListener("DOMContentLoaded", () => {
    const navAuth = document.getElementById("nav-auth");
    if (navAuth) {
        if (estaLogueado()) {
            navAuth.innerHTML = `<a href="#" onclick="cerrarSesion()">Cerrar Sesión</a>`;
        } else {
            navAuth.innerHTML = `<a href="/login.html">Iniciar Sesión</a>`;
        }
    }
});