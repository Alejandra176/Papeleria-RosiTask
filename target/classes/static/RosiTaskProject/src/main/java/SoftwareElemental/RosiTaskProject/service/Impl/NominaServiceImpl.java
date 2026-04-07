package SoftwareElemental.RosiTaskProject.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.NominaServiceAPI;
import SoftwareElemental.RosiTask.service.api.ProductoServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Nomina;
import SoftwareElemental.RosiTaskProject.entity.Producto;
import SoftwareElemental.RosiTaskProject.repository.NominaRepository;
import SoftwareElemental.RosiTaskProject.repository.ProductoRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;

@Service
public class NominaServiceImpl extends GenericServiceImpl<Nomina, Long> implements NominaServiceAPI {
	
	@Autowired
	private NominaRepository nominaRepository;
	
	@Override
	public CrudRepository<Nomina, Long> getDao() {
		return nominaRepository;
	}
}
