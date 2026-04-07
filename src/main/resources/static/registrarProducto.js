const form = document.getElementById('formRegistrarProducto');

form.addEventListener('submit', function(event) {
  event.preventDefault();  // Evitar recarga

  // Obtener valores
  const nombreProducto = document.getElementById('nombreProducto').value.trim();
  const marca = document.getElementById('marca').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const estado = document.getElementById('estado').value;
  const precioCompra = document.getElementById('precioCompra').value.trim();
  const precioVenta = document.getElementById('precioVenta').value.trim();
  const fechaIngreso = document.getElementById('fechaIngreso').value;
  const cantidadProducto = document.getElementById('cantidadProducto').value.trim();
  const productoProveedor = document.getElementById('productoProveedor').value;

  // Validaciones
  let errores = [];

  if (nombreProducto === '') errores.push("El nombre del producto es obligatorio.");
  if (marca === '') errores.push("La marca es obligatoria.");
  if (descripcion.length > 500) errores.push("La descripción no debe superar los 500 caracteres.");
  if (estado !== 'Disponible' && estado !== 'No disponible') errores.push("El estado debe ser 'Disponible' o 'No disponible'.");

  if (!esNumeroValido(precioCompra) || parseFloat(precioCompra) <= 0) errores.push("El precio de compra debe ser mayor que 0.");
  if (!esNumeroValido(precioVenta) || parseFloat(precioVenta) <= 0) errores.push("El precio de venta debe ser mayor que 0.");
  if (esNumeroValido(precioCompra) && esNumeroValido(precioVenta) && parseFloat(precioVenta) < parseFloat(precioCompra)) {
    errores.push("El precio de venta no puede ser menor que el precio de compra.");
  }

  if (!fechaIngreso) {
    errores.push("La fecha de ingreso es obligatoria.");
  } else {
    const fechaActual = new Date().toISOString().split('T')[0];
    if (fechaIngreso > fechaActual) errores.push("La fecha no puede ser futura.");
  }

  if (!esNumeroEnteroPositivo(cantidadProducto)) errores.push("La cantidad debe ser un número entero positivo.");

  if (!productoProveedor || productoProveedor === "Proveedor") errores.push("Debe seleccionar un proveedor.");

  // Si hay errores, mostrar SweetAlert2 y detener envío
  if (errores.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Errores encontrados',
      html: errores.map(e => `<p style="text-align:left;">• ${e}</p>`).join(''),
      confirmButtonText: 'Corregir'
    });
    return;
  }

  // Verificar si el nombre ya existe en la base de datos
  axios.get(`http://localhost:8282/producto/existeNombre/${encodeURIComponent(nombreProducto)}`)
    .then(response => {
      if (response.data === true) {
        Swal.fire({
          icon: 'warning',
          title: 'Producto duplicado',
          text: 'Ya existe un producto con ese nombre.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      // Crear objeto y enviar si no existe
      const producto = {
        nombreProducto,
        marca,
        descripcion,
        estado,
        precioCompra: parseFloat(precioCompra),
        precioVenta: parseFloat(precioVenta),
        fechaIngreso,
        cantidadProducto: parseInt(cantidadProducto),
        productoProveedor
      };

      axios.post('http://localhost:8282/producto/saveProducto', producto)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Producto registrado',
            text: 'Producto registrado correctamente',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.href = "mostrarProductos.html";
            form.reset();
          });
        })
        .catch(error => {
          console.error('Error al registrar el producto:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el producto',
            confirmButtonText: 'Aceptar'
          });
        });

    })
    .catch(error => {
      console.error("Error al verificar nombre:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al verificar el nombre del producto.',
        confirmButtonText: 'Aceptar'
      });
    });
});

// FUNCION PARA CARGAR LA LISTA DE PROVEEDORES EN LA PARTE DE PROVEEDOR
function cargarProveedores() {
  axios.get('http://localhost:8282/proveedor/getAll')
    .then(response => {
      const proveedores = response.data;
      const select = document.getElementById('productoProveedor'); // ID correcto del <select>

      // Limpiar opciones anteriores si las hay
      select.innerHTML = '<option selected disabled>Seleccione un proveedor</option>';

      proveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.value = proveedor.idProveedor;
        option.textContent = proveedor.nombreProveedor;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar proveedores:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los proveedores',
        confirmButtonText: 'Aceptar'
      });
    });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProveedores();
});

function esNumeroValido(valor) {
  return !isNaN(valor) && valor !== '';
}

function esNumeroEnteroPositivo(valor) {
  const num = parseInt(valor);
  return Number.isInteger(num) && num >= 0;
}
