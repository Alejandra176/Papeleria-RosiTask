document.addEventListener('DOMContentLoaded', () => {
  obtenerProductosMasVendidos();
});

function formatearMoneda(valor) {
  return `$${valor.toLocaleString('es-CO')}`;
}

function obtenerProductosMasVendidos() {
  axios.get('http://localhost:8282/venta/productosMasVendidos')
    .then(response => {
      const productos = response.data;
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = ''; // Limpiar tabla existente

      productos
        .sort((a, b) => b.unidades - a.unidades) // Ordenar por más unidades vendidas
        .forEach(producto => {
          const fila = document.createElement('tr');

          const tdNombre = document.createElement('td');
          tdNombre.textContent = producto.nombre;

          const tdUnidades = document.createElement('td');
          tdUnidades.textContent = producto.unidades;

          const tdTotal = document.createElement('td');
          tdTotal.textContent = formatearMoneda(producto.total);

          fila.appendChild(tdNombre);
          fila.appendChild(tdUnidades);
          fila.appendChild(tdTotal);

          tbody.appendChild(fila);
        });
    })
    .catch(error => {
      console.error('Error al obtener productos más vendidos:', error);
      alert('No se pudieron cargar los productos más vendidos');
    });
}
