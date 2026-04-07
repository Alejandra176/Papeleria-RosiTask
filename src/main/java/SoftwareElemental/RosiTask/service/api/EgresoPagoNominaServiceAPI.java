package SoftwareElemental.RosiTask.service.api;

import java.time.LocalDate;
import java.util.List;

import SoftwareElemental.RosiTaskProject.entity.EgresoPagoNomina;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceAPI;

public interface EgresoPagoNominaServiceAPI extends GenericServiceAPI<EgresoPagoNomina, Long>{

	List<EgresoPagoNomina> findByFechaEgresoNominaBetween(LocalDate startDate, LocalDate endDate);
	
	List<EgresoPagoNomina> obtenerEgresosNominaPorRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin);
    List<EgresoPagoNomina> obtenerTodasLosEgresosNomina();
	
}
