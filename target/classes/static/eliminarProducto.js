document.addEventListener("DOMContentLoaded", function () {
	
	let idSeleccionadoEliminar = null;
	
  // Función para cargar los productos desde la API
  function cargarProductos() {
    axios.get("http://localhost:8282/producto/getAll")
      .then(response => {
        const productos = response.data;
        const tabla = document.querySelector(".tabla-productos tbody");
        tabla.innerHTML = ""; // Limpiar tabla

        productos.forEach(producto => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${producto.idProducto}</td>
            <td>${producto.nombreProducto}</td>
            <td>${producto.marca}</td>
            <td>${producto.precioVenta}</td>
            <td>${producto.estado}</td>
            <td class="acciones">
              <button class="btn-editar" data-id="${producto.idProducto}">Editar</button>
              <button class="btn-detalles" data-id="${producto.idProducto}">Detalles</button>
              <button class="btn-eliminar" data-id="${producto.idProducto}">Eliminar</button>
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
						console.error("Error al cargar productos:", error);
					});
			}

			// Cuando se hace clic en "Eliminar" dentro del modal
			document.querySelector(".modal .eliminar").addEventListener("click", function() {
				if (idSeleccionadoEliminar) {
					axios.delete(`http://localhost:8282/producto/deleteProducto/${idSeleccionadoEliminar}`)
						.then(() => {
							 alert("Producto eliminado correctamente");
							cerrarModalEliminar();
							cargarProductos(); // recargar lista
						})
						.catch(error => {
							console.error("Error al eliminar:", error);
							alert("No se pudo eliminar el producto");
						});
				}
			});
			
					// Cargar empleados al iniciar
				cargarProductos();
			});
