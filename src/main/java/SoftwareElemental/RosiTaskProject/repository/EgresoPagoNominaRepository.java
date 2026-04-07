package SoftwareElemental.RosiTaskProject.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import SoftwareElemental.RosiTaskProject.entity.EgresoPagoNomina;

public interface EgresoPagoNominaRepository extends CrudRepository<EgresoPagoNomina, Long>{

	List<EgresoPagoNomina> findByFechaEgresoBetween(LocalDate startDate, LocalDate endDate);
	
}
