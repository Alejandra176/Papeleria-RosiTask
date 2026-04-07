window.onload = async function () {
    const descuentoId = getDescuentoIdFromURL();
    await cargarDescuento(descuentoId); // Esperar que se carguen los datos

    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaInicio').setAttribute('min', hoy);
};

function getDescuentoIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function cargarDescuento(id) {
    try {
        const response = await axios.get(`http://localhost:8282/descuento/findRecord/${id}`);
        const descuento = response.data;

        document.getElementById('idDescuento').value = descuento.idDescuento;
        document.getElementById('idDescuentoTexto').textContent = descuento.idDescuento;
        document.getElementById('nombreDescu').value = descuento.nombreDescu;
        document.getElementById('descripcionDescu').value = descuento.descripcionDescu;
        document.getElementById('tipoDescu').value = descuento.tipoDescu;
        document.getElementById('fechaInicio').value = descuento.fechaInicio.split('T')[0];
        document.getElementById('fechaFin').value = descuento.fechaFin.split('T')[0];
        document.getElementById('estadoDescu').value = descuento.estadoDescu;
        document.getElementById('idProducto').value = descuento.idProducto;
        document.getElementById('idProductoTexto').textContent = descuento.idProducto;
    } catch (error) {
        console.error('Error al cargar el descuento:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar el descuento.'
        });
    }
}

document.getElementById('formEditar').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const fechaActual = new Date().toISOString().split('T')[0];

    if (fechaInicio < fechaActual) {
        Swal.fire({
            icon: 'warning',
            title: 'Fecha inválida',
            text: 'La fecha de inicio no puede ser anterior al día de hoy.'
        });
        return;
    }

    if (fechaFin < fechaInicio) {
        Swal.fire({
            icon: 'warning',
            title: 'Fecha inválida',
            text: 'La fecha de fin no puede ser anterior a la fecha de inicio.'
        });
        return;
    }

    const idDescuento = document.getElementById('idDescuento').value;
    const nombreDescu = document.getElementById('nombreDescu').value;

    // Validar nombre duplicado (excepto el actual)
    try {
        const validacionResponse = await axios.post('http://localhost:8282/descuento/validar', {
            idDescuento: parseInt(idDescuento),
            nombreDescu: nombreDescu
        });

        if (validacionResponse.data.nombreExistente === true) {
            Swal.fire({
                icon: 'error',
                title: 'Nombre duplicado',
                text: `Ya existe un descuento con el nombre "${nombreDescu}". Usa uno diferente.`
            });
            return;
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al validar nombre',
            text: 'No se pudo verificar si el nombre ya existe. Intenta más tarde.'
        });
        console.error('Error validando nombre:', error);
        return;
    }

    // Guardar
    const descuento = {
        idDescuento: idDescuento,
        nombreDescu: nombreDescu,
        descripcionDescu: document.getElementById('descripcionDescu').value,
        tipoDescu: document.getElementById('tipoDescu').value,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        estadoDescu: document.getElementById('estadoDescu').value,
        idProducto: document.getElementById('idProducto').value
    };

    axios.post('http://localhost:8282/descuento/saveDescuento', descuento)
        .then(function () {
            Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Descuento actualizado correctamente.'
            }).then(() => {
                window.location.href = 'mostrarDescuentos.html';
            });
        })
        .catch(function (error) {
            console.error('Error al guardar el descuento:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar el descuento.'
            });
        });
});