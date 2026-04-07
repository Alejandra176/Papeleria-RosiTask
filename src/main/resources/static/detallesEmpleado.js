// Versión optimizada - detallesEmpleado.js
document.addEventListener('DOMContentLoaded', () => {
    try {
        const empleadoId = obtenerIdDesdeURL();
        if (!empleadoId) throw new Error("ID de empleado no encontrado en URL");
        
        cargarDetallesEmpleado(empleadoId);
    } catch (error) {
        manejarError(error);
    }
});

// Función para extraer ID de la URL
const obtenerIdDesdeURL = () => {
    return new URLSearchParams(window.location.search).get('id');
};

// Función principal para cargar datos
const cargarDetallesEmpleado = async (id) => {
    try {
        const response = await fetch(`http://localhost:8282/nomina/findRecord/${id}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const empleado = await response.json();
        renderizarDatosEmpleado(empleado);
        
    } catch (error) {
        manejarError(error);
    }
};

// Función para mostrar datos en la UI
const renderizarDatosEmpleado = (empleado) => {
    const formatos = {
        salario: (valor) => `$${valor.toLocaleString('es-CO')}`,
        fecha: (valor) => valor.split('T')[0]
    };

    const campos = [
        { id: 'idEmpleadoTexto', valor: empleado.idEmpleado },
        { id: 'nombreEmpleado', valor: empleado.nombreEmpleado },
        { id: 'apellidoEmpleado', valor: empleado.apellidoEmpleado },
        { id: 'tipoDocumento', valor: empleado.tipoDocumento },
        { id: 'numeroDocumento', valor: empleado.numeroDocumento },
        { id: 'fechaNacimiento', valor: formatos.fecha(empleado.fechaNacimiento) },
        { id: 'direccion', valor: empleado.direccion },
        { id: 'telefono', valor: empleado.telefono },
        { id: 'correo', valor: empleado.correo },
        { id: 'cargo', valor: empleado.cargo },
        { id: 'salario', valor: formatos.salario(empleado.salario) },
        { id: 'fechaIngreso', valor: formatos.fecha(empleado.fechaIngreso) },
        { id: 'estado', valor: empleado.estado }
    ];

    campos.forEach(({id, valor}) => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor;
    });
};

// Manejo centralizado de errores
const manejarError = (error) => {
    console.error("Error en detallesEmpleado:", error);
    alert(error.message || "Error al cargar detalles");
    window.location.href = 'mostrarNomina.html';
};
