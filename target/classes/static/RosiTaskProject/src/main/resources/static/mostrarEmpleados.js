/**
 * 
 */

document.addEventListener('DOMContentLoaded', function () {
    axios.get('http://localhost:8282/nomina/getAll')
        .then(response => {
            const empleados = response.data;
            const tbody = document.getElementById('tbody-empleados');
            tbody.innerHTML = '';

            empleados.forEach(empleado => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
				<td>${empleado.idEmpleado}</td>
				                 <td>${empleado.nombreEmpleado}</td>
				                 <td>${empleado.apellidoEmpleado}</td>
				                 <td>${empleado.tipoDocumento}</td>
				                 <td>${empleado.numeroDocumento}</td>
				                 <td class="acciones">
				                     <button class="btn-editar" data-id="${empleado.id}">Editar</button>
				                     <button class="btn-detalles" data-id="${empleado.id}">Detalles</button>
				                     <button class="btn-eliminar" data-id="${empleado.id}">Eliminar</button>
				                 </td>
                `;

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar los empleados:', error);
            alert('No se pudo cargar la lista de empleados');
        });
});
