let datosOriginales = {}; // ← Almacena los datos originales para comparar después

document.addEventListener("DOMContentLoaded", () => {
	const formulario = document.querySelector(".formulario");

	const obtenerParametroId = () => {
		const params = new URLSearchParams(window.location.search);
		return params.get("id");
	};

	const cargarEmpleado = async () =>{
		const id = obtenerParametroId();
		if (!id) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "No se proporcionó el ID del empleado.",
			});
			return;
		}

		try {
			const response = await axios.get(`http://localhost:8282/nomina/findRecord/${id}`);
			const empleado = response.data;
			// Rellenar el formulario con los datos del empleado

			document.getElementById('idEmpleado').value = empleado.idEmpleado;
			//document.getElementById('idEmpleadoTexto').textContent = empleado.idEmpleado;
			document.getElementById('nombreEmpleado').value = empleado.nombreEmpleado;
			document.getElementById('apellidoEmpleado').value = empleado.apellidoEmpleado;
			document.getElementById('tipoDocumento').value = empleado.tipoDocumento;
			document.getElementById('numeroDocumento').value = empleado.numeroDocumento;
			document.getElementById('fechaNacimiento').value = empleado.fechaNacimiento.split('T')[0]; // YYYY-MM-DD
			document.getElementById('direccion').value = empleado.direccion;
			document.getElementById('telefono').value = empleado.telefono;
			document.getElementById('correo').value = empleado.correo;
			document.getElementById('cargo').value = empleado.cargo;
			document.getElementById('salario').value = empleado.salario;
			document.getElementById('fechaIngreso').value = empleado.fechaIngreso.split('T')[0]; // YYYY-MM-DD
			document.getElementById('estado').value = empleado.estado;


			// Guardar datos originales para verificar cambios
			datosOriginales = {
				nombreEmpleado: empleado.nombreEmpleado,
				apellidoEmpleado: empleado.apellidoEmpleado,
				tipoDocumento: empleado.tipoDocumento,
				numeroDocumento: empleado.numeroDocumento,
				fechaNacimiento: empleado.fechaNacimiento,
				direccion: empleado.direccion,
				telefono: empleado.telefono,
				correo: empleado.correo,
				cargo: empleado.cargo,
				salario: empleado.salario,
				fechaIngreso: empleado.fechaIngreso,
				estado: empleado.estado

			};
		} catch (error) {
			console.error("Error al obtener el empleado:", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "No se pudo cargar la información del empleado.",
			});
		}
	};

	cargarEmpleado(); // Ejecutar al cargar la página

	formulario.addEventListener("submit", async (e) => {
		e.preventDefault();

		const errores = [];

		const idEmpleado = document.getElementById('idEmpleado').value;
		const nombreEmpleado = document.getElementById('nombreEmpleado').value;
		const apellidoEmpleado = document.getElementById('apellidoEmpleado').value;
		const tipoDocumento = document.getElementById('tipoDocumento').value;
		const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
		const fechaNacimiento = document.getElementById('fechaNacimiento').value;
		const direccion = document.getElementById('direccion').value;
		const telefono = document.getElementById('telefono').value.trim();
		const correo = document.getElementById('correo').value.trim();
		const cargo = document.getElementById('cargo').value;
		const salario = parseFloat(document.getElementById('salario').value);
		const fechaIngreso = document.getElementById('fechaIngreso').value;
		const estado = document.getElementById('estado').value;

		//validaciones 
		if (!["CC", "CE", "PA"].includes(tipoDocumento)) {
			errores.push("Debe seleccionar un tipo de documento válido.");
		}

		// Validar número de documento según el tipo
		if (numeroDocumento === "") {
			errores.push("Debe ingresar un número de documento.");
		} else {
			switch (tipoDocumento) {
				case "CC": // Cédula de ciudadanía
					if (!/^\d{6,10}$/.test(numeroDocumento)) {
						errores.push("La cédula debe tener entre 6 y 10 dígitos numéricos.");
					}
					break;
				case "CE": // Cédula de extranjería
					if (!/^\d{7,12}$/.test(numeroDocumento)) {
						errores.push("La cédula de extranjería debe tener entre 7 y 12 dígitos numéricos.");
					}
					break;
				case "PA": // Pasaporte
					if (!/^[A-Za-z0-9]{6,12}$/.test(numeroDocumento)) {
						errores.push("El pasaporte debe ser alfanumérico y tener entre 6 y 12 caracteres.");
					}
					break;
			}
		}

		if (direccion.length < 3) {
			errores.push("La dirección debe tener al menos 3 caracteres.");
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
			errores.push("Debe ingresar un correo válido.");
		}

		if (!fechaIngreso) {
			errores.push("Debe ingresar la fecha de ingreso.");
		} else {
			const hoy = new Date().toISOString().split("T")[0];
			if (fechaIngreso > hoy) {
				errores.push("La fecha no puede ser en el futuro.");
			}
		}
		if (errores.length > 0) {
			Swal.fire({
				icon: "error",
				title: "Errores en el formulario",
				html: "<ul style='text-align: left;'>" + errores.map(err => `<li>${err}</li>`).join("") + "</ul>",
				confirmButtonColor: '#7d65a9',
				confirmButtonText: "Entendido"
			});
			return;
		}

		// Comprobar si hubo cambios
		const datosActuales = {
			nombreEmpleado,
			apellidoEmpleado,
			tipoDocumento,
			numeroDocumento,
			fechaNacimiento,
			direccion,
			telefono,
			correo,
			cargo,
			salario,
			fechaIngreso,
			estado
		};
		const datosSinCambios = Object.keys(datosOriginales).every(
		      clave => datosOriginales[clave] === datosActuales[clave]
		    );

		if (datosSinCambios) {
			Swal.fire({
				icon: "info",
				title: "Sin cambios",
				text: "No has realizado ninguna modificación.",
				confirmButtonColor: '#7d65a9',
				confirmButtonText: "Aceptar"
			});
			return;
		}

		// Validación de duplicados ajustada
		try {
			const validacion = await axios.post("http://localhost:8282/nomina/validar", {
				idEmpleado,
				numeroDocumento,
				telefono,
				correo
			});

			const duplicados = [];
			if (validacion.data.numeroDocumentoExistente && numeroDocumento !== datosOriginales.numeroDocumento) {
				duplicados.push("Ya existe un empleado con ese número de documento.");
			}
			if (validacion.data.telefonoExistente && telefono !== datosOriginales.telefono) {
				duplicados.push("Ya existe un empleado con ese número de teléfono.");
			}
			if (validacion.data.correoExistente && correo !== datosOriginales.correo) {
				duplicados.push("Ya existe un empleado con ese correo.");
			}
			if (duplicados.length > 0) {
				Swal.fire({
					icon: "warning",
					title: "Datos duplicados",
					html: "<ul style='text-align: left;'>" + duplicados.map(d => `<li>${d}</li>`).join("") + "</ul>",
					confirmButtonColor: '#7d65a9',
					confirmButtonText: "Corregir"
				});
				return;
			}
			// Enviar datos actualizados
			const empleado = {
				idEmpleado,
				nombreEmpleado,
				apellidoEmpleado,
				tipoDocumento,
				numeroDocumento,
				fechaNacimiento,
				direccion,
				telefono,
				correo,
				cargo,
				salario,
				fechaIngreso,
				estado
			};

			const response = await axios.post("http://localhost:8282/nomina/saveNomina", empleado);
			if (response.status === 200) {
				Swal.fire({
					icon: "success",
					title: "¡Empleado actualizado!",
					text: "El empleado fue actualizado correctamente.",
					confirmButtonColor: '#7d65a9',
					confirmButtonText: "Aceptar"
				}).then(() => {
					window.location.href = "mostrarNomina.html";
				});
			}
		} catch (error) {
			console.error("Error al validar o actualizar el empleado:", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Ocurrió un problema al actualizar el empleado.",
				confirmButtonColor: '#7d65a9',
				confirmButtonText: "Aceptar"
			});
		}
	});
});


