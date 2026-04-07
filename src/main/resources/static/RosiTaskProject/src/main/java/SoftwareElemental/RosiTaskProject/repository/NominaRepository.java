package SoftwareElemental.RosiTaskProject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import SoftwareElemental.RosiTaskProject.entity.Nomina;
import SoftwareElemental.RosiTaskProject.entity.Producto;

@Repository
public interface NominaRepository extends CrudRepository<Nomina, Long> {

}
