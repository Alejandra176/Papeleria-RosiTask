package SoftwareElemental.RosiTask.service.api;

import java.time.LocalDate;
import java.util.List;

import SoftwareElemental.RosiTaskProject.entity.EgresoPagoLocal;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceAPI;

public interface EgresoPagoLocalServiceAPI extends GenericServiceAPI<EgresoPagoLocal, Long>{

	List<EgresoPagoLocal> findByFechaEgresoLocalBetween(LocalDate startDate, LocalDate endDate);
	
	List<EgresoPagoLocal> obtenerEgresosLocalPorRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin);
    List<EgresoPagoLocal> obtenerTodasLosEgresosLocal();
	
}
