document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert("No se proporcionó el ID del pedido.");
        window.location.href = 'mostrarPedidos.html';
        return;
    }

    axios.get(`http://localhost:8282/pedido/findRecord/${id}`)
        .then(response => {
            const pedido = response.data;

            document.getElementById('detalle-id').textContent = pedido.idPedido;
            document.getElementById('detalle-fecha-pedido').textContent = pedido.fechaPedido;
            document.getElementById('detalle-fecha-entrega').textContent = pedido.fechaEntrega;
            document.getElementById('detalle-estado').textContent = pedido.estado;
            document.getElementById('detalle-proveedor').textContent = pedido.proveedor;
            document.getElementById('detalle-forma-pago').textContent = pedido.formaPago;
            document.getElementById('detalle-observaciones').textContent = pedido.observaciones;
            document.getElementById('detalle-total').textContent = pedido.total;
        })
        .catch(error => {
            console.error("Error al cargar detalles del pedido:", error);
            alert("No se pudo cargar la información del pedido.");
            window.location.href = 'mostrarPedidos.html';
        });
});
