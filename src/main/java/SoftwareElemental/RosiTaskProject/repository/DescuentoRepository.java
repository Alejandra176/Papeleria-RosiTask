package SoftwareElemental.RosiTaskProject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import SoftwareElemental.RosiTaskProject.entity.Descuento;

@Repository
public interface DescuentoRepository extends CrudRepository<Descuento, Long> {

	boolean existsByNombreDescu(String nombre);
	
	// 👇 Métodos nuevos que excluyen por ID
	boolean existsByNombreDescuAndIdDescuentoNot(String nombre, Integer idDescuento);
}

