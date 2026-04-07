document.addEventListener("DOMContentLoaded", function() {
	let idSeleccionadoEliminar = null;

	// Exportar esta función para que mostrarPedidos.js pueda usarla
	function asignarEventosEliminar() {
		document.querySelectorAll(".btn-eliminar").forEach(boton => {
			boton.addEventListener("click", function() {
				idSeleccionadoEliminar = this.getAttribute("data-id");
				abrirModalEliminar(idSeleccionadoEliminar);
			});
		});
	}

	// Hacer accesible desde mostrarPedidos.js
	window.asignarEventosEliminar = asignarEventosEliminar;

	// Evento de eliminación confirmado desde el modal
	document.querySelector(".modal .eliminar").addEventListener("click", function() {
		if (idSeleccionadoEliminar) {
			axios.delete(`http://localhost:8282/pedido/deletePedido/${idSeleccionadoEliminar}`)
				.then(() => {
					cerrarModalEliminar();

					//  Mensaje visual con SweetAlert
					Swal.fire({
						icon: 'success',
						title: '¡Pedido eliminado!',
						text: 'El pedido se eliminó correctamente.',
						confirmButtonColor: '#7d65a9',
						confirmButtonText: 'Aceptar'
					});

					//  Eliminar del array de pedidos global
					if (typeof pedidos !== "undefined") {
						pedidos = pedidos.filter(p => p.idPedido !== parseInt(idSeleccionadoEliminar));
					}

					//  Volver a dibujar la tabla sin recargar del servidor
					if (typeof mostrarPaginaPedidos === "function") {
						mostrarPaginaPedidos(paginaActual);
					}
					if (typeof generarPaginacionPedidos === "function") {
						generarPaginacionPedidos();
					}
					if (typeof asignarEventosEliminar === "function") {
						asignarEventosEliminar();
					}
				})
				.catch(error => {
					console.error("Error al eliminar:", error);
					alert("No se pudo eliminar el pedido");
				});
		}
	});
});
