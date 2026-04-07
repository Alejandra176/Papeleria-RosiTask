// Al cargar la página
window.onload = function () {
  const ventaId = getVentaIdFromURL();
  cargarProductos(ventaId); // Llenar productos y luego cargar la venta
};

// Obtener el ID de la venta desde la URL
function getVentaIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Cargar productos desde el backend
function cargarProductos(ventaId) {
  axios.get("http://localhost:8282/producto/getAll")
    .then(response => {
      const productos = response.data;
      const selectProducto = document.getElementById("producto");
      selectProducto.innerHTML = "";

      productos.forEach(producto => {
        const option = document.createElement("option");
        option.value = producto.idProducto;
        option.textContent = producto.nombreProducto;
        selectProducto.appendChild(option);
      });

      // Después de cargar productos, cargar la venta para seleccionar el producto correcto
      cargarVenta(ventaId);
    })
    .catch(error => {
      console.error("Error al cargar los productos:", error);
      alert("Error al cargar los productos disponibles");
    });
}

// Cargar datos de la venta
function cargarVenta(id) {
  axios.get(`http://localhost:8282/venta/findRecord/${id}`)
    .then(response => {
      const venta = response.data;

      document.getElementById('idVenta').value = venta.idVenta;
      document.getElementById('idVentaTexto').textContent = venta.idVenta;
      document.getElementById('producto').value = venta.producto;
      document.getElementById('fechaVenta').value = venta.fechaVenta.split('T')[0];
      document.getElementById('nombreEmpleado').value = venta.nombreEmpleado;
      document.getElementById('cantidad').value = venta.cantidad;
      document.getElementById('precioUnitario').value = venta.precioUnitario;
      document.getElementById('descuento').value = venta.descuento;
      document.getElementById('totalVenta').value = `$${venta.totalVenta.toFixed(2)}`;
      document.getElementById('formaPago').value = venta.formaPago;
      document.getElementById('promocion').value = venta.promocion;

      actualizarTotalVenta();
    })
    .catch(error => {
      console.error('Error al cargar la venta:', error);
      alert('Error al cargar los datos de la venta');
    });
}

// Evento para cambiar el precio al seleccionar producto
document.getElementById('producto').addEventListener('change', function () {
  const idProducto = this.value;
  if (!idProducto) return;

  axios.get(`http://localhost:8282/producto/findRecord/${idProducto}`)
    .then(response => {
      const producto = response.data;
      document.getElementById('precioUnitario').value = producto.precioVenta;
      actualizarTotalVenta();
    })
    .catch(error => {
      console.error('Error al obtener el precio del producto:', error);
      alert('No se pudo obtener el precio del producto');
    });
});

// Escuchar cambios para actualizar el total
document.getElementById('cantidad').addEventListener('input', actualizarTotalVenta);
document.getElementById('precioUnitario').addEventListener('input', actualizarTotalVenta);

// Calcular el total de la venta
function actualizarTotalVenta() {
  const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
  const precioUnitario = parseFloat(document.getElementById('precioUnitario').value) || 0;
  const total = cantidad * precioUnitario;
  document.getElementById('totalVenta').value = `$${total.toFixed(2)}`;
}

// Guardar los cambios de la venta
document.getElementById('formEditarVenta').addEventListener('submit', function (event) {
  event.preventDefault();

  const venta = {
    idVenta: document.getElementById('idVenta').value,
    producto: document.getElementById('producto').value,
    fechaVenta: document.getElementById('fechaVenta').value + 'T00:00:00',
    nombreEmpleado: document.getElementById('nombreEmpleado').value,
    cantidad: parseInt(document.getElementById('cantidad').value),
    precioUnitario: parseFloat(document.getElementById('precioUnitario').value),
    descuento: parseFloat(document.getElementById('descuento').value),
    totalVenta: parseFloat(document.getElementById('cantidad').value) * parseFloat(document.getElementById('precioUnitario').value),
    formaPago: document.getElementById('formaPago').value,
    promocion: document.getElementById('promocion').value
  };

  axios.post("http://localhost:8282/venta/saveVenta", venta)
    .then(response => {
      Swal.fire({
        icon: 'success',
        title: 'Venta actualizada con éxito',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        window.location.href = "mostrarVentas.html";
      });
    })
    .catch(error => {
      console.error("Error al guardar la venta:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar la venta'
      });
    });
});
