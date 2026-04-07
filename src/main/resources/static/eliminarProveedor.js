document.addEventListener("DOMContentLoaded", function () {
  let idSeleccionadoEliminar = null;

  function abrirModalEliminar(id) {
    const modal = document.getElementById('modalEliminar');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    document.getElementById('idProveedorEliminar').textContent = id;
  }

  function cerrarModalEliminar() {
    const modal = document.getElementById('modalEliminar');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }

  function cargarProveedores() {
    axios.get("http://localhost:8282/proveedor/getAll")
      .then(response => {
        const proveedores = response.data;
        const tabla = document.querySelector(".tabla-proveedores tbody");
        tabla.innerHTML = "";

        proveedores.forEach(proveedor => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${proveedor.idProveedor}</td>
            <td>${proveedor.nombreProveedor}</td>
            <td>${proveedor.telefono}</td>
            <td>${proveedor.direccion}</td>
            <td>${proveedor.fechaRegistro ? proveedor.fechaRegistro.split('T')[0] : ''}</td>
            <td class="acciones">
              <button class="btn-editar" data-id="${proveedor.idProveedor}">Editar</button>
              <button class="btn-detalles" data-id="${proveedor.idProveedor}">Detalles</button>
              <button class="btn-eliminar" data-id="${proveedor.idProveedor}">Eliminar</button>
            </td>
          `;
          tabla.appendChild(fila);
        });

        document.querySelectorAll(".btn-eliminar").forEach(boton => {
          boton.addEventListener("click", function () {
            idSeleccionadoEliminar = this.getAttribute("data-id");
            abrirModalEliminar(idSeleccionadoEliminar);
          });
        });
      })
      .catch(error => {
        console.error("Error al cargar proveedores:", error);
      });
  }

  // Botón "Eliminar" dentro del modal
  document.querySelector("#modalEliminar .eliminar").addEventListener("click", function () {
    if (idSeleccionadoEliminar) {
      axios.delete(`http://localhost:8282/proveedor/deleteProveedor/${idSeleccionadoEliminar}`)
        .then(() => {
          alert("Proveedor eliminado correctamente");
          cerrarModalEliminar();
          cargarProveedores();
        })
        .catch(error => {
          console.error("Error al eliminar:", error);
          alert("No se pudo eliminar el proveedor");
        });
    }
  });

  window.cerrarModalEliminar = cerrarModalEliminar; // <- para que el HTML inline lo reconozca
  cargarProveedores();
});
