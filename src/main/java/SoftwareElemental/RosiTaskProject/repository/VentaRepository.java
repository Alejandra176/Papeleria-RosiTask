package SoftwareElemental.RosiTaskProject.repository;

import SoftwareElemental.RosiTaskProject.entity.Venta;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends CrudRepository<Venta, Long> {
    // Puedes agregar métodos personalizados si lo necesitas más adelante
	
	List<Venta> findByFechaVentaBetween(LocalDate startDate, LocalDate endDate);
	
}
