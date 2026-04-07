//---------------------PAGINACION-----------------------------------//	
let todosLasPromociones = []; // Se mantiene una copia original
let descuentos = [];
let paginaActual = 1;
const promocionesPorPagina = 10;
//-------------------------------------------------------------------//	
document.addEventListener('DOMContentLoaded', function() {
	// Obtener y cargar promociones
	axios.get('http://localhost:8282/promocion/getAll')
		.then(response => {
			todosLasPromociones = response.data; // Guarda la copia completa
			promociones = [...todosLasPromociones]; // Inicialmente usamos todos
			mostrarPaginaPromociones(1);                // Mostrar desde la primera página
			generarPaginacionPromociones();             // Actualizar la paginación
		})
		.catch(error => {
			console.error("Error al cargar las promociones:", error);
			alert("No se pudo cargar la lista de promociones");
		});

	// Eventos para botones dentro de la tabla
	document.getElementById('tbody-promociones').addEventListener('click', function(e) {
		if (e.target && e.target.classList.contains('btn-editar')) {
			const id = e.target.dataset.id;
			window.location.href = `editarPromocion.html?id=${id}`;

		} else if (e.target && e.target.classList.contains('btn-detalles')) {
			const id = e.target.dataset.id;
			window.location.href = `detallesPromocion.html?id=${id}`;

		}
	});

	// Buscar promociones por ID al presionar Enter
	document.getElementById('buscar-id').addEventListener('keypress', function(e) {
		if (e.key === 'Enter') {
			const idBuscado = e.target.value.trim();

			if (idBuscado === '') {
				// Si está vacío, se restauran todos los descuentos
				promociones = [...todosLasPromociones];
				mostrarPaginaPromociones(1);
				generarPaginacionPromociones();
				return;
			}

			axios.get(`http://localhost:8282/promocion/findRecord/${idBuscado}`)
				.then(response => {
					promociones = [response.data];
					mostrarPaginaPromociones(1);
					generarPaginacionPromociones();
				})
				.catch(error => {
					console.error('Error al buscar la promoción por ID:', error);
					Swal.fire({
						icon: 'warning',
						title: 'Promoción no encontrada',
						text: 'No se encontró una promoción con ese ID. Verifica e intenta nuevamente.',
						confirmButtonColor: '#f0ad4e',
						confirmButtonText: 'Aceptar'
					});
				});

		}
	});
});


// Muestra los descuentos correspondientes a la página solicitada, Calcula el índice de inicio y fin, Recorre los descuentos y los agrega al tbody de la tabla como filas, Cada fila incluye botones: Editar, Detalles, Eliminar.
function mostrarPaginaPromociones(pagina) {
	const tbody = document.getElementById('tbody-promociones');
	tbody.innerHTML = '';
	paginaActual = pagina;

	const inicio = (pagina - 1) * promocionesPorPagina;
	const fin = inicio + promocionesPorPagina;
	const promocionesPagina = promociones.slice(inicio, fin);

	promocionesPagina.forEach(promocion => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
                    <td>${promocion.idPromocion}</td>
                    <td>${promocion.nombrePromo}</td>
                    <td>${promocion.tipoPromo}</td>
                    <td>${promocion.estadoPromo}</td>
                    <td class="acciones">
					<button class="btn-editar" data-id="${promocion.idPromocion}">Editar</button>
					<button class="btn-detalles" data-id="${promocion.idPromocion}">Detalles</button>
					<button class="btn-eliminar" data-id="${promocion.idPromocion}">Eliminar</button>
                    </td>
                `;

		tbody.appendChild(tr);
	});
	if (typeof asignarEventosEliminar === "function") {
		asignarEventosEliminar();
	}
}

// Genera dinámicamente los botones de paginación, Marca el botón de la página actual con la clase, Agrega botones para ir a la página anterior	
function generarPaginacionPromociones() {
	const paginacionDiv = document.querySelector('.pagination');
	paginacionDiv.innerHTML = '';

	const totalPaginas = Math.ceil(promociones.length / promocionesPorPagina);

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
	const totalPaginas = Math.ceil(promociones.length / promocionesPorPagina);
	if (direccion === 'prev' && paginaActual > 1) {
		mostrarPaginaPromociones(paginaActual - 1);
		generarPaginacionPromociones();
	} else if (direccion === 'next' && paginaActual < totalPaginas) {
		mostrarPaginaPromociones(paginaActual + 1);
		generarPaginacionPromociones();
	}
}

function irAPagina(numero) {
	mostrarPaginaPromociones(numero);
	generarPaginacionPromociones();
}

