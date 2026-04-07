let fechaInicioOriginal = null;

window.onload = function () {
    const promocionId = getPromocionIdFromURL();
    cargarPromocion(promocionId);
};

function getPromocionIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function cargarPromocion(id) {
    axios.get(`http://localhost:8282/promocion/findRecord/${id}`)
        .then(function (response) {
            const promocion = response.data;

            document.getElementById('idPromocion').value = promocion.idPromocion;
            document.getElementById('idPromocionTexto').textContent = promocion.idPromocion;
            document.getElementById('nombrePromo').value = promocion.nombrePromo;
            document.getElementById('descripcionPromo').value = promocion.descripcionPromo;
            document.getElementById('tipoPromo').value = promocion.tipoPromo;

            const fechaInicioStr = promocion.fechaInicio.split('T')[0];
            const fechaFinStr = promocion.fechaFin.split('T')[0];

            fechaInicioOriginal = fechaInicioStr; //  Guardamos la original
            document.getElementById('fechaInicio').value = fechaInicioStr;
            document.getElementById('fechaFin').value = fechaFinStr;

            document.getElementById('estadoPromo').value = promocion.estadoPromo;
            document.getElementById('idProductoFull').value = promocion.idProductoFull;
            document.getElementById('idProductoFullTexto').textContent = promocion.idProductoFull;
            document.getElementById('idProductoBeneficio').value = promocion.idProductoBeneficio;
        })
        .catch(function (error) {
            console.error('Error al cargar la promoción:', error);
        });
}

document.getElementById('formEditar').addEventListener('submit', function (event) {
    event.preventDefault();

    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    // ✅ Bloquear si retrocede la fecha de inicio respecto a la original
    if (fechaInicio < fechaInicioOriginal) {
        Swal.fire({
            icon: 'warning',
            title: 'Fecha inválida',
            text: 'No puedes establecer una fecha de inicio anterior a la ya registrada.',
        });
        return;
    }

    if (fechaFin < fechaInicio) {
        Swal.fire({
            icon: 'warning',
            title: 'Fecha inválida',
            text: 'La fecha de fin no puede ser anterior a la fecha de inicio.',
        });
        return;
    }

    const promocion = {
        idPromocion: document.getElementById('idPromocion').value,
        nombrePromo: document.getElementById('nombrePromo').value,
        descripcionPromo: document.getElementById('descripcionPromo').value,
        tipoPromo: document.getElementById('tipoPromo').value,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        estadoPromo: document.getElementById('estadoPromo').value,
        idProductoFull: document.getElementById('idProductoFull').value,
        idProductoBeneficio: document.getElementById('idProductoBeneficio').value
    };

    axios.post('http://localhost:8282/promocion/savePromocion', promocion)
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Promoción actualizada correctamente',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'mostrarPromociones.html';
            });
        })
        .catch(function (error) {
            console.error('Error al guardar la promoción:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar la promoción'
            });
        });
});
