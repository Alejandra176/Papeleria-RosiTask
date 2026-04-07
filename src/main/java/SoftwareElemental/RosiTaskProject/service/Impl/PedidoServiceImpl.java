package SoftwareElemental.RosiTaskProject.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import SoftwareElemental.RosiTask.service.api.PedidoServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Pedido;
import SoftwareElemental.RosiTaskProject.repository.PedidoRepository;
import SoftwareEmelental.RosiTaskProject.utils.GenericServiceImpl;

@Service
public class PedidoServiceImpl extends GenericServiceImpl<Pedido, Long> implements PedidoServiceAPI {

	@Autowired
	private PedidoRepository pedidoRepository;

	@Override
	public CrudRepository<Pedido, Long> getDao() {
		return pedidoRepository;
	}

	// Método personalizado para establecer la fecha del sistema
	@Override
	public Pedido savePedidoPersonalizado(Pedido pedido) {
		pedido.setFechaPedido(new java.sql.Date(System.currentTimeMillis())); // Fecha actual del sistema
		return pedidoRepository.save(pedido);
	}
}
