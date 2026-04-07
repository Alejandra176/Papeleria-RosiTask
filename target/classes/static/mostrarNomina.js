//---------------------PAGINACION-----------------------------------//	
let empleados = [];
let paginaActual = 1;
const empleadosPorPagina = 10;
//-------------------------------------------------------------------//	

function cargarEmpleados() {
  axios.get("http://localhost:8282/nomina/getAll")
    .then(response => {
      empleados = response.data;
      mostrarPagina(1);
      generarPaginacion();
    })
    .catch(error => {
      console.error("Error al cargar empleados:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar empleados',
        text: 'No se pudo cargar la lista de empleados.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Cerrar'
      });
    });
}

document.addEventListener('DOMContentLoaded', function () {
  cargarEmpleados();

  document.getElementById('buscar-id').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const idBuscado = e.target.value.trim();

      if (idBuscado === '') {
        cargarEmpleados();
        return;
      }

      axios.get(`http://localhost:8282/nomina/findRecord/${idBuscado}`)
        .then(response => {
          empleados = [response.data];
          mostrarPagina(1);
          generarPaginacion();
        })
        .catch(error => {
          console.error('Error al buscar empleado por ID:', error);
          Swal.fire({
            icon: 'warning',
            title: 'Empleado no encontrado',
            text: 'No se encontró el empleado con ese ID.',
            confirmButtonColor: '#7d65a9',
            confirmButtonText: 'Ok'
          });
        });
    }
  });

  document.getElementById('tbody-empleados').addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('btn-editar')) {
      const id = e.target.dataset.id;
      console.log('Redirigiendo a editar empleado con ID:', id);
      window.location.href = `editarEmpleado.html?id=${id}`;
    } else if (e.target && e.target.classList.contains('btn-detalles')) {
      const id = e.target.dataset.id;
      console.log('Redirigiendo a detalles del empleado con ID:', id);
      window.location.href = `detallesEmpleado.html?id=${id}`;
    }
  });
});

function mostrarPagina(pagina) {
  const tbody = document.getElementById('tbody-empleados');
  tbody.innerHTML = '';

  paginaActual = pagina;
  const inicio = (pagina - 1) * empleadosPorPagina;
  const fin = inicio + empleadosPorPagina;
  const empleadosPagina = empleados.slice(inicio, fin);

  empleadosPagina.forEach(empleado => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${empleado.idEmpleado}</td>
      <td>${empleado.nombreEmpleado}</td>
      <td>${empleado.apellidoEmpleado}</td>
      <td>${empleado.tipoDocumento}</td>
      <td>${empleado.numeroDocumento}</td>
      <td>${empleado.estado}</td>
      <td class="acciones">
        <button class="btn-editar" data-id="${empleado.idEmpleado}">Editar</button>
        <button class="btn-detalles" data-id="${empleado.idEmpleado}">Detalles</button>
        <button class="btn-eliminar" data-id="${empleado.idEmpleado}">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function generarPaginacion() {
  const paginacionDiv = document.querySelector('.pagination');
  paginacionDiv.innerHTML = '';

  const totalPaginas = Math.ceil(empleados.length / empleadosPorPagina);

  const btnAnterior = document.createElement('button');
  btnAnterior.classList.add('arrow');
  btnAnterior.innerHTML = '&lt;';
  btnAnterior.onclick = () => cambiarPagina('prev');
  paginacionDiv.appendChild(btnAnterior);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.classList.add('page');
    if (i === paginaActual) btn.classList.add('active');
    btn.textContent = i;
    btn.onclick = () => irAPagina(i);
    paginacionDiv.appendChild(btn);
  }

  const btnSiguiente = document.createElement('button');
  btnSiguiente.classList.add('arrow');
  btnSiguiente.innerHTML = '&gt;';
  btnSiguiente.onclick = () => cambiarPagina('next');
  paginacionDiv.appendChild(btnSiguiente);
}

function irAPagina(numero) {
  paginaActual = numero;
  mostrarPagina(paginaActual);
  generarPaginacion();
}

function cambiarPagina(direccion) {
  const totalPaginas = Math.ceil(empleados.length / empleadosPorPagina);
  if (direccion === 'prev' && paginaActual > 1) {
    paginaActual--;
  } else if (direccion === 'next' && paginaActual < totalPaginas) {
    paginaActual++;
  }
  mostrarPagina(paginaActual);
  generarPaginacion();
}

