const form = document.getElementById('formRegistrarPromocion');

form.addEventListener('submit', function(event) {
  event.preventDefault();  // Prevenir que se recargue la página

  const nombrePromo = document.getElementById('nombrePromo').value;
  const descripcionPromo = document.getElementById('descripcionPromo').value;
  const tipoPromo = document.getElementById('tipoPromo').value;
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;
  const estadoPromo = document.getElementById('estadoPromo').value;
  const idProductoFull = document.getElementById('idProductoFull').value;
  const idProductoBeneficio = document.getElementById('idProductoBeneficio').value;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);  // Solo la fecha

  // ✅ Forzar fechas desde input en zona horaria local (no UTC)
   function crearFechaLocal(fechaStr) {
     const [año, mes, dia] = fechaStr.split('-').map(Number);
     return new Date(año, mes - 1, dia);
   }

   const fechaInicioDate = crearFechaLocal(fechaInicio);
   const fechaFinDate = crearFechaLocal(fechaFin);

  if (fechaInicioDate.getTime() < hoy.getTime()) {
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
      title: 'Fecha inválida',
      text: 'La fecha fin no puede ser menor que la fecha de inicio.'
    });
    return;
  }

  const promocion = {
    nombrePromo,
    descripcionPromo,
    tipoPromo,
    fechaInicio,
    fechaFin,
    estadoPromo,
    idProductoFull,
    idProductoBeneficio
  };

  axios.post('http://localhost:8282/promocion/savePromocion', promocion)
    .then(response => {
		Swal.fire({
			icon: 'success',
			title: '¡Registro exitoso!',
			text: 'La promocion fue registrada correctamente.',
			confirmButtonColor: '#7d65a9',
			confirmButtonText: 'Aceptar'
		}).then(() => {
			// 🔁 Redireccionar al listado
			window.location.href = 'mostrarPromociones.html';
		});

    })
    .catch(error => {
      console.error('Error al registrar la promoción:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar la promoción.'
      });
    });
});
