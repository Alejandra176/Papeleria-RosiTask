package SoftwareElemental.RosiTaskProject.service.Impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.EgresoPagoNominaServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.EgresoPagoNomina;
import SoftwareElemental.RosiTaskProject.repository.EgresoPagoNominaRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;


@Service
public class EgresoPagoNominaServiceImpl extends GenericServiceImpl<EgresoPagoNomina, Long> implements EgresoPagoNominaServiceAPI {

	
	@Autowired
	private EgresoPagoNominaRepository egresoPagoNominaRepository;

	@Override
	public CrudRepository<EgresoPagoNomina, Long> getDao() {
		return egresoPagoNominaRepository;
	}

	@Override
	public List<EgresoPagoNomina> findByFechaEgresoNominaBetween(LocalDate startDate, LocalDate endDate) {
		return egresoPagoNominaRepository.findByFechaEgresoBetween(startDate, endDate);
	}

	@Override
	public List<EgresoPagoNomina> obtenerEgresosNominaPorRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin) {
		return egresoPagoNominaRepository.findByFechaEgresoBetween(fechaInicio, fechaFin);
	}

	@Override
	public List<EgresoPagoNomina> obtenerTodasLosEgresosNomina() {
		return (List<EgresoPagoNomina>) egresoPagoNominaRepository.findAll();
	}
	
}
