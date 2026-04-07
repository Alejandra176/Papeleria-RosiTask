// Este script obtiene el ID del producto desde la URL y lo usa para buscar los detalles
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("ID de producto no especificado");
    return;
  }

  axios.get(`http://localhost:8282/producto/findRecord/${id}`)
    .then(function (response) {
      const producto = response.data;

      // Inserta los datos en los elementos correspondientes de la página
      document.getElementById("idProducto").textContent = producto.idProducto;
      document.getElementById("nombreProducto").textContent = producto.nombreProducto;
      document.getElementById("marca").textContent = producto.marca;
      document.getElementById("descripcion").textContent = producto.descripcion;
      document.getElementById("estado").textContent = producto.estado;
      document.getElementById("precioCompra").textContent = "$" + producto.precioCompra.toFixed(2);
      document.getElementById("precioVenta").textContent = "$" + producto.precioVenta.toFixed(2);
      document.getElementById("fechaIngreso").textContent = producto.fechaIngreso;
      document.getElementById("cantidadProducto").textContent = producto.cantidadProducto + " unidades";
      document.getElementById("productoProveedor").textContent = producto.productoProveedor;
    })
    .catch(function (error) {
      console.error("Error al obtener el producto:", error);
      alert("Error al cargar los detalles del producto.");
    });
});
