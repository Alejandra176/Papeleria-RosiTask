/**
 * 
 */

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe normalmente

    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const confirmar = document.getElementById('confirmar').value;
    const rol = document.getElementById('rol').value;

    const mensajeError = document.getElementById('mensajeError');
    const mensajeExito = document.getElementById('mensajeExito');
    mensajeError.textContent = '';
    mensajeExito.textContent = '';

    if (contrasena !== confirmar) {
        mensajeError.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    if (rol === "") {
        mensajeError.textContent = 'Debe seleccionar un rol.';
        return;
    }

    const usuarioObj = {
        nombre: nombreUsuario,
        correo: correo,
        contrasena: contrasena,
        rol: rol
    };

    axios.post('http://localhost:8282/usuario/saveUsuario', usuarioObj)
        .then(function(response) {
            mensajeExito.textContent = 'Usuario registrado correctamente.';
            document.getElementById('registroForm').reset();
        })
        .catch(function(error) {
            console.error(error);
            mensajeError.textContent = 'Error al registrar el usuario.';
        });
});
