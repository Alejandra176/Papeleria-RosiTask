package SoftwareElemental.RosiTaskProject.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.PromocionServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Promocion;
import SoftwareElemental.RosiTaskProject.repository.PromocionRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;

@Service
public class PromocionServiceImpl extends GenericServiceImpl<Promocion, Long> implements PromocionServiceAPI {
	
	@Autowired
	private PromocionRepository promocionRepository;

	@Override
	public CrudRepository<Promocion, Long> getDao() {
		return promocionRepository;
	}

}