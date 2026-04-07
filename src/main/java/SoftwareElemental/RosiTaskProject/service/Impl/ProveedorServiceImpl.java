package SoftwareElemental.RosiTaskProject.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.ProveedorServiceAPI;

import SoftwareElemental.RosiTaskProject.entity.Proveedor;
import SoftwareElemental.RosiTaskProject.repository.ProveedorRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;

@Service
public class ProveedorServiceImpl extends GenericServiceImpl<Proveedor, Long> implements ProveedorServiceAPI {

	@Autowired
	private ProveedorRepository proveedorRepository;

	@Override
	public CrudRepository<Proveedor, Long> getDao() {
		return proveedorRepository;
	}
	
	 @Override
	    public boolean existsByNombreProveedor(String nombre) {
	        return proveedorRepository.existsByNombreProveedor(nombre);
	    }

	    @Override
	    public boolean existsByNumeroDocumento(String numeroDocumento) {
	        return proveedorRepository.existsByNumeroDocumento(numeroDocumento);
	    }

	    @Override
	    public boolean existsByTelefono(String telefono) {
	        return proveedorRepository.existsByTelefono(telefono);
	    }

	    @Override
	    public boolean existsByCorreo(String correo) {
	        return proveedorRepository.existsByCorreo(correo);
	    }
	    
	    @Override
	    public boolean existsByNombreProveedorAndIdProveedorNot(String nombre, Integer idProveedor) {
	        return proveedorRepository.existsByNombreProveedorAndIdProveedorNot(nombre, idProveedor);
	    }

	    @Override
	    public boolean existsByNumeroDocumentoAndIdProveedorNot(String numeroDocumento, Integer idProveedor) {
	        return proveedorRepository.existsByNumeroDocumentoAndIdProveedorNot(numeroDocumento, idProveedor);
	    }

	    @Override
	    public boolean existsByTelefonoAndIdProveedorNot(String telefono, Integer idProveedor) {
	        return proveedorRepository.existsByTelefonoAndIdProveedorNot(telefono, idProveedor);
	    }

	    @Override
	    public boolean existsByCorreoAndIdProveedorNot(String correo, Integer idProveedor) {
	        return proveedorRepository.existsByCorreoAndIdProveedorNot(correo, idProveedor);
	    }
	    
}
