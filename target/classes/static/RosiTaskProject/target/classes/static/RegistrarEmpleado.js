/**
 * 
 */
// Obtener el formulario
const form = document.getElementById('formRegistrarEmpleado');

form.addEventListener('submit', function(event) {
	event.preventDefault();  // Prevenir que se recargue la página

	// Recoger los valores del formulario

	const nomina = {
		nombreEmpleado: document.getElementById('nombreEmpleado').value,
		apellidoEmpleado: document.getElementById('apellidoEmpleado').value,
		tipoDocumento: document.getElementById('tipoDocumento').value,
		numeroDocumento: document.getElementById('numeroDocumento').value,
		fechaNacimiento: document.getElementById('fechaNacimiento').value,
		direccion: document.getElementById('direccion').value,
		telefono: document.getElementById('telefono').value,
		correo: document.getElementById('correo').value,
		cargo: document.getElementById('cargo').value,
		salario: document.getElementById('salario').value,
		fechaIngreso: document.getElementById('fechaIngreso').value,
		estado: document.getElementById('estado').value,
		};
		
		// Usar Axios para enviar el producto al backend
		  axios.post('http://localhost:8282/nomina/saveNomina', nomina)
		    .then(response => {
				// Si la solicitud fue exitosa
				      alert('Empleado registrado correctamente');
				      console.log('Empleado registrado:', response.data);
				      // Aquí puedes redirigir a otra página o limpiar el formulario, si lo prefieres
				      form.reset();  // Limpiar el formulario
				    })
					.catch(error => {
					      // Manejo de errores
					      console.error('Error al registrar el empleado:', error);
					      alert('Error al registrar el empleado');
					    });
					});
		