package SoftwareElemental.RosiTaskProject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import SoftwareElemental.RosiTaskProject.entity.Nomina;

@Repository
public interface NominaRepository extends CrudRepository<Nomina, Long>{

	boolean existsByNumeroDocumento(String numeroDocumento);
	boolean existsByTelefono(String telefono);
	boolean existsByCorreo(String correo);

	//  Cambia Long por Integer
	boolean existsByNumeroDocumentoAndIdEmpleadoNot(String numeroDocumento, Integer idEmpleado);
	boolean existsByTelefonoAndIdEmpleadoNot(String telefono, Integer idEmpleado);
	boolean existsByCorreoAndIdEmpleadoNot(String correo, Integer idEmpleado);

}
