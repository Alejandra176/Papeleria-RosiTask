let ventas = []; // Lista completa
let paginaActual = 1;
const ventasPorPagina = 10;

function generarReporteExcel() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    let url = "http://localhost:8282/venta/exportarExcel";
    if (fechaInicio && fechaFin) {
        url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
    }

    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function () {
    let idSeleccionadoEliminar = null;

    function cargarVentas() {
        axios.get('http://localhost:8282/venta/getAll')
            .then(response => {
                ventas = response.data;
                mostrarPaginaVentas(1);
                generarPaginacionVentas();
            })
            .catch(error => {
                console.error('Error al cargar las ventas:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar ventas',
                    text: 'No se pudo cargar la lista de ventas.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                });
            });
    }

    function mostrarPaginaVentas(pagina) {
        const tbody = document.getElementById('tbody-ventas');
        tbody.innerHTML = '';
        paginaActual = pagina;

        const inicio = (pagina - 1) * ventasPorPagina;
        const fin = inicio + ventasPorPagina;
        const ventasPagina = ventas.slice(inicio, fin);

        ventasPagina.forEach(venta => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${venta.idVenta}</td>
                <td>${venta.fechaVenta}</td>
                <td>${venta.totalVenta}</td>
                <td>${venta.formaPago}</td>
                <td class="acciones">
                    <button class="btn-editar" data-id="${venta.idVenta}">Editar</button>
                    <button class="btn-detalles" data-id="${venta.idVenta}">Detalles</button>
                    <button class="btn-eliminar" data-id="${venta.idVenta}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Eventos botones
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                window.location.href = `editarVenta.html?id=${id}`;
            });
        });

        document.querySelectorAll('.btn-detalles').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                window.location.href = `detallesVenta.html?id=${id}`;
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => {
                idSeleccionadoEliminar = btn.dataset.id;
                abrirModalEliminar(idSeleccionadoEliminar);
            });
        });
    }

    function generarPaginacionVentas() {
        const paginacionDiv = document.querySelector('.pagination');
        if (!paginacionDiv) return;
        paginacionDiv.innerHTML = '';

        const totalPaginas = Math.ceil(ventas.length / ventasPorPagina);

        const btnAnterior = document.createElement('button');
        btnAnterior.classList.add('arrow');
        btnAnterior.innerHTML = '&lt;';
        btnAnterior.onclick = () => cambiarPaginaVentas('prev');
        paginacionDiv.appendChild(btnAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement('button');
            btn.classList.add('page');
            if (i === paginaActual) btn.classList.add('active');
            btn.textContent = i;
            btn.onclick = () => irAPaginaVentas(i);
            paginacionDiv.appendChild(btn);
        }

        const btnSiguiente = document.createElement('button');
        btnSiguiente.classList.add('arrow');
        btnSiguiente.innerHTML = '&gt;';
        btnSiguiente.onclick = () => cambiarPaginaVentas('next');
        paginacionDiv.appendChild(btnSiguiente);
    }

    function irAPaginaVentas(numero) {
        paginaActual = numero;
        mostrarPaginaVentas(paginaActual);
        generarPaginacionVentas();
    }

    function cambiarPaginaVentas(direccion) {
        const totalPaginas = Math.ceil(ventas.length / ventasPorPagina);
        if (direccion === 'prev' && paginaActual > 1) {
            paginaActual--;
        } else if (direccion === 'next' && paginaActual < totalPaginas) {
            paginaActual++;
        }
        mostrarPaginaVentas(paginaActual);
        generarPaginacionVentas();
    }

    // Buscar por ID (Enter)
    document.getElementById('buscar-id-venta').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const idBuscado = e.target.value.trim();
            if (idBuscado === '') {
                cargarVentas();
                return;
            }

            axios.get(`http://localhost:8282/venta/findRecord/${idBuscado}`)
                .then(response => {
                    ventas = [response.data];
                    mostrarPaginaVentas(1);
                    generarPaginacionVentas();
                })
                .catch(error => {
                    console.error('Venta no encontrada:', error);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Venta no encontrada',
                        text: 'No se encontró una venta con ese ID.',
                        confirmButtonColor: '#f0ad4e',
                        confirmButtonText: 'Aceptar'
                    });
                });
        }
    });

    // Modal eliminar
    function abrirModalEliminar(id) {
        const modal = document.getElementById('modalEliminar');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
        document.getElementById('idVentaEliminar').textContent = id;
    }

    function cerrarModalEliminar() {
        const modal = document.getElementById('modalEliminar');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    window.generarReportePDF = function () {
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;

        if (!fechaInicio || !fechaFin) {
            Swal.fire({
                icon: 'info',
                title: 'Fechas requeridas',
                text: 'Debes seleccionar ambas fechas.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const url = `/venta/reportePDF?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
        window.open(url, '_blank');
    };

    document.querySelector('.modal .eliminar').addEventListener('click', function () {
        if (idSeleccionadoEliminar) {
            axios.delete(`http://localhost:8282/venta/deleteVenta/${idSeleccionadoEliminar}`)
                .then(() => {
                    cerrarModalEliminar();
                    cargarVentas();
                    Swal.fire({
                        icon: 'success',
                        title: 'Venta eliminada',
                        text: 'La venta se eliminó exitosamente.',
                        confirmButtonColor: '#28a745',
                        confirmButtonText: 'Aceptar'
                    });
                })
                .catch(error => {
                    console.error('Error al eliminar:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar',
                        text: 'No se pudo eliminar la venta.',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'Aceptar'
                    });
                });
        }
    });

    // Iniciar
    cargarVentas();
});
