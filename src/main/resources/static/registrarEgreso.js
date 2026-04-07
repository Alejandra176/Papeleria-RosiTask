function cargarEmpleados() {
  axios.get('http://localhost:8282/nomina/getAll')
    .then(response => {
      const empleados = response.data;
      const select = document.getElementById('empleado');

      empleados.forEach(nomina => {
        const option = document.createElement('option');
        option.value = nomina.nombreEmpleado; // o empleado.idEmpleado si manejas un ID
        option.textContent = nomina.nombreEmpleado;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar empleados:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los empleados.',
        confirmButtonColor: '#dc3545'
      });
    });
}

function obtenerSiguienteIdEgreso(categoria) {
  let url = "";

  if (categoria === "local") {
    url = "http://localhost:8282/egresoPagoLocal/nextId";
  } else if (categoria === "nomina") {
    url = "http://localhost:8282/egresoPagoNomina/nextId";
  } else {
    document.getElementById('idEgreso').textContent = "Selecciona una categoría";
    return;
  }

  axios.get(url)
    .then(response => {
      const nextId = response.data;
      document.getElementById('idEgreso').textContent = nextId;
    })
    .catch(error => {
      console.error('Error al obtener el siguiente ID de egreso:', error);
      document.getElementById('idEgreso').textContent = 'Error';
    });
}

document.addEventListener("DOMContentLoaded", function () {
	cargarEmpleados();
  const botonRegistrar = document.querySelector(".registrar");

  // Obtener ID inicial al cargar
  const categoriaInicial = document.getElementById("categoria").value;
  obtenerSiguienteIdEgreso(categoriaInicial);

  // Actualizar ID dinámicamente cuando cambia la categoría
  document.getElementById("categoria").addEventListener("change", function () {
    const nuevaCategoria = this.value;
    obtenerSiguienteIdEgreso(nuevaCategoria);
  });

  botonRegistrar.addEventListener("click", function (event) {
    event.preventDefault();

    const categoria = document.getElementById("categoria").value;

    if (categoria === "local") {
      const egresoLocal = {
		
        fechaEgreso: document.getElementById("fechaEgreso").value,
        valor: document.getElementById("valorEgreso").value,
        categoria: categoria,
        metodoPago: document.getElementById("metodoPago").value,
        concepto: document.getElementById("concepto").value,
        estadoPago: document.getElementById("estadoPago").value,
        numeroFactura: document.getElementById("numeroFactura").value,
        periodo: document.getElementById("periodo").value,
      };
	  console.log("Fecha capturada:", egresoLocal.fecha);

      axios.post("http://localhost:8282/egresoPagoLocal/saveEgresoPagoLocal", egresoLocal)
        .then(response => {
          alert("Egreso local registrado correctamente");
          console.log("Respuesta:", response.data);
          window.location.href = "mostrarEgresos.html";
        })
        .catch(error => {
          console.error("Error al registrar egreso local:", error);
          alert("Error al registrar egreso local");
        });

    } else if (categoria === "nomina") {
      const egresoNomina = {
        fechaEgreso: document.getElementById("fechaEgreso").value,
        valor: document.getElementById("valorEgreso").value,
        categoria: categoria,
        metodoPago: document.getElementById("metodoPago").value,
        empleado: document.getElementById("empleado").value,
        cargo: document.getElementById("cargo").value,
        correo: document.getElementById("correo").value,
        periodoTrabajado: document.getElementById("periodoTrabajado").value,
        sueldoBase: document.getElementById("sueldoBase").value,
        deducciones: document.getElementById("deducciones").value,
        subsidios: document.getElementById("subsidios").value,
        horasExtra: document.getElementById("horasExtra").value,
        netoPagado: document.getElementById("netoPagado").value,
      };

      axios.post("http://localhost:8282/egresoPagoNomina/saveEgresoPagoNomina", egresoNomina)
        .then(response => {
          alert("Egreso nómina registrado correctamente");
          console.log("Respuesta:", response.data);
          window.location.href = "mostrarEgresos.html";
        })
        .catch(error => {
          console.error("Error al registrar egreso nómina:", error);
          alert("Error al registrar egreso nómina");
        });

    } else {
      alert("Por favor selecciona una categoría de egreso.");
    }
  });
});
