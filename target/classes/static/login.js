document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const correo = document.getElementById("user_email").value;
    const contrasena = document.getElementById("user_pass").value;

    axios.post("http://localhost:8282/usuario/login", {
        correo: correo,
        contrasena: contrasena
    })
    .then(function (response) {
        const usuario = response.data;

        // Guardar los datos en localStorage
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
        localStorage.setItem("usuarioId", usuario.idUsuario); // MOVIDO AQUÍ

        // Redirigir
        window.location.href = "seleccionModulo.html";
    })
    .catch(function (error) {
        if (error.response) {
            document.getElementById("message").innerText = error.response.data;
        } else {
            document.getElementById("message").innerText = "Error de conexión con el servidor.";
        }
    });
});
