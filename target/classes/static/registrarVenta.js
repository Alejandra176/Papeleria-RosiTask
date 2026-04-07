function cargarEmpleados() {
  axios.get('http://localhost:8282/nomina/getAll')
    .then(response => {
      const empleados = response.data;
      const select = document.getElementById('nombreEmpleado');

      empleados.forEach(nomina => {
        const option = document.createElement('option');
        option.value = nomina.nombreEmpleado; // o empleado.idEmpleado si manejas un ID
        option.textContent = nomina.nombreEmpleado;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar empleados:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los empleados.',
        confirmButtonColor: '#dc3545'
      });
    });
}
// Cargar productos desde el backend al cargar la página
function cargarProductos() {
  axios.get('http://localhost:8282/producto/getAll')
    .then(response => {
      const productos = response.data;
      const select = document.getElementById('producto');

      productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.idProducto;
        option.textContent = producto.nombreProducto;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los productos.',
        confirmButtonColor: '#dc3545'
      });
    });
}

function cargarPromociones() {
  axios.get('http://localhost:8282/promocion/getAll')
    .then(response => {
      const promociones = response.data;
      const select = document.getElementById('promocion');

      // Agregar la opción "ninguna" manualmente
      const opcionNinguna = document.createElement('option');
      opcionNinguna.value = 'ninguna';
      opcionNinguna.textContent = 'Ninguna';
      select.appendChild(opcionNinguna);

      // Agregar promociones desde la base de datos
      promociones.forEach(promocion => {
        const option = document.createElement('option');
        option.value = promocion.nombrePromo; // Asume que tienes este campo
        option.textContent = promocion.nombrePromo;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar promociones:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar las promociones.',
        confirmButtonColor: '#dc3545'
      });
    });
}

// Escuchar cambio en la selección de producto para obtener el precio
document.getElementById('producto').addEventListener('change', function () {
  const idProducto = this.value;

  if (!idProducto) return; // Si no hay producto seleccionado

  axios.get(`http://localhost:8282/producto/findRecord/${idProducto}`)
    .then(response => {
      const producto = response.data;

      // Mostrar el precio en el input correspondiente
      document.getElementById('precioUnitario').value = producto.precioVenta;

      // Actualizar el total de la venta automáticamente
      actualizarTotalVenta();
    })
    .catch(error => {
      console.error('Error al obtener el precio del producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener el precio del producto.',
        confirmButtonColor: '#dc3545'
      });
    });
});

// Ejecutar carga de productos al inicio
window.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  cargarPromociones();
  cargarEmpleados();
  obtenerSiguienteIdVenta();
  
  const inputFecha = document.getElementById('fechaVenta');
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    inputFecha.value = `${yyyy}-${mm}-${dd}`;

  // Escuchar cambios en cantidad o precio unitario
  document.getElementById('cantidad').addEventListener('input', actualizarTotalVenta);
  document.getElementById('precioUnitario').addEventListener('input', actualizarTotalVenta);
});

// Función para calcular y mostrar el total de venta
function actualizarTotalVenta() {
  const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
  const precioUnitario = parseFloat(document.getElementById('precioUnitario').value) || 0;
  const total = cantidad * precioUnitario;

  document.getElementById('totalVenta').value = `$${total.toFixed(2)}`;
}

function obtenerSiguienteIdVenta() {
  axios.get('http://localhost:8282/venta/nextId')
    .then(response => {
      const nextId = response.data;
      document.getElementById('idVenta').textContent = nextId;
    })
    .catch(error => {
      console.error('Error al obtener el siguiente ID de venta:', error);
      document.getElementById('idVenta').textContent = 'Error';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener el ID de la venta.',
        confirmButtonColor: '#dc3545'
      });
    });
}

// Escuchar envío del formulario
const form = document.getElementById('formRegistrarVenta');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevenir recarga

  const productoId = document.getElementById('producto').value;
  const cantidadDeseada = parseInt(document.getElementById('cantidad').value);

  // Obtener el stock del producto
  axios.get(`http://localhost:8282/producto/findRecord/${productoId}`)
    .then(response => {
      const producto = response.data;
      const stockDisponible = producto.cantidadProducto;

      if (cantidadDeseada > stockDisponible) {
        Swal.fire({
          icon: 'error',
          title: 'Stock insuficiente',
          text: `Solo hay ${stockDisponible} unidades disponibles de "${producto.nombreProducto}".`,
          confirmButtonColor: '#dc3545'
        });
        return; // Detener ejecución si no hay suficiente stock
      }

      // Si hay suficiente stock, continuar con el registro de la venta
      const fechaVenta = document.getElementById('fechaVenta').value;
      const nombreEmpleado = document.getElementById('nombreEmpleado').value;
      const precioUnitario = parseFloat(document.getElementById('precioUnitario').value);
      const descuento = parseFloat(document.getElementById('descuento').value);
      const formaPago = document.getElementById('formaPago').value;
      const promocion = document.getElementById('promocion').value;
      const totalVenta = cantidadDeseada * precioUnitario;

      const venta = {
        producto: productoId,
        fechaVenta: fechaVenta,
        nombreEmpleado: nombreEmpleado,
        cantidad: cantidadDeseada,
        precioUnitario: precioUnitario,
        descuento: descuento,
        totalVenta: totalVenta,
        formaPago: formaPago,
        promocion: promocion
      };

      axios.post('http://localhost:8282/venta/saveVenta', venta)
        .then(response => {
          console.log('Venta registrada:', response.data);

          axios.put(`http://localhost:8282/producto/updateStock/${productoId}/${cantidadDeseada}`)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Venta registrada',
                text: 'La venta se registró y el stock se actualizó correctamente.',
                confirmButtonColor: '#28a745'
              }).then(() => {
                window.location.href = 'mostrarVentas.html';
              });
            })
            .catch(error => {
              console.error('Error al actualizar el stock:', error);
              Swal.fire({
                icon: 'warning',
                title: 'Stock no actualizado',
                text: 'La venta se registró, pero hubo un error al actualizar el stock.',
                confirmButtonColor: '#ffc107'
              });
            });
        })
        .catch(error => {
          console.error('Error al registrar la venta:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al registrar la venta.',
            confirmButtonColor: '#dc3545'
          });
        });

    })
    .catch(error => {
      console.error('Error al obtener el stock del producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo validar el stock del producto.',
        confirmButtonColor: '#dc3545'
      });
    });
});
