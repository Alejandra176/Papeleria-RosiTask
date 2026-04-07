document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert("No se proporcionó el ID del descuento.");
        window.location.href = 'mostrarDescuentos.html';
        return;
    }

    axios.get(`http://localhost:8282/descuento/findRecord/${id}`)
        .then(response => {
            const descuento = response.data;

            document.getElementById('detalle-idDescuento').textContent = descuento.idDescuento;
            document.getElementById('detalle-nombreDescu').textContent = descuento.nombreDescu;
            document.getElementById('detalle-descripcionDescu').textContent = descuento.descripcionDescu;
            document.getElementById('detalle-tipoDescu').textContent = descuento.tipoDescu;
            document.getElementById('detalle-fechaInicio').textContent = descuento.fechaInicio;
            document.getElementById('detalle-fechaFin').textContent = descuento.fechaFin;
            document.getElementById('detalle-estadoDescu').textContent = descuento.estadoDescu;
            document.getElementById('detalle-idProducto').textContent = descuento.idProducto;
        })
        .catch(error => {
            console.error("Error al cargar detalles del descuento:", error);
            alert("No se pudo cargar la información del descuento.");
            window.location.href = 'mostrarDescuentos.html';
        });
});
