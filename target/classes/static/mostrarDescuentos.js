let todosLosDescuentos = []; // Se mantiene una copia original
let descuentos = [];
let paginaActual = 1;
const descuentosPorPagina = 10;

document.addEventListener('DOMContentLoaded', function () {
  // Obtener y cargar todos los descuentos
  axios.get("http://localhost:8282/descuento/getAll")
    .then(response => {
      todosLosDescuentos = response.data; // Guarda la copia completa
      descuentos = [...todosLosDescuentos]; // Inicialmente usamos todos
      mostrarPaginaDescuentos(1);
      generarPaginacionDescuentos();
    })
    .catch(error => {
      console.error("Error al cargar los descuentos:", error);
      alert("No se pudo cargar la lista de descuentos");
    });

  // Eventos para botones dentro de la tabla
  document.getElementById('tbody-descuentos').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-editar')) {
      const id = e.target.dataset.id;
      window.location.href = `editarDescuento.html?id=${id}`;
    } else if (e.target.classList.contains('btn-detalles')) {
      const id = e.target.dataset.id;
      window.location.href = `detallesDescuento.html?id=${id}`;
    }
  });

  // Buscar por ID cuando se presione Enter
  document.getElementById('buscar-id').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const idBuscado = e.target.value.trim();

      if (idBuscado === '') {
        // Si está vacío, se restauran todos los descuentos
        descuentos = [...todosLosDescuentos];
        mostrarPaginaDescuentos(1);
        generarPaginacionDescuentos();
        return;
      }

      axios.get(`http://localhost:8282/descuento/findRecord/${idBuscado}`)
        .then(response => {
          descuentos = [response.data]; // Solo el descuento buscado
          mostrarPaginaDescuentos(1);
          generarPaginacionDescuentos();
        })
        .catch(error => {
          console.error('Error al buscar descuento por ID:', error);
          alert('No se encontró un descuento con ese ID');
        });
    }
  });
});

// Mostrar descuentos de la página actual
function mostrarPaginaDescuentos(pagina) {
  const tbody = document.getElementById('tbody-descuentos');
  tbody.innerHTML = '';
  paginaActual = pagina;

  const inicio = (pagina - 1) * descuentosPorPagina;
  const fin = inicio + descuentosPorPagina;
  const descuentosPagina = descuentos.slice(inicio, fin);

  descuentosPagina.forEach(descuento => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${descuento.idDescuento}</td>
      <td>${descuento.nombreDescu}</td>
      <td>${descuento.tipoDescu}</td>
      <td>${descuento.estadoDescu}</td>
      <td class="acciones">
        <button class="btn-editar" data-id="${descuento.idDescuento}">Editar</button>
        <button class="btn-detalles" data-id="${descuento.idDescuento}">Detalles</button>
        <button class="btn-eliminar" data-id="${descuento.idDescuento}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (typeof asignarEventosEliminar === "function") {
    asignarEventosEliminar();
  }
}

// Paginación dinámica
function generarPaginacionDescuentos() {
  const paginacionDiv = document.querySelector('.pagination');
  paginacionDiv.innerHTML = '';

  const totalPaginas = Math.ceil(descuentos.length / descuentosPorPagina);

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

function cambiarPagina(direccion) {
  const totalPaginas = Math.ceil(descuentos.length / descuentosPorPagina);
  if (direccion === 'prev' && paginaActual > 1) {
    mostrarPaginaDescuentos(paginaActual - 1);
    generarPaginacionDescuentos();
  } else if (direccion === 'next' && paginaActual < totalPaginas) {
    mostrarPaginaDescuentos(paginaActual + 1);
    generarPaginacionDescuentos();
  }
}

function irAPagina(numero) {
  mostrarPaginaDescuentos(numero);
  generarPaginacionDescuentos();
}
