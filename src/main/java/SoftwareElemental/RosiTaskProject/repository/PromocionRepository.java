package SoftwareElemental.RosiTaskProject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import SoftwareElemental.RosiTaskProject.entity.Promocion;

@Repository
public interface PromocionRepository extends CrudRepository<Promocion, Long> {

}