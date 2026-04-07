document.addEventListener('DOMContentLoaded', function () {
    let idSeleccionadoEliminar = null;
    let egresos = [];
    let paginaActual = 1;
    const egresosPorPagina = 10;

    function cargarEgresos() {
        Promise.all([
            axios.get('http://localhost:8282/egresoPagoLocal/getAll'),
            axios.get('http://localhost:8282/egresoPagoNomina/getAll')
        ]).then(([localResponse, nominaResponse]) => {
            const egresosLocal = localResponse.data.map(egreso => ({
                id: egreso.id,
                fecha: egreso.fechaEgreso,
                categoria: "Pago Local",
                valor: egreso.valor,
                metodoPago: egreso.metodoPago,
                tipo: "local"
            }));

            const egresosNomina = nominaResponse.data.map(egreso => ({
                id: egreso.id,
                fecha: egreso.fechaEgreso,
                categoria: "Pago Nómina",
                valor: egreso.valor,
                metodoPago: egreso.metodoPago,
                tipo: "nomina"
            }));

            egresos = [...egresosLocal, ...egresosNomina];
            mostrarPaginaEgresos(1);
            generarPaginacionEgresos();
        }).catch(error => {
            console.error('Error al cargar los egresos:', error);
            alert('No se pudo cargar la lista de egresos');
        });
    }

    function mostrarPaginaEgresos(pagina) {
        const tbody = document.querySelector('.tabla-egresos tbody');
        tbody.innerHTML = '';
        paginaActual = pagina;

        const inicio = (pagina - 1) * egresosPorPagina;
        const fin = inicio + egresosPorPagina;
        const egresosPagina = egresos.slice(inicio, fin);

        egresosPagina.forEach(egreso => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${egreso.id}</td>
                <td>${egreso.fecha}</td>
                <td>${egreso.categoria}</td>
                <td>${egreso.valor}</td>
                <td>${egreso.metodoPago}</td>
                <td class="acciones">
                    <button class="btn-detalles" data-id="${egreso.id}" data-tipo="${egreso.tipo}">Detalles</button>
                    <button class="btn-eliminar" data-id="${egreso.id}" data-tipo="${egreso.tipo}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        agregarEventosAcciones();
    }

    function generarPaginacionEgresos() {
        const paginacionDiv = document.querySelector('.pagination');
        if (!paginacionDiv) return;
        paginacionDiv.innerHTML = '';

        const totalPaginas = Math.ceil(egresos.length / egresosPorPagina);

        const btnAnterior = document.createElement('button');
        btnAnterior.classList.add('arrow');
        btnAnterior.innerHTML = '&lt;';
        btnAnterior.onclick = () => cambiarPaginaEgresos('prev');
        paginacionDiv.appendChild(btnAnterior);

        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement('button');
            btn.classList.add('page');
            if (i === paginaActual) btn.classList.add('active');
            btn.textContent = i;
            btn.onclick = () => irAPaginaEgresos(i);
            paginacionDiv.appendChild(btn);
        }

        const btnSiguiente = document.createElement('button');
        btnSiguiente.classList.add('arrow');
        btnSiguiente.innerHTML = '&gt;';
        btnSiguiente.onclick = () => cambiarPaginaEgresos('next');
        paginacionDiv.appendChild(btnSiguiente);
    }

    function irAPaginaEgresos(numero) {
        paginaActual = numero;
        mostrarPaginaEgresos(paginaActual);
        generarPaginacionEgresos();
    }

    function cambiarPaginaEgresos(direccion) {
        const totalPaginas = Math.ceil(egresos.length / egresosPorPagina);
        if (direccion === 'prev' && paginaActual > 1) {
            paginaActual--;
        } else if (direccion === 'next' && paginaActual < totalPaginas) {
            paginaActual++;
        }
        mostrarPaginaEgresos(paginaActual);
        generarPaginacionEgresos();
    }

    function agregarEventosAcciones() {
        document.querySelectorAll('.btn-detalles').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const tipo = btn.dataset.tipo;

                if (tipo === 'local') {
                    window.location.href = `detallesEgresoPagoLocal.html?id=${id}`;
                } else if (tipo === 'nomina') {
                    window.location.href = `detallesEgresoPagoNomina.html?id=${id}`;
                }
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', () => {
                idSeleccionadoEliminar = {
                    id: btn.dataset.id,
                    tipo: btn.dataset.tipo
                };
                abrirModalEliminar(idSeleccionadoEliminar.id);
            });
        });
    }

    function buscarEgresoPorId() {
        const tipo = document.getElementById('tipo-egreso').value;
        const id = document.getElementById('buscar-id-egreso').value.trim();

        if (!id) {
            cargarEgresos();
            return;
        }

        let url = '';
        if (tipo === 'local') {
            url = `http://localhost:8282/egresoPagoLocal/findRecord/${id}`;
        } else if (tipo === 'nomina') {
            url = `http://localhost:8282/egresoPagoNomina/findRecord/${id}`;
        }

        axios.get(url)
            .then(response => {
                const egreso = response.data;
                egresos = [{
                    id: egreso.id,
                    fecha: egreso.fechaEgreso,
                    categoria: tipo === 'local' ? 'Pago Local' : 'Pago Nómina',
                    valor: egreso.valor,
                    metodoPago: egreso.metodoPago,
                    tipo: tipo
                }];
                mostrarPaginaEgresos(1);
                generarPaginacionEgresos();
            })
            .catch(error => {
                console.error('Error al buscar el egreso:', error);
                alert('No se encontró ningún egreso con ese ID.');
            });
    }

    document.getElementById('buscar-id-egreso').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            buscarEgresoPorId();
        }
    });

    function abrirModalEliminar(id) {
        const modal = document.getElementById('modalEliminar');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
        document.getElementById('idEgresoEliminar').textContent = id;
    }

    function cerrarModalEliminar() {
        const modal = document.getElementById('modalEliminar');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Botón EXCEL
    function generarReporteExcel() {
        window.open('http://localhost:8282/egreso/exportarExcel', '_blank');
    }

    // Botón PDF (siempre combinado)
	window.generarReportePDF = function () {
	        const fechaInicio = document.getElementById('fechaInicio').value;
	        const fechaFin = document.getElementById('fechaFin').value;

	        if (!fechaInicio || !fechaFin) {
	            alert('Debes seleccionar ambas fechas.');
	            return;
	        }

	        const url = `/egreso/reportePDF?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
	        window.open(url, '_blank');
	    };

    document.querySelector('.btn-excel').addEventListener('click', generarReporteExcel);
    document.querySelector('.btn-pdf').addEventListener('click', generarReportePDF);

    cargarEgresos();
});
