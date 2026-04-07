package SoftwareElemental.RosiTaskProject.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.DescuentoServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Descuento;
import SoftwareElemental.RosiTaskProject.repository.DescuentoRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;

@Service
public class DescuentoServiceImpl extends GenericServiceImpl<Descuento, Long> implements DescuentoServiceAPI {

	@Autowired
	private DescuentoRepository descuentoRepository;

	@Override
	public CrudRepository<Descuento, Long> getDao() {
		return descuentoRepository;
	}

	@Override
    public boolean existsByNombreDescu(String nombre) {
        return descuentoRepository.existsByNombreDescu(nombre);
    }
	
	 @Override
	    public boolean existsByNombreDescuAndIdDescuentoNot(String nombre, Integer idDescuento) {
	        return descuentoRepository.existsByNombreDescuAndIdDescuentoNot(nombre, idDescuento);
	    }

}

