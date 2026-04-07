document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert("No se proporcionó el ID del egreso.");
        window.location.href = 'mostrarEgresos.html';
        return;
    }

    axios.get(`http://localhost:8282/egresoPagoLocal/findRecord/${id}`)
        .then(response => {
            const egreso = response.data;

            document.getElementById('detalle-id').textContent = egreso.id;
            document.getElementById('detalle-fecha').textContent = egreso.fechaEgreso;
            document.getElementById('detalle-valor').textContent = `$${egreso.valor.toLocaleString()}`;
            document.getElementById('detalle-metodo-pago').textContent = egreso.metodoPago;
            document.getElementById('detalle-concepto').textContent = egreso.concepto;
            document.getElementById('detalle-estado-pago').textContent = egreso.estadoPago;
            document.getElementById('detalle-factura').textContent = egreso.numeroFactura || 'N/A';
            document.getElementById('detalle-periodo').textContent = egreso.periodo;
            document.getElementById('detalle-categoria').textContent = "Pago Local";
        })
        .catch(error => {
            console.error("Error al cargar detalles del egreso:", error);
            alert("No se pudo cargar la información del egreso.");
            window.location.href = 'mostrarEgresos.html';
        });
});
