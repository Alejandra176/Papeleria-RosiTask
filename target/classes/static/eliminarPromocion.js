document.addEventListener("DOMContentLoaded", function () {
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
      axios.delete(`http://localhost:8282/promocion/deletePromocion/${idSeleccionadoEliminar}`)
        .then(() => {
          cerrarModalEliminar();

          //  Mensaje visual con SweetAlert
          Swal.fire({
            icon: 'success',
            title: '¡Promoción eliminada!',
            text: 'La promoción se eliminó correctamente.',
            confirmButtonColor: '#7d65a9',
            confirmButtonText: 'Aceptar'
          });

          //  Actualizar lista local
          if (typeof promociones !== "undefined") {
            promociones = promociones.filter(p => p.idPromocion !== parseInt(idSeleccionadoEliminar));
          }

          if (typeof mostrarPaginaPromociones === "function") {
            mostrarPaginaPromociones(paginaActual);
          }
          if (typeof generarPaginacionPromociones === "function") {
            generarPaginacionPromociones();
          }
          if (typeof asignarEventosEliminar === "function") {
            asignarEventosEliminar();
          }
        })
        .catch(error => {
          console.error("Error al eliminar:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar',
            text: 'No se pudo eliminar la promoción.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Cerrar'
          });
        });
    }
  });
});
