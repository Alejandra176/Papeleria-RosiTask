let pedidos = []; // Almacena la lista completa de pedidos
let copiaOriginalPedidos = []; // ← nueva variable
let paginaActual = 1;
const pedidosPorPagina = 10;

document.addEventListener('DOMContentLoaded', function () {
    // Obtener y cargar pedidos
    axios.get('http://localhost:8282/pedido/getAll')
        .then(response => {
            pedidos = response.data;
			copiaOriginalPedidos = [...pedidos]; // ← guardamos una copia
            mostrarPaginaPedidos(1);
            generarPaginacionPedidos();
        })
        .catch(error => {
            console.error('Error al cargar los pedidos:', error);
            alert('No se pudo cargar la lista de pedidos');
        });

    // Delegación de eventos: manejar clics desde el tbody
    document.getElementById('tbody-pedidos').addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('btn-editar')) {
            const id = e.target.dataset.id;
            window.location.href = `editarPedido.html?id=${id}`;
        } else if (e.target && e.target.classList.contains('btn-detalles')) {
            const id = e.target.dataset.id;
            window.location.href = `detallesPedido.html?id=${id}`;
        }
    });

    // Buscar por ID (Enter)
    document.getElementById('buscar-id-pedido').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const idBuscado = e.target.value.trim();
            if (idBuscado === '') {
				pedidos = [...copiaOriginalPedidos]; // ← restaurar copia
                mostrarPaginaPedidos(1);
                generarPaginacionPedidos();
                return;
            }

            axios.get(`http://localhost:8282/pedido/findRecord/${idBuscado}`)
                .then(response => {
                    pedidos = [response.data];
                    mostrarPaginaPedidos(1);
                    generarPaginacionPedidos();
                })
				.catch(error => {
				    console.error('Error al buscar pedido:', error);
				    Swal.fire({
				        icon: 'warning',
				        title: 'Pedido no encontrado',
				        text: 'No se encontró un pedido con ese ID. Verifica e intenta nuevamente.',
				        confirmButtonColor: '#f0ad4e',
				        confirmButtonText: 'Aceptar'
				    });
				});
        }
    });
});

// Mostrar pedidos por página
function mostrarPaginaPedidos(pagina) {
    const tbody = document.getElementById('tbody-pedidos');
    tbody.innerHTML = '';
    paginaActual = pagina;

    const inicio = (pagina - 1) * pedidosPorPagina;
    const fin = inicio + pedidosPorPagina;
    const pedidosPagina = pedidos.slice(inicio, fin);

    pedidosPagina.forEach(pedido => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pedido.idPedido}</td>
            <td>${pedido.fechaPedido}</td>
            <td>${pedido.fechaEntrega}</td>
            <td>${pedido.proveedor}</td>
            <td>${pedido.estado}</td>
            <td class="acciones">
                <button class="btn-editar" data-id="${pedido.idPedido}">Editar</button>
                <button class="btn-detalles" data-id="${pedido.idPedido}">Detalles</button>
                <button class="btn-eliminar" data-id="${pedido.idPedido}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
	if (typeof asignarEventosEliminar === "function") {
	        asignarEventosEliminar();
	    }
}

// Paginación
function generarPaginacionPedidos() {
    const paginacionDiv = document.querySelector('.pagination');
    paginacionDiv.innerHTML = '';

    const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);

    const btnAnterior = document.createElement('button');
    btnAnterior.classList.add('arrow');
    btnAnterior.innerHTML = '&lt;';
    btnAnterior.onclick = () => cambiarPaginaPedidos('prev');
    paginacionDiv.appendChild(btnAnterior);

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.classList.add('page');
        if (i === paginaActual) btn.classList.add('active');
        btn.textContent = i;
        btn.onclick = () => irAPaginaPedidos(i);
        paginacionDiv.appendChild(btn);
    }

    const btnSiguiente = document.createElement('button');
    btnSiguiente.classList.add('arrow');
    btnSiguiente.innerHTML = '&gt;';
    btnSiguiente.onclick = () => cambiarPaginaPedidos('next');
    paginacionDiv.appendChild(btnSiguiente);
}

function irAPaginaPedidos(numero) {
    paginaActual = numero;
    mostrarPaginaPedidos(paginaActual);
    generarPaginacionPedidos();
}

function cambiarPaginaPedidos(direccion) {
    const totalPaginas = Math.ceil(pedidos.length / pedidosPorPagina);
    if (direccion === 'prev' && paginaActual > 1) {
        paginaActual--;
    } else if (direccion === 'next' && paginaActual < totalPaginas) {
        paginaActual++;
    }
    mostrarPaginaPedidos(paginaActual);
    generarPaginacionPedidos();
}
