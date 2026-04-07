let datosOriginales = {}; // ← Almacena los datos originales para comparar después

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector(".formulario");

  const obtenerParametroId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

  const cargarProveedor = async () => {
    const id = obtenerParametroId();
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se proporcionó el ID del proveedor.",
      });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8282/proveedor/findRecord/${id}`);
      const proveedor = response.data;

      // Rellenar campos del formulario
      document.getElementById("idProveedor").value = proveedor.idProveedor;
      document.getElementById("nombreProveedor").value = proveedor.nombreProveedor;
      document.getElementById("tipoDocumento").value = proveedor.tipoDocumento;
      document.getElementById("numeroDocumento").value = proveedor.numeroDocumento;
      document.getElementById("ciudad").value = proveedor.ciudad;
      document.getElementById("direccion").value = proveedor.direccion;
      document.getElementById("telefono").value = proveedor.telefono;
      document.getElementById("correo").value = proveedor.correo;
      document.getElementById("fechaRegistro").value = proveedor.fechaRegistro;
      document.getElementById("observacion").value = proveedor.observacion;

      // Guardar datos originales para verificar cambios
      datosOriginales = {
        nombreProveedor: proveedor.nombreProveedor,
        tipoDocumento: proveedor.tipoDocumento,
        numeroDocumento: proveedor.numeroDocumento,
        ciudad: proveedor.ciudad,
        direccion: proveedor.direccion,
        telefono: proveedor.telefono,
        correo: proveedor.correo,
        fechaRegistro: proveedor.fechaRegistro,
        observacion: proveedor.observacion
      };
    } catch (error) {
      console.error("Error al obtener el proveedor:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar la información del proveedor.",
      });
    }
  };

  cargarProveedor(); // Ejecutar al cargar la página

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errores = [];

    const idProveedor = document.getElementById("idProveedor").value;
    const nombreProveedor = document.getElementById("nombreProveedor").value.trim();
    const tipoDocumento = document.getElementById("tipoDocumento").value;
    const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fechaRegistro = document.getElementById("fechaRegistro").value;
    const observacion = document.getElementById("observacion").value.trim();

    // Validaciones
    if (nombreProveedor.length < 2) {
      errores.push("El nombre del proveedor debe tener al menos 2 caracteres.");
    }

    if (!["Cédula", "NIT", "Pasaporte"].includes(tipoDocumento)) {
      errores.push("Debe seleccionar un tipo de documento válido.");
    }

    if (numeroDocumento === "") {
      errores.push("Debe ingresar un número de documento.");
    } else {
      switch (tipoDocumento) {
        case "Cédula":
          if (!/^\d{6,10}$/.test(numeroDocumento)) {
            errores.push("La cédula debe tener entre 6 y 10 dígitos numéricos.");
          }
          break;
        case "NIT":
          if (!/^\d{9,10}$/.test(numeroDocumento)) {
            errores.push("El NIT debe tener 9 o 10 dígitos numéricos.");
          }
          break;
        case "Pasaporte":
          if (!/^[A-Za-z0-9]{6,12}$/.test(numeroDocumento)) {
            errores.push("El pasaporte debe ser alfanumérico y tener entre 6 y 12 caracteres.");
          }
          break;
      }
    }

    if (ciudad.length < 3) {
      errores.push("La ciudad debe tener al menos 3 caracteres.");
    }

    if (direccion.length < 3) {
      errores.push("La dirección debe tener al menos 3 caracteres.");
    }

    if (!/^\d{7,10}$/.test(telefono)) {
      errores.push("El teléfono debe tener entre 7 y 10 dígitos numéricos.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      errores.push("Debe ingresar un correo válido.");
    }

    if (!fechaRegistro) {
      errores.push("Debe ingresar la fecha de registro.");
    } else {
      const hoy = new Date().toISOString().split("T")[0];
      if (fechaRegistro > hoy) {
        errores.push("La fecha no puede ser en el futuro.");
      }
    }

    if (observacion.length > 500) {
      errores.push("La observación no debe superar los 500 caracteres.");
    }

    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Errores en el formulario",
        html: "<ul style='text-align: left;'>" + errores.map(err => `<li>${err}</li>`).join("") + "</ul>",
        confirmButtonText: "Entendido"
      });
      return;
    }

    // Comprobar si hubo cambios
    const datosActuales = {
      nombreProveedor,
      tipoDocumento,
      numeroDocumento,
      ciudad,
      direccion,
      telefono,
      correo,
      fechaRegistro,
      observacion
    };

    const datosSinCambios = Object.keys(datosOriginales).every(
      clave => datosOriginales[clave] === datosActuales[clave]
    );

    if (datosSinCambios) {
      Swal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "No has realizado ninguna modificación.",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    // Validación de duplicados ajustada
    try {
      const validacion = await axios.post("http://localhost:8282/proveedor/validar", {
        idProveedor,
        nombreProveedor,
        numeroDocumento,
        telefono,
        correo
      });

      const duplicados = [];

      if (validacion.data.nombreExistente && nombreProveedor !== datosOriginales.nombreProveedor) {
        duplicados.push("Ya existe un proveedor con ese nombre.");
      }
      if (validacion.data.numeroDocumentoExistente && numeroDocumento !== datosOriginales.numeroDocumento) {
        duplicados.push("Ya existe un proveedor con ese número de documento.");
      }
      if (validacion.data.telefonoExistente && telefono !== datosOriginales.telefono) {
        duplicados.push("Ya existe un proveedor con ese número de teléfono.");
      }
      if (validacion.data.correoExistente && correo !== datosOriginales.correo) {
        duplicados.push("Ya existe un proveedor con ese correo.");
      }

      if (duplicados.length > 0) {
        Swal.fire({
          icon: "warning",
          title: "Datos duplicados",
          html: "<ul style='text-align: left;'>" + duplicados.map(d => `<li>${d}</li>`).join("") + "</ul>",
          confirmButtonText: "Corregir"
        });
        return;
      }

      // Enviar datos actualizados
      const proveedor = {
        idProveedor,
        nombreProveedor,
        telefono,
        correo,
        direccion,
        ciudad,
        tipoDocumento,
        numeroDocumento,
        fechaRegistro,
        observacion
      };

      const response = await axios.post("http://localhost:8282/proveedor/saveProveedor", proveedor);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Proveedor actualizado!",
          text: "El proveedor fue actualizado correctamente.",
          confirmButtonText: "Aceptar"
        }).then(() => {
          window.location.href = "mostrarProveedores.html";
        });
      }
    } catch (error) {
      console.error("Error al validar o actualizar el proveedor:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al actualizar el proveedor.",
        confirmButtonText: "Aceptar"
      });
    }
  });
});
