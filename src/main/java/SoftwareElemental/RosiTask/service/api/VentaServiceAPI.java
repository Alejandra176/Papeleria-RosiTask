package SoftwareElemental.RosiTask.service.api;


import java.time.LocalDate;
import java.util.List;

import SoftwareElemental.RosiTaskProject.entity.Venta;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceAPI;


public interface VentaServiceAPI extends GenericServiceAPI<Venta, Long>{
    
	List<Venta> findByFechaVentaBetween(LocalDate startDate, LocalDate endDate);
	
	List<Venta> obtenerVentasPorRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin);
    List<Venta> obtenerTodasLasVentas();
	
}

