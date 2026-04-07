document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert("No se proporcionó el ID de la promocion.");
        window.location.href = 'mostrarPromociones.html';
        return;
    }

    axios.get(`http://localhost:8282/promocion/findRecord/${id}`)
        .then(response => {
            const promocion = response.data;

            document.getElementById('detalle-idPromocion').textContent = promocion.idPromocion;
            document.getElementById('detalle-nombrePromo').textContent = promocion.nombrePromo;
            document.getElementById('detalle-descripcionPromo').textContent = promocion.descripcionPromo;
            document.getElementById('detalle-tipoPromo').textContent = promocion.tipoPromo;
            document.getElementById('detalle-fechaInicio').textContent = promocion.fechaInicio;
            document.getElementById('detalle-fechaFin').textContent = promocion.fechaFin;
            document.getElementById('detalle-estadoPromo').textContent = promocion.estadoPromo;
            document.getElementById('detalle-idProductoFull').textContent = promocion.idProductoFull;
			document.getElementById('detalle-idProductoBeneficio').textContent = promocion.idProductoBeneficio;

        })
        .catch(error => {
            console.error("Error al cargar detalles de la promocion:", error);
            alert("No se pudo cargar la información de la promocion.");
            window.location.href = 'mostrarPromociones.html';
        });
});
