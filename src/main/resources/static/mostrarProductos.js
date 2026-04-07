let productos = [];
let paginaActual = 1;
const productosPorPagina = 10;
let idSeleccionadoEliminar = null;

function cargarProductos() {
  axios.get("http://localhost:8282/producto/getAll")
    .then(response => {
      productos = response.data;
      mostrarPagina(1);
      generarPaginacion();
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
      alert("No se pudo cargar la lista de productos");
    });
}

document.addEventListener('DOMContentLoaded', function () {
  cargarProductos();

  document.getElementById('buscar-id').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const idBuscado = e.target.value.trim();

      if (idBuscado === '') {
        cargarProductos();
        return;
      }

      axios.get(`http://localhost:8282/producto/findRecord/${idBuscado}`)
        .then(response => {
          productos = [response.data];
          mostrarPagina(1);
          generarPaginacion();
        })
        .catch(error => {
          console.error('Error al buscar producto por ID:', error);
          alert('No se encontró un producto con ese ID');
        });
    }
  });

  // Delegación de eventos para botones
  document.getElementById('tbody-productos').addEventListener('click', function (e) {
    const id = e.target.dataset.id;

    if (e.target.classList.contains('btn-editar')) {
      window.location.href = `editarProducto.html?id=${id}`;
    } else if (e.target.classList.contains('btn-detalles')) {
      window.location.href = `detallesProducto.html?id=${id}`;
    } else if (e.target.classList.contains('btn-eliminar')) {
      abrirModalEliminar(id);
    }
  });

  // Confirmar eliminación
  document.querySelector('.modal .eliminar').addEventListener('click', function () {
    if (idSeleccionadoEliminar) {
      axios.delete(`http://localhost:8282/producto/deleteProducto/${idSeleccionadoEliminar}`)
        .then(() => {
          alert("Producto eliminado correctamente");
          cerrarModalEliminar();
          cargarProductos();
        })
        .catch(error => {
          console.error("Error al eliminar:", error);
          alert("No se pudo eliminar el producto");
        });
    }
  });
});

function mostrarPagina(pagina) {
  const tbody = document.getElementById('tbody-productos');
  tbody.innerHTML = '';

  paginaActual = pagina;
  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productos.slice(inicio, fin);

  productosPagina.forEach(producto => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${producto.idProducto}</td>
      <td>${producto.nombreProducto}</td>
      <td>${producto.marca}</td>
      <td>${producto.precioVenta}</td>
      <td>${producto.estado}</td>
      <td class="acciones">
        <button class="btn-editar" data-id="${producto.idProducto}">Editar</button>
        <button class="btn-detalles" data-id="${producto.idProducto}">Detalles</button>
        <button class="btn-eliminar" data-id="${producto.idProducto}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function generarPaginacion() {
  const paginacionDiv = document.querySelector('.pagination');
  paginacionDiv.innerHTML = '';

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

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
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

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
  document.getElementById('idProductoEliminar').textContent = id;
}

function cerrarModalEliminar() {
  const modal = document.getElementById('modalEliminar');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}
