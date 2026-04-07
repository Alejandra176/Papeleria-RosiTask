package SoftwareElemental.RosiTaskProject.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.NominaServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Nomina;
import SoftwareElemental.RosiTaskProject.repository.NominaRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;

@Service
public class NominaServiceImpl extends GenericServiceImpl<Nomina, Long> implements NominaServiceAPI   {

	@Autowired
	private NominaRepository nominaRepository;
	
	@Override
	public CrudRepository<Nomina, Long> getDao() {
		return nominaRepository;
	}
	@Override
    public boolean existsByNumeroDocumento(String numeroDocumento) {
        return nominaRepository.existsByNumeroDocumento(numeroDocumento);
    }

	 @Override
	    public boolean existsByTelefono(String telefono) {
	        return nominaRepository.existsByTelefono(telefono);
	    }
	 
	 @Override
	    public boolean existsByCorreo(String correo) {
	        return nominaRepository.existsByCorreo(correo);
	    }
	 @Override
	    public boolean existsByNumeroDocumentoAndIdEmpleadoNot(String numeroDocumento, Integer idEmpleado) {
	        return nominaRepository.existsByNumeroDocumentoAndIdEmpleadoNot(numeroDocumento, idEmpleado);
	    }
	 
	 @Override
	    public boolean existsByTelefonoAndIdEmpleadoNot(String telefono, Integer idEmpleado) {
	        return nominaRepository.existsByTelefonoAndIdEmpleadoNot(telefono, idEmpleado);
	    }

	    @Override
	    public boolean existsByCorreoAndIdEmpleadoNot(String correo, Integer idEmpleado) {
	        return nominaRepository.existsByCorreoAndIdEmpleadoNot(correo, idEmpleado);
	    }
	    
}
