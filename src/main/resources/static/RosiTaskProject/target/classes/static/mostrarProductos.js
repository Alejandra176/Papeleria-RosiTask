document.addEventListener('DOMContentLoaded', function () {
    axios.get('http://localhost:8282/producto/getAll')
        .then(response => {
            const productos = response.data;
            const tbody = document.getElementById('tbody-productos');
            tbody.innerHTML = '';

            productos.forEach(producto => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${producto.idProducto}</td>
                    <td>${producto.nombreProducto}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.precioVenta}</td>
                    <td>${producto.estado}</td>
                    <td class="acciones">
                        <button class="btn-editar" data-id="${producto.idProducto}">Editar</button>
                        <button class="btn-detalles">Detalles</button>
                        <button class="btn-eliminar" data-id="${producto.idProducto}">Eliminar</button>
                    </td>
                `;

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            alert('No se pudo cargar la lista de productos');
        });

    // Delegación de eventos: manejar clics desde el tbody
    document.getElementById('tbody-productos').addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('btn-editar')) {
            const id = e.target.dataset.id;
            console.log('Redirigiendo a editar producto con ID:', id);
            window.location.href = `editarProducto.html?id=${id}`;
        }
    });
});
