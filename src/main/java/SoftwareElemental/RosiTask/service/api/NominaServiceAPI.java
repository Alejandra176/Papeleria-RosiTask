package SoftwareElemental.RosiTask.service.api;

import SoftwareElemental.RosiTaskProject.entity.Nomina;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceAPI;

public interface NominaServiceAPI extends GenericServiceAPI<Nomina, Long> {

	boolean existsByNumeroDocumento(String numeroDocumento);
	boolean existsByTelefono(String telefono);
	boolean existsByCorreo(String correo);

	//  Cambia Long por Integer
	boolean existsByNumeroDocumentoAndIdEmpleadoNot(String numeroDocumento, Integer idEmpleado);
	boolean existsByTelefonoAndIdEmpleadoNot(String telefono, Integer idEmpleado);
	boolean existsByCorreoAndIdEmpleadoNot(String correo, Integer idEmpleado);

}
