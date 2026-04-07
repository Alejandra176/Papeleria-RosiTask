document.addEventListener("DOMContentLoaded", function () {
  let idSeleccionadoEliminar = null;

  function cargarVentas() {
    axios.get("http://localhost:8282/venta/getAll")
      .then(response => {
        const ventas = response.data;
        const tabla = document.querySelector(".tabla-ventas tbody");
        tabla.innerHTML = "";

        ventas.forEach(venta => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${venta.idVenta}</td>
            <td>${venta.fechaVenta}</td>
            <td>${venta.totalVenta}</td>
            <td>${venta.formaPago}</td>
            <td class="acciones">
              <button class="btn-editar" data-id="${venta.idVenta}">Editar</button>
              <button class="btn-detalles" data-id="${venta.idVenta}">Detalles</button>
              <button class="btn-eliminar" data-id="${venta.idVenta}">Eliminar</button>
            </td>
          `;
          tabla.appendChild(fila);
        });

        // Asignar evento a cada botón de eliminar
        document.querySelectorAll(".btn-eliminar").forEach(boton => {
          boton.addEventListener("click", function () {
            idSeleccionadoEliminar = this.getAttribute("data-id");
            abrirModalEliminar(idSeleccionadoEliminar); // Aquí usamos tu modal
          });
        });
      })
      .catch(error => {
        console.error("Error al cargar ventas:", error);
      });
  }

  // Cuando se hace clic en "Eliminar" dentro del modal
  document.querySelector(".modal .eliminar").addEventListener("click", function () {
    if (idSeleccionadoEliminar) {
      axios.delete(`http://localhost:8282/Venta/deleteVenta/${idSeleccionadoEliminar}`)
        .then(() => {
          alert("Venta eliminada correctamente");
          cerrarModalEliminar();
          cargarVentas(); // recargar lista
        })
        .catch(error => {
          console.error("Error al eliminar:", error);
          alert("No se pudo eliminar la venta");
        });
    }
  });

  // Iniciar carga de pedidos
  cargarVentas();
});
