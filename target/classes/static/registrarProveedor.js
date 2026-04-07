document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector(".formulario");

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errores = [];

    const nombreProveedor = document.getElementById("nombre").value.trim();
    const tipoDocumento = document.getElementById("tipoDocumento").value;
    const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fechaRegistro = document.getElementById("fechaIngreso").value;
    const observacion = document.getElementById("observaciones").value.trim();

    // VALIDACIONES DE FORMATO Y LONGITUD
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
        default:
          errores.push("Tipo de documento inválido.");
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

    // MOSTRAR ERRORES DE FORMATO
    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Errores en el formulario",
        html: "<ul style='text-align: left;'>" + errores.map(err => `<li>${err}</li>`).join("") + "</ul>",
        confirmButtonText: "Entendido"
      });
      return;
    }

    // VALIDAR DUPLICADOS ANTES DE ENVIAR
    try {
      const validacion = await axios.post("http://localhost:8282/proveedor/validar", {
        nombreProveedor,
        numeroDocumento,
        telefono,
        correo
      });

      const duplicados = [];

      if (validacion.data.nombreExistente) {
        duplicados.push("Ya existe un proveedor con ese nombre.");
      }
      if (validacion.data.numeroDocumentoExistente) {
        duplicados.push("Ya existe un proveedor con ese número de documento.");
      }
      if (validacion.data.telefonoExistente) {
        duplicados.push("Ya existe un proveedor con ese número de teléfono.");
      }
      if (validacion.data.correoExistente) {
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

      // Enviar el proveedor si todo está bien
      const proveedor = {
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
          title: "¡Proveedor registrado!",
          text: "El proveedor fue guardado correctamente.",
          confirmButtonText: "Aceptar"
        }).then(() => {
          formulario.reset();
          window.location.href = "mostrarProveedores.html";
        });
      }
    } catch (error) {
      console.error("Error al validar o registrar el proveedor:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al registrar el proveedor.",
        confirmButtonText: "Aceptar"
      });
    }
  });
});
