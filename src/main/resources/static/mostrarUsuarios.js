let usuarios = [];
let paginaActual = 1;
const usuariosPorPagina = 10;
let idSeleccionadoEliminar = null;

function cargarUsuarios() {
  axios.get("http://localhost:8282/usuario/getAll")
    .then(response => {
      usuarios = response.data;
      mostrarPagina(1);
      generarPaginacion();
    })
    .catch(error => {
      console.error("Error al cargar usuarios:", error);
      alert("No se pudo cargar la lista de usuarios");
    });
}

document.addEventListener('DOMContentLoaded', function () {
  cargarUsuarios();

  document.getElementById('buscar-id').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const idBuscado = e.target.value.trim();

      if (idBuscado === '') {
        cargarUsuarios();
        return;
      }

      axios.get(`http://localhost:8282/usuario/findRecord/${idBuscado}`)
        .then(response => {
          usuarios = [response.data];
          mostrarPagina(1);
          generarPaginacion();
        })
        .catch(error => {
          console.error('Error al buscar usuario por ID:', error);
          alert('No se encontró un usuario con ese ID');
        });
    }
  });

  document.getElementById('tbody-usuarios').addEventListener('click', function (e) {
    const id = e.target.dataset.id;

    if (e.target.classList.contains('btn-editar')) {
      window.location.href = `editarUsuario.html?id=${id}`;
    } else if (e.target.classList.contains('btn-detalles')) {
      window.location.href = `detallesUsuario.html?id=${id}`;
    } else if (e.target.classList.contains('btn-eliminar')) {
      abrirModalEliminar(id);
    }
  });

  document.querySelector('.modal .eliminar').addEventListener('click', function () {
    if (idSeleccionadoEliminar) {
      axios.delete(`http://localhost:8282/usuario/deleteUsuario/${idSeleccionadoEliminar}`)
        .then(() => {
          alert("Usuario eliminado correctamente");
          cerrarModalEliminar();
          cargarUsuarios();
        })
        .catch(error => {
          console.error("Error al eliminar:", error);
          alert("No se pudo eliminar el usuario");
        });
    }
  });
});

function mostrarPagina(pagina) {
  const tbody = document.getElementById('tbody-usuarios');
  tbody.innerHTML = '';

  paginaActual = pagina;
  const inicio = (pagina - 1) * usuariosPorPagina;
  const fin = inicio + usuariosPorPagina;
  const usuariosPagina = usuarios.slice(inicio, fin);

  usuariosPagina.forEach(usuario => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usuario.idUsuario}</td>
      <td>${usuario.nombreEmpleado}</td>
	  <td>${usuario.correo}</td>
	  <td>${usuario.rol}</td>
	  <td>${usuario.estado}</td>
      <td class="acciones">
        <button class="btn-editar" data-id="${usuario.idUsuario}">Editar</button>
        <button class="btn-detalles" data-id="${usuario.idUsuario}">Detalles</button>
        <button class="btn-eliminar" data-id="${usuario.idUsuario}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function generarPaginacion() {
  const paginacionDiv = document.querySelector('.pagination');
  paginacionDiv.innerHTML = '';

  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  const btnAnterior = document.createElement('button');
  btnAnterior.innerHTML = '&lt;';
  btnAnterior.classList.add('arrow');
  btnAnterior.onclick = () => cambiarPagina('prev');
  paginacionDiv.appendChild(btnAnterior);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('page');
    if (i === paginaActual) btn.classList.add('active');
    btn.addEventListener('click', () => mostrarPagina(i));
    paginacionDiv.appendChild(btn);
  }

  const btnSiguiente = document.createElement('button');
  btnSiguiente.innerHTML = '&gt;';
  btnSiguiente.classList.add('arrow');
  btnSiguiente.onclick = () => cambiarPagina('next');
  paginacionDiv.appendChild(btnSiguiente);
}

function cambiarPagina(direccion) {
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  if (direccion === 'prev' && paginaActual > 1) {
    mostrarPagina(paginaActual - 1);
  } else if (direccion === 'next' && paginaActual < totalPaginas) {
    mostrarPagina(paginaActual + 1);
  }
}

function abrirModalEliminar(id) {
  idSeleccionadoEliminar = id;
  const modal = document.getElementById('modalEliminar');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  document.getElementById('idUsuarioEliminar').textContent = id;
}

function cerrarModalEliminar() {
  const modal = document.getElementById('modalEliminar');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}
