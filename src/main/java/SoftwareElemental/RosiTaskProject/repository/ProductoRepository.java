package SoftwareElemental.RosiTaskProject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import SoftwareElemental.RosiTaskProject.entity.Producto;

@Repository
public interface ProductoRepository extends CrudRepository<Producto, Long> {

	boolean existsByNombreProductoIgnoreCase(String nombreProducto);

	
}
