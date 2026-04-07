package SoftwareElemental.RosiTaskProject.service.Impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.EgresoPagoLocalServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.EgresoPagoLocal;
import SoftwareElemental.RosiTaskProject.repository.EgresoPagoLocalRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;


@Service
public class EgresoPagoLocalServiceImpl extends GenericServiceImpl<EgresoPagoLocal, Long> implements EgresoPagoLocalServiceAPI {

	@Autowired
	private EgresoPagoLocalRepository egresoPagoLocalRepository;

	@Override
	public CrudRepository<EgresoPagoLocal, Long> getDao() {
		return egresoPagoLocalRepository;
	}

	@Override
	public List<EgresoPagoLocal> findByFechaEgresoLocalBetween(LocalDate startDate, LocalDate endDate) {
		return egresoPagoLocalRepository.findByFechaEgresoBetween(startDate, endDate);
	}

	@Override
	public List<EgresoPagoLocal> obtenerEgresosLocalPorRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin) {
		return egresoPagoLocalRepository.findByFechaEgresoBetween(fechaInicio, fechaFin);
	}

	@Override
	public List<EgresoPagoLocal> obtenerTodasLosEgresosLocal() {
		return (List<EgresoPagoLocal>) egresoPagoLocalRepository.findAll();
	}
	
}
