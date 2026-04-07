// Este script obtiene el ID del proveedor desde la URL y lo usa para buscar los detalles
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("ID de proveedor no especificado");
    return;
  }

  axios.get(`http://localhost:8282/proveedor/findRecord/${id}`)
    .then(function (response) {
      const proveedor = response.data;

      // Inserta los datos en los elementos correspondientes de la página
      document.getElementById("idProveedor").textContent = proveedor.idProveedor;
      document.getElementById("nombreProveedor").textContent = proveedor.nombreProveedor;
      document.getElementById("telefono").textContent = proveedor.telefono;
      document.getElementById("correo").textContent = proveedor.correo;
      document.getElementById("direccion").textContent = proveedor.direccion;
      document.getElementById("ciudad").textContent = proveedor.ciudad;
      document.getElementById("tipoDocumento").textContent = proveedor.tipoDocumento;
      document.getElementById("numeroDocumento").textContent = proveedor.numeroDocumento;
      document.getElementById("fechaRegistro").textContent = proveedor.fechaRegistro;
      document.getElementById("observacion").textContent = proveedor.observacion;
    })
    .catch(function (error) {
      console.error("Error al obtener el proveedor:", error);
      alert("Error al cargar los detalles del proveedor.");
    });
});
