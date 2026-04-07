/**
 * 
 */

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const correo = document.getElementById("user_email").value;
    const contrasena = document.getElementById("user_pass").value;

    axios.post("http://localhost:8282/usuario/login", {
        correo: correo,
        contrasena: contrasena
    })
    .then(function (response) {
        const mensaje = response.data;

        // Mostrar mensaje
        document.getElementById("message").innerText = mensaje;

        // Redirigir según el rol
        if (mensaje.includes("administrador")) {
            window.location.href = "seleccionModulo.html";
        } else if (mensaje.includes("asistente")) {
            window.location.href = "seleccionModulo.html";
        }
    })
    .catch(function (error) {
        if (error.response) {
            document.getElementById("message").innerText = error.response.data;
        } else {
            document.getElementById("message").innerText = "Error de conexión con el servidor.";
        }
    });
});

