package SoftwareElemental.RosiTaskProject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import SoftwareElemental.RosiTaskProject.entity.Pedido;

@Repository
public interface PedidoRepository extends CrudRepository<Pedido, Long> {

}
