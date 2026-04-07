document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!usuarioLogueado || !usuarioLogueado.idUsuario) {
        alert("No hay usuario logueado. Redirigiendo al login...");
        window.location.href = "index.html"; // Cambia según tu archivo de login
        return;
    }

    const idUsuario = usuarioLogueado.idUsuario;

    axios.get(`http://localhost:8282/usuario/findRecord/${idUsuario}`)
        .then(function (response) {
            const usuario = response.data;

            document.getElementById("idUsuario").innerText = usuario.idUsuario;
            document.getElementById("correo").value = usuario.correo;
            document.getElementById("contrasena").value = "••••••••"; // Oculto por defecto
            document.getElementById("rol").value = usuario.rol;

            // Guardamos contraseña en localStorage por si se quiere mostrar con toggle
            usuarioLogueado.contrasena = usuario.contrasena;
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
        })
        .catch(function (error) {
            console.error("Error al obtener los datos del usuario:", error);
            alert("Hubo un error al cargar la información del perfil.");
        });
});

// Mostrar/ocultar contraseña
function togglePassword() {
    const passElement = document.getElementById("contrasena");
    const isHidden = passElement.value === "••••••••";
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (isHidden) {
        passElement.type = "text";
        passElement.value = usuario.contrasena || "No disponible";
    } else {
        passElement.type = "password";
        passElement.value = "••••••••";
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "index.html";
}

// Habilita los campos para edición
function habilitarEdicion() {
    document.getElementById("correo").disabled = false;
    document.getElementById("contrasena").disabled = false;
    document.getElementById("rol").disabled = false;

    document.querySelector(".btn-editar").style.display = "none";
    document.querySelector(".btn-guardar").style.display = "inline-block";
}

// Guarda los cambios
function guardarCambios() {
    const id = document.getElementById("idUsuario").innerText; // innerText, no .value
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").type === "password" ? JSON.parse(localStorage.getItem("usuarioLogueado")).contrasena : document.getElementById("contrasena").value;
    const rol = document.getElementById("rol").value;

    axios.post("http://localhost:8282/usuario/saveUsuario", {
        idUsuario: id,
        correo: correo,
        contrasena: contrasena,
        rol: rol
    })
    .then(function(response) {
        alert("Usuario actualizado con éxito.");
        
        document.getElementById("correo").disabled = true;
        document.getElementById("contrasena").disabled = true;
        document.getElementById("rol").disabled = true;

        document.querySelector(".btn-editar").style.display = "inline-block";
        document.querySelector(".btn-guardar").style.display = "none";

        // Actualizar localStorage
        const usuarioActualizado = {
            idUsuario: id,
            correo: correo,
            contrasena: contrasena,
            rol: rol
        };
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizado));
    })
    .catch(function(error) {
        alert("Error al actualizar el usuario.");
        console.error(error);
    });
}

function cerrarSesion() {
    // Aquí puedes limpiar datos de sesión o tokens si los tienes
    // Por ejemplo, limpiar localStorage/sessionStorage:
    localStorage.clear();
    sessionStorage.clear();

    // Redirigir al usuario a la página de login o inicio
    window.location.href = 'index.html'; // Cambia a la URL correcta de login
}

