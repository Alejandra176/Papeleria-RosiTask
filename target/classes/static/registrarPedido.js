const form = document.getElementById('formRegistrarPedido');

// Función reutilizable para establecer la fecha actual en fechaPedido
function setFechaPedidoHoy() {
	const hoy = new Date();
	const fechaLocal = hoy.getFullYear() + '-' +
		String(hoy.getMonth() + 1).padStart(2, '0') + '-' +
		String(hoy.getDate()).padStart(2, '0');
	document.getElementById('fechaPedido').value = fechaLocal;
}

// Al cargar la página, asignar la fecha actual
document.addEventListener('DOMContentLoaded', setFechaPedidoHoy);

form.addEventListener('submit', function(event) {
	event.preventDefault();

	const totalInput = document.getElementById('total');
	const totalValue = totalInput.value.trim();
	const soloNumeros = /^[0-9]+$/;

	//  Validación del campo Total
	if (!soloNumeros.test(totalValue)) {
		Swal.fire({
			icon: 'warning',
			title: 'Dato inválido',
			text: "El campo 'Total' solo debe contener números sin puntos ni comas.",
			confirmButtonColor: '#f0ad4e'
		});
		totalInput.focus();
		return;
	}

	const fechaPedidoStr = document.getElementById('fechaPedido').value;
	const fechaEntregaStr = document.getElementById('fechaEntrega').value;

	//  Validación de fechas vacías
	if (fechaEntregaStr === '') {
		Swal.fire({
			icon: 'warning',
			title: 'Fecha requerida',
			text: 'Debe seleccionar una fecha de entrega.',
			confirmButtonColor: '#f0ad4e'
		});
		return;
	}

	//  Comparación segura de fechas
	const fechaPedido = new Date(fechaPedidoStr);
	const fechaEntrega = new Date(fechaEntregaStr);

	if (fechaEntrega < fechaPedido) {
		Swal.fire({
			icon: 'warning',
			title: 'Fecha inválida',
			text: 'La fecha de entrega no puede ser anterior a la fecha del pedido.',
			confirmButtonColor: '#f0ad4e'
		});
		document.getElementById('fechaEntrega').focus();
		return;
	}

	// Validación de observaciones
	const observaciones = document.getElementById('observaciones').value.trim();
	const cantidadPalabras = observaciones === '' ? 0 : observaciones.split(/\s+/).length;

	if (cantidadPalabras > 500) {
		Swal.fire({
			icon: 'warning',
			title: 'Demasiado texto',
			text: "El campo 'Observaciones' no puede tener más de 500 palabras.",
			confirmButtonColor: '#f0ad4e'
		});
		document.getElementById('observaciones').focus();
		return;
	}
	
	const estado = document.getElementById('estado').value;
	const hoyStr = new Date().toISOString().split('T')[0];

	if (estado === 'Entregado') {
		// Si el usuario seleccionó entregado pero la fecha no es hoy, corregirla o advertir
		if (fechaEntregaStr !== hoyStr) {
			// Puedes elegir entre forzarla o mostrar alerta
			Swal.fire({
				icon: 'warning',
				title: 'Fecha no válida para estado Entregado',
				text: 'Para marcar como "Entregado", la fecha de entrega debe ser hoy.',
				confirmButtonColor: '#f0ad4e'
			});
			document.getElementById('fechaEntrega').focus();
			return;
		}
	}

	const pedido = {
		fechaPedido: fechaPedidoStr,
		estado: document.getElementById('estado').value,
		formaPago: document.getElementById('formaPago').value,
		total: totalValue,
		fechaEntrega: fechaEntregaStr,
		proveedor: document.getElementById('proveedor').value,
		observaciones: observaciones
	};

	axios.post('http://localhost:8282/pedido/savePedido', pedido)
		.then(response => {
			Swal.fire({
				icon: 'success',
				title: '¡Registro exitoso!',
				text: 'El pedido fue registrado correctamente.',
				confirmButtonColor: '#7d65a9',
				confirmButtonText: 'Aceptar'
			}).then(() => {
				//  Redireccionar al listad
				window.location.href = 'mostrarPedidos.html';
			});

		})
		.catch(error => {
			console.error('Error al registrar el pedido:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al registrar',
				text: 'Ocurrió un problema al registrar el pedido.',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Intentar de nuevo'
			});
		});
});
