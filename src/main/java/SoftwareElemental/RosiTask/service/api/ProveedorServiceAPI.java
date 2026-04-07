package SoftwareElemental.RosiTask.service.api;

import SoftwareElemental.RosiTaskProject.entity.Proveedor;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceAPI;

public interface ProveedorServiceAPI extends GenericServiceAPI<Proveedor, Long> {

	 boolean existsByNombreProveedor(String nombre);
	    boolean existsByNumeroDocumento(String numeroDocumento);
	    boolean existsByTelefono(String telefono);
	    boolean existsByCorreo(String correo);

	    // 👇 Cambia Long por Integer
	    boolean existsByNombreProveedorAndIdProveedorNot(String nombre, Integer idProveedor);
	    boolean existsByNumeroDocumentoAndIdProveedorNot(String numeroDocumento, Integer idProveedor);
	    boolean existsByTelefonoAndIdProveedorNot(String telefono, Integer idProveedor);
	    boolean existsByCorreoAndIdProveedorNot(String correo, Integer idProveedor);
	    
}
