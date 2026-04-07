document.addEventListener("DOMContentLoaded", function() {
	let idSeleccionadoEliminar = null;

	// Exportar esta función para que mostrarPromociones.js pueda usarla
	  function asignarEventosEliminar() {
	    document.querySelectorAll(".btn-eliminar").forEach(boton => {
	      boton.addEventListener("click", function () {
	        idSeleccionadoEliminar = this.getAttribute("data-id");
	        abrirModalEliminar(idSeleccionadoEliminar);
	      });
	    });
	  }
	
	  // Hacer accesible desde mostrarPromociones.js
	    window.asignarEventosEliminar = asignarEventosEliminar;

	    // Evento de eliminación confirmado desde el modal
	    document.querySelector(".modal .eliminar").addEventListener("click", function () {
	      if (idSeleccionadoEliminar) {
	        axios.delete(`http://localhost:8282/descuento/deleteDescuento/${idSeleccionadoEliminar}`)
	          .then(() => {
	            cerrarModalEliminar();

				//  Eliminar del array de pedidos global
				          if (typeof descuentos !== "undefined") {
				            descuentos = descuentos.filter(p => p.idDescuento !== parseInt(idSeleccionadoEliminar));
				          }

				          //  Volver a dibujar la tabla sin recargar del servidor
				          if (typeof mostrarPaginaDescuentos === "function") {
				            mostrarPaginaDescuentos(paginaActual);
				          }
				          if (typeof generarPaginacionDescuentos === "function") {
				            generarPaginacionDescuentos();
				          }
				          if (typeof asignarEventosEliminar === "function") {
				            asignarEventosEliminar();
				          }
				        })
				        .catch(error => {
				          console.error("Error al eliminar:", error);
				          alert("No se pudo eliminar el descuento");
				        });
				    }
				  });
				});
