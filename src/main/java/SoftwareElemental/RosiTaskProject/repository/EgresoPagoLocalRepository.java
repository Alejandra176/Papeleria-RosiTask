package SoftwareElemental.RosiTaskProject.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import SoftwareElemental.RosiTaskProject.entity.EgresoPagoLocal;

public interface EgresoPagoLocalRepository extends CrudRepository<EgresoPagoLocal, Long>{
	
	List<EgresoPagoLocal> findByFechaEgresoBetween(LocalDate startDate, LocalDate endDate);

}
