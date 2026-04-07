/**
 * 
 */

// Al cargar la página, obtendremos el ID del producto de la URL o de otra forma.
window.onload = function () {
    const productoId = getProductoIdFromURL(); // Aquí se obtiene el ID de la URL
    cargarProducto(productoId);
};

// Función para obtener el ID del producto desde la URL
function getProductoIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // Suponiendo que el ID se pasa como un parámetro en la URL
}

// Función para cargar los datos del producto
function cargarProducto(id) {
    axios.get(`http://localhost:8282/producto/findRecord/${id}`)
        .then(function (response) {
            const producto = response.data;
            
            // Rellenar el formulario con los datos del producto
            document.getElementById('idProducto').value = producto.idProducto;
            document.getElementById('idProductoTexto').textContent = producto.idProducto;
            document.getElementById('nombreProducto').value = producto.nombreProducto;
            document.getElementById('marca').value = producto.marca;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('estado').value = producto.estado;
            document.getElementById('precioCompra').value = producto.precioCompra;
            document.getElementById('precioVenta').value = producto.precioVenta;
            document.getElementById('fechaIngreso').value = producto.fechaIngreso.split('T')[0]; // Formato YYYY-MM-DD
            document.getElementById('cantidadProducto').value = producto.cantidadProducto;
            document.getElementById('proveedor').value = producto.productoProveedor; // O puedes cargar proveedores dinámicamente
        })
        .catch(function (error) {
            console.error('Error al cargar el producto:', error);
        });
}

// Evento para guardar los cambios del formulario
document.getElementById('formEditar').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const producto = {
        idProducto: document.getElementById('idProducto').value,
        nombreProducto: document.getElementById('nombreProducto').value,
        marca: document.getElementById('marca').value,
        descripcion: document.getElementById('descripcion').value,
        estado: document.getElementById('estado').value,
        precioCompra: parseFloat(document.getElementById('precioCompra').value),
        precioVenta: parseFloat(document.getElementById('precioVenta').value),
        fechaIngreso: document.getElementById('fechaIngreso').value,
        cantidadProducto: parseInt(document.getElementById('cantidadProducto').value),
        productoProveedor: document.getElementById('proveedor').value
    };

    // Enviar los datos actualizados al servidor usando Axios
    axios.post('http://localhost:8282/producto/saveProducto', producto)
        .then(function (response) {
            alert('Producto actualizado correctamente');
            window.location.href = 'moduloProducto.html'; // Redirigir a otra página
        })
        .catch(function (error) {
            console.error('Error al guardar el producto:', error);
            alert('Hubo un error al actualizar el producto');
        });
});
