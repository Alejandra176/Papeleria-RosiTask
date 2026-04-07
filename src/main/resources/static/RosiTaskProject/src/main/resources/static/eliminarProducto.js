/**
 * 
 */

document.addEventListener("DOMContentLoaded", function () {
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

        // Agregar eventos a los botones de eliminar
        const botonesEliminar = document.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach(boton => {
          boton.addEventListener("click", function () {
            const id = this.getAttribute("data-id");

            if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
              axios.delete(`http://localhost:8282/producto/deleteProducto/${id}`)
                .then(() => {
                  alert("Producto eliminado correctamente");
                  cargarProductos(); // Recargar la tabla
                })
                .catch(error => {
                  console.error("Error al eliminar:", error);
                  alert("No se pudo eliminar el producto");
                });
            }
          });
        });
      })
      .catch(error => {
        console.error("Error al cargar productos:", error);
      });
  }

  // Cargar productos al iniciar
  cargarProductos();
});
