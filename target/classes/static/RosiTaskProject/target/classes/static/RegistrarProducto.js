/**
 * 
 */
// Obtener el formulario
const form = document.getElementById('formRegistrarProducto');

form.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevenir que se recargue la página

	// Recoger los valores del formulario
  const producto = {
    nombreProducto: document.getElementById('nombreProducto').value,
    marca: document.getElementById('marca').value,
    descripcion: document.getElementById('descripcion').value,
    estado: document.getElementById('estado').value,
    precioCompra: document.getElementById('precioCompra').value,
    precioVenta: document.getElementById('precioVenta').value,
    fechaIngreso: document.getElementById('fechaIngreso').value,
    cantidadProducto: document.getElementById('cantidadProducto').value,
    productoProveedor: document.getElementById('productoProveedor').value
  };

  // Usar Axios para enviar el producto al backend
  axios.post('http://localhost:8282/producto/saveProducto', producto)
    .then(response => {
      // Si la solicitud fue exitosa
      alert('Producto registrado correctamente');
      console.log('Producto registrado:', response.data);
      // Aquí puedes redirigir a otra página o limpiar el formulario, si lo prefieres
      form.reset();  // Limpiar el formulario
    })
    .catch(error => {
      // Manejo de errores
      console.error('Error al registrar el producto:', error);
      alert('Error al registrar el producto');
    });
});
