// Al cargar la página, obtendremos el ID del pedido de la URL
window.onload = function () {
	const pedidoId = getPedidoIdFromURL();
	cargarPedido(pedidoId);
};

// Obtener el ID desde la URL
function getPedidoIdFromURL() {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('id');
}

// Cargar el pedido desde el backend
function cargarPedido(id) {
	axios.get(`http://localhost:8282/pedido/findRecord/${id}`)
		.then(function (response) {
			const pedido = response.data;
			document.getElementById('idPedido').value = pedido.idPedido;
			document.getElementById('idPedidoTexto').textContent = pedido.idPedido;
			document.getElementById('fechaPedido').value = pedido.fechaPedido;
			document.getElementById('estado').value = pedido.estado;
			document.getElementById('formaPago').value = pedido.formaPago;
			document.getElementById('total').value = pedido.total;
			document.getElementById('fechaEntrega').value = pedido.fechaEntrega;
			document.getElementById('proveedor').value = pedido.proveedor;
			document.getElementById('observaciones').value = pedido.observaciones;
		})
		.catch(function (error) {
			console.error('Error al cargar el pedido:', error);
		});
}

// Evento al enviar el formulario
document.getElementById('formEditar').addEventListener('submit', function (event) {
	event.preventDefault();

	const totalInput = document.getElementById('total');
	const totalValue = totalInput.value.trim();
	const soloNumeros = /^[0-9]+$/;

	// ✅ Validación: Total solo números enteros
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

	// ✅ Validación de fechas
	const fechaPedidoStr = document.getElementById('fechaPedido').value;
	const fechaEntregaStr = document.getElementById('fechaEntrega').value;

	if (!fechaEntregaStr || !fechaPedidoStr) {
		Swal.fire({
			icon: 'warning',
			title: 'Fechas requeridas',
			text: 'Las fechas no pueden estar vacías.',
			confirmButtonColor: '#f0ad4e'
		});
		return;
	}

	// Normalizar fechas
	function normalizarFecha(fechaStr) {
		const [año, mes, dia] = fechaStr.split('-').map(Number);
		return new Date(año, mes - 1, dia);
	}

	const fechaPedido = normalizarFecha(fechaPedidoStr);
	const fechaEntrega = normalizarFecha(fechaEntregaStr);

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

	// ✅ Validación de observaciones
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

	// Crear objeto actualizado
	const pedido = {
		idPedido: document.getElementById('idPedido').value,
		estado: document.getElementById('estado').value,
		formaPago: document.getElementById('formaPago').value,
		total: parseFloat(totalValue),
		fechaEntrega: fechaEntregaStr,
		proveedor: document.getElementById('proveedor').value,
		observaciones: observaciones
	};

	// Enviar al backend
	axios.post('http://localhost:8282/pedido/savePedido', pedido)
		.then(function (response) {
			Swal.fire({
				icon: 'success',
				title: '¡Actualización exitosa!',
				text: 'El pedido fue actualizado correctamente.',
				confirmButtonColor: '#7d65a9',
				confirmButtonText: 'Aceptar'
			}).then(() => {
				window.location.href = 'mostrarPedidos.html';
			});
		})
		.catch(function (error) {
			console.error('Error al guardar el pedido:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error al actualizar',
				text: 'Ocurrió un problema al guardar el pedido.',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Intentar de nuevo'
			});
		});
});
