package SoftwareElemental.RosiTaskProject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import SoftwareElemental.RosiTaskProject.entity.Proveedor;

@Repository
public interface ProveedorRepository extends CrudRepository<Proveedor, Long> {
	
	 boolean existsByNombreProveedor(String nombre);
	    boolean existsByNumeroDocumento(String numeroDocumento);
	    boolean existsByTelefono(String telefono);
	    boolean existsByCorreo(String correo);

	    // 👇 Métodos nuevos que excluyen por ID
	    boolean existsByNombreProveedorAndIdProveedorNot(String nombre, Integer idProveedor);
	    boolean existsByNumeroDocumentoAndIdProveedorNot(String numeroDocumento, Integer idProveedor);
	    boolean existsByTelefonoAndIdProveedorNot(String telefono, Integer idProveedor);
	    boolean existsByCorreoAndIdProveedorNot(String correo, Integer idProveedor);
}
