package SoftwareElemental.RosiTask.service.api;

import SoftwareElemental.RosiTaskProject.entity.Pedido;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceAPI;

public interface PedidoServiceAPI extends GenericServiceAPI<Pedido, Long> {

	// Nuevo método para guardar con la fecha actual
    Pedido savePedidoPersonalizado(Pedido pedido);
}
