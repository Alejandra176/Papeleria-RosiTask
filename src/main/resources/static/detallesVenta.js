document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert("No se proporcionó el ID de la venta.");
        window.location.href = 'mostrarVentas.html';
        return;
    }

    axios.get(`http://localhost:8282/venta/findRecord/${id}`)
        .then(response => {
            const venta = response.data;

            document.getElementById('detalle-id').textContent = venta.idVenta;
            document.getElementById('detalle-producto').textContent = venta.producto || 'N/A';
            document.getElementById('detalle-fecha').textContent = venta.fechaVenta;
            document.getElementById('detalle-empleado').textContent = venta.nombreEmpleado || 'N/A';
            document.getElementById('detalle-cantidad').textContent = venta.cantidad + " unidades";
            document.getElementById('detalle-precio-unitario').textContent = "$" + venta.precioUnitario.toLocaleString();
            document.getElementById('detalle-descuento').textContent = venta.descuento + "%";
            document.getElementById('detalle-total').textContent = "$" + venta.totalVenta.toLocaleString();
            document.getElementById('detalle-forma-pago').textContent = venta.formaPago;
            document.getElementById('detalle-promocion').textContent = venta.promocion || 'Sin promoción';
        })
        .catch(error => {
            console.error("Error al cargar detalles de la venta:", error);
            alert("No se pudo cargar la información de la venta.");
            window.location.href = 'mostrarVentas.html';
        });
});
