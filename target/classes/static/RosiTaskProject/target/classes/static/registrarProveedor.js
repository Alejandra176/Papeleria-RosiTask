// registrarProveedor.js

document.addEventListener('DOMContentLoaded', () => {
  const btnRegistrar = document.querySelector('.register');
  const btnCancelar = document.querySelector('.cancel');

  // Establecer automáticamente la fecha actual en el campo 'fechaIngreso'
  const fechaIngresoInput = document.getElementById('fechaIngreso');
  const fechaActual = new Date().toISOString().split('T')[0].split('-').reverse().join('-');
  fechaIngresoInput.value = fechaActual;

  btnRegistrar.addEventListener('click', function (event) {
    event.preventDefault();

    // Crear objeto proveedor con los valores del formulario
    const proveedor = {
      nombreProveedor: document.getElementById('nombre').value,
      telefono: document.getElementById('telefono').value,
      correo: document.getElementById('correo').value,
      direccion: document.getElementById('direccion').value,
      ciudad: document.getElementById('ciudad').value,
      tipoDocumento: document.getElementById('tipoDocumento').value,
      numeroDocumento: document.getElementById('numeroDocumento').value,
      fechaRegistro: new Date(), // El backend espera un objeto tipo Date
      observacion: document.getElementById('observaciones').value
    };

    // Validación básica
    if (!proveedor.nombreProveedor || !proveedor.tipoDocumento || !proveedor.numeroDocumento) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    // Enviar solicitud al backend
    axios.post('http://localhost:8282/proveedor/saveProveedor', proveedor)
      .then(response => {
        alert('Proveedor registrado correctamente');
        console.log('Proveedor registrado:', response.data);
        document.querySelector('form')?.reset(); // Limpia si tienes un <form>
        fechaIngresoInput.value = fechaActual; // Restaura la fecha
      })
      .catch(error => {
        console.error('Error al registrar el proveedor:', error);
        alert('Ocurrió un error al registrar el proveedor.');
      });
  });

  // Botón cancelar
  btnCancelar.addEventListener('click', function () {
    if (confirm('¿Está seguro que desea cancelar el registro?')) {
      document.querySelector('form')?.reset();
      fechaIngresoInput.value = fechaActual;
    }
  });
});
