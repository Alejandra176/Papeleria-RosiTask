window.onload = function () {
    const productoId = getProductoIdFromURL();
    cargarProveedores();
    cargarProducto(productoId);
};

function getProductoIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

let nombreOriginal = "";

function cargarProveedores() {
    axios.get('http://localhost:8282/proveedor/getAll')
        .then(response => {
            const proveedores = response.data;
            const select = document.getElementById('productoProveedor');
            select.innerHTML = '<option selected disabled>Seleccione un proveedor</option>';

            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.idProveedor;
                option.textContent = proveedor.nombreProveedor;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar proveedores:', error);
            Swal.fire("Error", "No se pudieron cargar los proveedores", "error");
        });
}

function cargarProducto(id) {
    axios.get(`http://localhost:8282/producto/findRecord/${id}`)
        .then(response => {
            const producto = response.data;

            document.getElementById('idProducto').value = producto.idProducto;
            document.getElementById('idProductoTexto').textContent = producto.idProducto;
            document.getElementById('nombreProducto').value = producto.nombreProducto;
            document.getElementById('marca').value = producto.marca;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('estado').value = producto.estado;
            document.getElementById('precioCompra').value = producto.precioCompra;
            document.getElementById('precioVenta').value = producto.precioVenta;
            document.getElementById('fechaIngreso').value = producto.fechaIngreso.split('T')[0];
            document.getElementById('cantidadProducto').value = producto.cantidadProducto;

            nombreOriginal = producto.nombreProducto;

            setTimeout(() => {
                document.getElementById('productoProveedor').value = producto.productoProveedor;
            }, 200);
        })
        .catch(error => {
            console.error('Error al cargar el producto:', error);
            Swal.fire("Error", "No se pudo cargar el producto", "error");
        });
}

document.getElementById('formEditar').addEventListener('submit', function (event) {
    event.preventDefault();

    const idProducto = document.getElementById('idProducto').value;
    const nombreProducto = document.getElementById('nombreProducto').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const estado = document.getElementById('estado').value;
    const precioCompra = document.getElementById('precioCompra').value.trim();
    const precioVenta = document.getElementById('precioVenta').value.trim();
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const cantidadProducto = document.getElementById('cantidadProducto').value.trim();
    const productoProveedor = document.getElementById('productoProveedor').value;

    let errores = [];

    if (nombreProducto === '') errores.push("El nombre del producto es obligatorio.");
    if (marca === '') errores.push("La marca es obligatoria.");
    if (descripcion.length > 500) errores.push("La descripción no debe superar los 500 caracteres.");
    if (estado !== 'Disponible' && estado !== 'No disponible') errores.push("El estado debe ser 'Disponible' o 'No disponible'.");

    if (!esNumeroValido(precioCompra) || parseFloat(precioCompra) <= 0) errores.push("El precio de compra debe ser mayor que 0.");
    if (!esNumeroValido(precioVenta) || parseFloat(precioVenta) <= 0) errores.push("El precio de venta debe ser mayor que 0.");
    if (esNumeroValido(precioCompra) && esNumeroValido(precioVenta) && parseFloat(precioVenta) < parseFloat(precioCompra)) {
        errores.push("El precio de venta no puede ser menor que el precio de compra.");
    }

    if (!fechaIngreso) {
        errores.push("La fecha de ingreso es obligatoria.");
    } else {
        const fechaActual = new Date().toISOString().split('T')[0];
        if (fechaIngreso > fechaActual) errores.push("La fecha no puede ser futura.");
    }

    if (!esNumeroEnteroPositivo(cantidadProducto)) errores.push("La cantidad debe ser un número entero positivo.");

    if (!productoProveedor || productoProveedor === "Proveedor") errores.push("Debe seleccionar un proveedor.");

    if (errores.length > 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Errores encontrados',
            html: '<ul style="text-align:left;">' + errores.map(e => `<li>${e}</li>`).join('') + '</ul>'
        });
        return;
    }

    if (nombreProducto !== nombreOriginal) {
        axios.get(`http://localhost:8282/producto/existeNombre/${encodeURIComponent(nombreProducto)}`)
            .then(response => {
                if (response.data === true) {
                    Swal.fire("Nombre duplicado", "Ya existe un producto con ese nombre.", "error");
                    return;
                }
                actualizarProducto(); 
            })
            .catch(error => {
                console.error('Error al verificar nombre:', error);
                Swal.fire("Error", "Error al verificar el nombre del producto.", "error");
            });
    } else {
        actualizarProducto();
    }

    function actualizarProducto() {
        const producto = {
            idProducto,
            nombreProducto,
            marca,
            descripcion,
            estado,
            precioCompra: parseFloat(precioCompra),
            precioVenta: parseFloat(precioVenta),
            fechaIngreso,
            cantidadProducto: parseInt(cantidadProducto),
            productoProveedor
        };

        axios.post('http://localhost:8282/producto/saveProducto', producto)
            .then(function () {
                Swal.fire({
                    icon: 'success',
                    title: '¡Actualizado!',
                    text: 'Producto actualizado correctamente',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = 'mostrarProductos.html';
                });
            })
            .catch(function (error) {
                console.error('Error al guardar el producto:', error);
                Swal.fire("Error", "Hubo un error al actualizar el producto", "error");
            });
    }
});

function esNumeroValido(valor) {
    return !isNaN(valor) && valor !== '';
}

function esNumeroEnteroPositivo(valor) {
    const num = parseInt(valor);
    return Number.isInteger(num) && num >= 0;
}
