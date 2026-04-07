package SoftwareElemental.RosiTaskProject.service.Impl;


import SoftwareElemental.RosiTaskProject.entity.Venta;
import SoftwareElemental.RosiTaskProject.repository.VentaRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;
import SoftwareElemental.RosiTask.service.api.VentaServiceAPI;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;



@Service
public class VentaServiceImpl extends GenericServiceImpl<Venta, Long>  implements VentaServiceAPI {

	@Autowired
	private VentaRepository ventaRepository;

	@Override
	public CrudRepository<Venta, Long> getDao() {
		return ventaRepository;
	}
	
	@Override
	public List<Venta> findByFechaVentaBetween(LocalDate startDate, LocalDate endDate) {
	    return ventaRepository.findByFechaVentaBetween(startDate, endDate);
	}
	
	@Override
	public List<Venta> obtenerVentasPorRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin) {
	    return ventaRepository.findByFechaVentaBetween(fechaInicio, fechaFin);
	}

	@Override
	public List<Venta> obtenerTodasLasVentas() {
	    return (List<Venta>) ventaRepository.findAll();
	}
}

