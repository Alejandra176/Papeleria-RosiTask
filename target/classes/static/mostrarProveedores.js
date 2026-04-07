let proveedores = [];
let paginaActual = 1;
const proveedoresPorPagina = 10;

function cargarProveedores() {
	axios.get("http://localhost:8282/proveedor/getAll")
		.then(response => {
			proveedores = response.data;
			mostrarPagina(1);
			generarPaginacion();
		})
		.catch(error => {
			console.error("Error al cargar proveedores:", error);
			alert("No se pudo cargar la lista de proveedores");
		});
}

document.addEventListener('DOMContentLoaded', function() {
	cargarProveedores();

	document.getElementById('buscar-id').addEventListener('keypress', function(e) {
		if (e.key === 'Enter') {
			const idBuscado = e.target.value.trim();

			if (idBuscado === '') {
				cargarProveedores();
				return;
			}

			axios.get(`http://localhost:8282/proveedor/findRecord/${idBuscado}`)
				.then(response => {
					proveedores = [response.data];
					mostrarPagina(1);
					generarPaginacion();
				})
				.catch(error => {
					console.error('Error al buscar proveedor por ID:', error);
					alert('No se encontró un proveedor con ese ID');
				});
		}
	});

	document.getElementById('tbody-proveedores').addEventListener('click', function(e) {
		const id = e.target.dataset.id;

		if (e.target.classList.contains('btn-editar')) {
			window.location.href = `editarProveedor.html?id=${id}`;
		} else if (e.target.classList.contains('btn-detalles')) {
			window.location.href = `detallesProveedor.html?id=${id}`;
		} 
	});
});

function mostrarPagina(pagina) {
	const tbody = document.getElementById('tbody-proveedores');
	tbody.innerHTML = '';

	paginaActual = pagina;
	const inicio = (pagina - 1) * proveedoresPorPagina;
	const fin = inicio + proveedoresPorPagina;
	const paginaProveedores = proveedores.slice(inicio, fin);

	paginaProveedores.forEach(proveedor => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
	<td>${proveedor.idProveedor}</td>
      <td>${proveedor.nombreProveedor}</td>
      <td>${proveedor.telefono}</td>
      <td>${proveedor.direccion}</td>
      <td>${proveedor.fechaRegistro}</td>
      <td class="acciones">
        <button class="btn-editar" data-id="${proveedor.idProveedor}">Editar</button>
        <button class="btn-detalles" data-id="${proveedor.idProveedor}">Detalles</button>
        <button class="btn-eliminar" data-id="${proveedor.idProveedor}">Eliminar</button>
      </td>
    `;
		tbody.appendChild(tr);
	});
}

function generarPaginacion() {
	const paginacionDiv = document.querySelector('.pagination');
	paginacionDiv.innerHTML = '';

	const totalPaginas = Math.ceil(proveedores.length / proveedoresPorPagina);

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
	const totalPaginas = Math.ceil(proveedores.length / proveedoresPorPagina);
	if (direccion === 'prev' && paginaActual > 1) {
		paginaActual--;
	} else if (direccion === 'next' && paginaActual < totalPaginas) {
		paginaActual++;
	}
	mostrarPagina(paginaActual);
	generarPaginacion();
}
