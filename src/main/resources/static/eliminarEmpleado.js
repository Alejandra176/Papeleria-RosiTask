/**
 * 
 */

document.addEventListener("DOMContentLoaded", function() {
	let idSeleccionadoEliminar = null;

	// Función para cargar los empleados desde la API
	function cargarEmpleados() {
		axios.get("http://localhost:8282/nomina/getAll")
			.then(response => {
				const empleados = response.data;
				const tabla = document.querySelector(".tabla-empleados tbody");
				tabla.innerHTML = ""; // Limpiar tabla

				empleados.forEach(empleado => {
					const fila = document.createElement("tr");
					fila.innerHTML = `
					<td>${empleado.idEmpleado}</td>
					<td>${empleado.nombreEmpleado}</td>
				    <td>${empleado.apellidoEmpleado}</td>
				    <td>${empleado.tipoDocumento}</td>
				    <td>${empleado.numeroDocumento}</td>
					<td>${empleado.estado}</td>
					<td class="acciones">
					    <button class="btn-editar" data-id="${empleado.idEmpleado}">Editar</button>
					    <button class="btn-detalles" data-id="${empleado.idEmpleado}">Detalles</button>
					    <button class="btn-eliminar" data-id="${empleado.idEmpleado}">Eliminar</button>
					</td>
					`;
					tabla.appendChild(fila);
				});

				// Asignar evento a cada botón de eliminar
				document.querySelectorAll(".btn-eliminar").forEach(boton => {
					boton.addEventListener("click", function() {
						idSeleccionadoEliminar = this.getAttribute("data-id");
						abrirModalEliminar(idSeleccionadoEliminar); // Aquí usamos tu modal
					});
				});
			})

			.catch(error => {
				console.error("Error al cargar empleados:", error);
			});
	}


	document.querySelector(".modal .eliminar").addEventListener("click", function() {
		if (idSeleccionadoEliminar) {
			axios.delete(`http://localhost:8282/nomina/deleteNomina/${idSeleccionadoEliminar}`)
				.then(() => {
					cerrarModalEliminar();
					Swal.fire({
						icon: 'success',
						title: '¡Empleado eliminado!',
						text: 'El empleado fue eliminado correctamente.',
						confirmButtonColor: '#7d65a9',
						confirmButtonText: 'Aceptar'
					}).then(() => {

						cargarEmpleados();
					});
				})
				.catch(error => {
					console.error("Error al eliminar:", error);
					Swal.fire({
						icon: 'error',
						title: 'Error al eliminar',
						text: 'No se pudo eliminar el empleado.',
						confirmButtonColor: '#d33',
						confirmButtonText: 'Cerrar'
					});
				});
		}
	});

	// Cuando se hace clic en "Eliminar" dentro del modal
	/*	document.querySelector(".modal .eliminar").addEventListener("click", function() {
			if (idSeleccionadoEliminar) {
				axios.delete(`http://localhost:8282/nomina/deleteNomina/${idSeleccionadoEliminar}`)
					.then(() => {
						alert("Empleado eliminado correctamente");
						cerrarModalEliminar();
						cargarEmpleados(); // recargar lista
					})
					.catch(error => {
						console.error("Error al eliminar:", error);
						alert("No se pudo eliminar el empleado");
					});
			}
		});
		*/
	// Cargar empleados al iniciar
	cargarEmpleados();
});  