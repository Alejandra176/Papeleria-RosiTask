document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert("No se proporcionó el ID del egreso.");
        window.location.href = 'mostrarEgresos.html';
        return;
    }

    axios.get(`http://localhost:8282/egresoPagoNomina/findRecord/${id}`)
        .then(response => {
            const egreso = response.data;

            document.getElementById('detalle-id').textContent = egreso.id;
            document.getElementById('detalle-fecha').textContent = egreso.fechaEgreso;
            document.getElementById('detalle-valor').textContent = `$${egreso.valor.toLocaleString()}`;
            document.getElementById('detalle-metodo-pago').textContent = egreso.metodoPago;
            document.getElementById('detalle-categoria').textContent = "Pago Nómina";

            document.getElementById('detalle-empleado').textContent = egreso.empleado;
            document.getElementById('detalle-cargo').textContent = egreso.cargo;
            document.getElementById('detalle-correo').textContent = egreso.correo;
            document.getElementById('detalle-periodo').textContent = egreso.periodoTrabajado;
            document.getElementById('detalle-sueldo').textContent = `$${egreso.sueldoBase.toLocaleString()}`;
            document.getElementById('detalle-deducciones').textContent = `$${egreso.deducciones.toLocaleString()}`;
            document.getElementById('detalle-subsidios').textContent = `$${egreso.subsidios.toLocaleString()}`;
            document.getElementById('detalle-horas-extra').textContent = egreso.horasExtra + " hrs";
            document.getElementById('detalle-neto').textContent = `$${egreso.netoPagado.toLocaleString()}`;
        })
        .catch(error => {
            console.error("Error al cargar detalles del egreso:", error);
            alert("No se pudo cargar la información del egreso.");
            window.location.href = 'mostrarEgresos.html';
        });
});
