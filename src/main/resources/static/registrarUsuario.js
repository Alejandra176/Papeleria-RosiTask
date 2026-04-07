const form = document.getElementById('formRegistrarUsuario');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita recargar la página

  // Obtener valores
  const nombreEmpleado = document.getElementById('nombreEmpleado').value;
  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value.trim();
  const rol = document.getElementById('rol').value;
  const estado = document.getElementById('estado').value;
  const fechaRegistro = document.getElementById('fechaRegistro').value;

  // Validaciones
  let errores = [];

  if (!nombreEmpleado || nombreEmpleado === '') errores.push("Debe seleccionar un empleado.");
  if (!correo || !correo.includes('@')) errores.push("Debe ingresar un correo válido.");
  if (!contrasena || contrasena.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");
  if (!rol || (rol !== 'Administrador' && rol !== 'Asistente')) errores.push("Debe seleccionar un rol válido.");
  if (estado !== 'Activo' && estado !== 'Inactivo') errores.push("El estado debe ser Activo o Inactivo.");

  if (!fechaRegistro) {
    errores.push("La fecha de registro es obligatoria.");
  } else {
    const hoy = new Date().toISOString().split('T')[0];
    if (fechaRegistro > hoy) errores.push("La fecha de registro no puede ser futura.");
  }

  if (errores.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Errores encontrados',
      html: errores.map(e => `<p style="text-align:left;">• ${e}</p>`).join(''),
      confirmButtonText: 'Corregir'
    });
    return;
  }

  // Verificar si el correo ya existe
  axios.get(`http://localhost:8282/usuario/existeCorreo/${encodeURIComponent(correo)}`)
    .then(response => {
      if (response.data === true) {
        Swal.fire({
          icon: 'warning',
          title: 'Correo duplicado',
          text: 'Ya existe un usuario con ese correo.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      // Crear objeto usuario
      const usuario = {
        correo,
        contrasena,
        rol,
        estado,
        fechaRegistro,
        nombreUsuario  // Este campo tiene el idEmpleado
      };

      axios.post('http://localhost:8282/usuario/saveUsuario', usuario)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado',
            text: 'Usuario registrado correctamente',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.href = "mostrarUsuarios.html";
            form.reset();
          });
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el usuario',
            confirmButtonText: 'Aceptar'
          });
        });
    })
    .catch(error => {
      console.error("Error al verificar correo:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al verificar el correo del usuario.',
        confirmButtonText: 'Aceptar'
      });
    });
});

// Cargar lista de empleados al cargar la página
function cargarEmpleados() {
  axios.get('http://localhost:8282/nomina/getAll')
    .then(response => {
      const empleados = response.data;
      const select = document.getElementById('nombreEmpleado');

      select.innerHTML = '<option value="" disabled selected>Seleccione un empleado</option>';

	  empleados.forEach(empleado => {
	    const option = document.createElement('option');
	    option.value = `${empleado.nombreEmpleado} ${empleado.apellidoEmpleado}`; // valor interno
	    option.textContent = `${empleado.nombreEmpleado} ${empleado.apellidoEmpleado}`; // texto visible
	    select.appendChild(option);
	  });

    })
    .catch(error => {
      console.error('Error al cargar empleados:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los empleados',
        confirmButtonText: 'Aceptar'
      });
    });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarEmpleados();
});
