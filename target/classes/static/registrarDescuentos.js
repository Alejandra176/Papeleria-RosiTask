// ✅ Cargar productos en el select al inicio
function cargarProductos() {
  axios.get('http://localhost:8282/producto/getAll')
    .then(response => {
      const productos = response.data;
      const select = document.getElementById('idProducto');

      // Limpiar opciones previas
      select.innerHTML = '<option disabled selected>Seleccione un producto</option>';

      productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.idProducto;
        option.textContent = producto.idProducto;
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

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', cargarProductos);

const form = document.getElementById('formRegistrarDescuento');

form.addEventListener('submit', async function(event) {
  event.preventDefault();  // Prevenir recarga

  const nombreDescu = document.getElementById('nombreDescu').value;
  const descripcionDescu = document.getElementById('descripcionDescu').value;
  const tipoDescu = document.getElementById('tipoDescu').value;
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;
  const estadoDescu = document.getElementById('estadoDescu').value;
  const idProducto = document.getElementById('idProducto').value;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  function crearFechaLocal(fechaStr) {
    const [año, mes, dia] = fechaStr.split('-').map(Number);
    return new Date(año, mes - 1, dia);
  }

  const fechaInicioDate = crearFechaLocal(fechaInicio);
  const fechaFinDate = crearFechaLocal(fechaFin);

  if (fechaInicioDate < hoy) {
    Swal.fire({
      icon: 'warning',
      title: 'Fecha inválida',
      text: 'La fecha de inicio no puede ser anterior a hoy.'
    });
    return;
  }

  if (fechaFinDate < fechaInicioDate) {
    Swal.fire({
      icon: 'warning',
      title: 'Rango de fechas incorrecto',
      text: 'La fecha fin no puede ser menor que la fecha de inicio.'
    });
    return;
  }

  // Validar nombre duplicado
  try {
    const existe = await axios.get(`http://localhost:8282/descuento/existeNombre/${encodeURIComponent(nombreDescu)}`);

    if (existe.data === true) {
      Swal.fire({
        icon: 'error',
        title: 'Nombre duplicado',
        text: `Ya existe un descuento con el nombre "${nombreDescu}". Usa uno diferente.`
      });
      return;
    }
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      Swal.fire({
        icon: 'error',
        title: 'Error al validar nombre',
        text: 'No se pudo verificar si el nombre ya existe. Intenta más tarde.'
      });
      return;
    }
  }

  const descuento = {
    nombreDescu,
    descripcionDescu,
    tipoDescu,
    fechaInicio,
    fechaFin,
    estadoDescu,
    idProducto
  };

  axios.post('http://localhost:8282/descuento/saveDescuento', descuento)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'El descuento se registró correctamente',
        confirmButtonColor: '#7d65a9',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        window.location.href = 'mostrarDescuentos.html';
      });
      form.reset();
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'No se pudo guardar el descuento. Intenta más tarde.'
      });
      console.error('Error al registrar el descuento:', error);
    });
});
