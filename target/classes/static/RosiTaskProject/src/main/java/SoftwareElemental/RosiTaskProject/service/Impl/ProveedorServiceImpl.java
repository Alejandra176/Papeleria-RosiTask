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
}
