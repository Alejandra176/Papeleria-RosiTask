const form = document.getElementById('formRegistrarEmpleado');


form.addEventListener('submit', function(event) {
	event.preventDefault(); // Prevenir envío por defecto

	// Obtener fechas del formulario
	const fechaNacimientoInput = document.getElementById('fechaNacimiento').value;
	const fechaIngresoInput = document.getElementById('fechaIngreso').value;

	// Validar que las fechas no estén vacías
	if (!fechaNacimientoInput || !fechaIngresoInput) {
		Swal.fire({
			icon: "error",
			title: "Campos vacíos",
			text: "Por favor completa las fechas requeridas.",
		});
		return;
	}

	// ================== VALIDAR MAYORÍA DE EDAD =====================
	const hoyDate = new Date();
	const nacimiento = new Date(fechaNacimientoInput);
	let edad = hoyDate.getFullYear() - nacimiento.getFullYear();
	const mes = hoyDate.getMonth() - nacimiento.getMonth();
	const dia = hoyDate.getDate() - nacimiento.getDate();
	if (mes < 0 || (mes === 0 && dia < 0)) edad--;

	if (edad < 18) {
		Swal.fire({
			icon: "error",
			title: "Edad no válida",
			text: "El empleado debe ser mayor de 18 años.",
		});
		return;
	}

	// ================== VALIDAR FECHA DE INGRESO =====================

	// Función para convertir una fecha a 'YYYY-MM-DD'
	function formatearFecha(fecha) {
		const año = fecha.getFullYear();
		const mes = String(fecha.getMonth() + 1).padStart(2, '0');
		const dia = String(fecha.getDate()).padStart(2, '0');
		return `${año}-${mes}-${dia}`;
	}

	// Obtener la fecha de hoy y formatearla como cadena
	const hoy = new Date();
	const fechaHoyStr = formatearFecha(hoy);

	// Validar si la fecha de ingreso es diferente a la de hoy
	if (fechaIngresoInput !== fechaHoyStr) {
		Swal.fire({
			icon: "error",
			title: "Fecha inválida",
			text: "La fecha de ingreso debe ser hoy.",
		});
		return;
	}

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
	
	// ========== VALIDAR FORMATO DEL CORREO ==========
	const correoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!correoValido.test(nomina.correo)) {
		Swal.fire({
			icon: "error",
			title: "Correo inválido",
			text: "Debe ingresar un correo electrónico válido.",
		});
		return;
	}
	
	// ================== VALIDAR TIPO Y NÚMERO DE DOCUMENTO =====================

	const tipoDocumento = document.getElementById('tipoDocumento').value;
	const numeroDocumento = document.getElementById('numeroDocumento').value.trim();
	const errores = [];

	if (!["CC", "CE", "PA"].includes(tipoDocumento)) {
		errores.push("Debe seleccionar un tipo de documento válido.");
	}

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

	if (errores.length > 0) {
		Swal.fire({
			icon: "error",
			title: "Error de validación",
			text: errores.join("\n"),
		});
		return;
	}



	// Validar duplicados ANTES de enviar al backend
	axios.get('http://localhost:8282/nomina/getAll')
		.then(res => {
			const empleados = res.data;

			const documentoRepetido = empleados.some(e => e.numeroDocumento === nomina.numeroDocumento);
			const correoRepetido = empleados.some(e => e.correo === nomina.correo);
			const telefonoRepetido = empleados.some(e => e.telefono === nomina.telefono);

			if (documentoRepetido || correoRepetido || telefonoRepetido) {
				let mensaje = 'Ya existe un empleado con:';
				if (documentoRepetido) mensaje += '\n- El mismo número de documento';
				if (correoRepetido) mensaje += '\n- El mismo correo electrónico';
				if (telefonoRepetido) mensaje += '\n- El mismo número de teléfono';

				Swal.fire({
					icon: 'error',
					title: 'Datos duplicados',
					text: mensaje,
				});
				return;
			}

			
			// Si no hay duplicados, registrar empleado
			axios.post('http://localhost:8282/nomina/saveNomina', nomina)
				.then(response => {
					Swal.fire({
					  icon: 'success',
					  title: '¡Registro exitoso!',
					  text: 'El empleado se registró correctamente',
					  confirmButtonColor: '#7d65a9',
					  confirmButtonText: 'Aceptar'
					}).then(() => {
					  // Redirigir a mostrarNomina.html después de cerrar el popup
					  window.location.href = 'mostrarNomina.html';
					});
					form.reset();
				})
				.catch(error => {
					console.error('Error al registrar el empleado:', error);
					Swal.fire({
						icon: 'error',
						title: 'Error al registrar',
						text: 'Ocurrió un problema al registrar el empleado',
						confirmButtonColor: '#d33',
						confirmButtonText: 'Intentar de nuevo'
					});
				});
		})
		.catch(error => {
			console.error('Error al obtener empleados:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error de validación',
				text: 'No se pudo validar los datos del empleado',
			});
		});
});