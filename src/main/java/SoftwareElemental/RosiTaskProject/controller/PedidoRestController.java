package SoftwareElemental.RosiTaskProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import SoftwareElemental.RosiTask.service.api.PedidoServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Pedido;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/pedido")
public class PedidoRestController {

	@Autowired
	private PedidoServiceAPI pedidoServiceAPI;

	@GetMapping(value = "/getAll")
	public List<Pedido> getAll() {
		return pedidoServiceAPI.getAll();
	}

	// 🚨 Cambiado: usamos el método que fija la fecha automáticamente
	@PostMapping(value = "/savePedido")
	public ResponseEntity<Pedido> save(@RequestBody Pedido pedido) {
		Pedido obj = pedidoServiceAPI.savePedidoPersonalizado(pedido);
		return new ResponseEntity<Pedido>(obj, HttpStatus.OK); // 200
	}

	@GetMapping(value = "/findRecord/{id}")
	public ResponseEntity<Pedido> getPedidoById(@PathVariable Long id) throws ResourceNotFoundException {
		Pedido pedido = pedidoServiceAPI.get(id);
		if (pedido == null) {
			throw new ResourceNotFoundException("Record not found for <Pedido>" + id);
		}
		return ResponseEntity.ok().body(pedido);
	}

	@DeleteMapping(value = "/deletePedido/{id}")
	public ResponseEntity<Pedido> delete(@PathVariable Long id) {
		Pedido pedido = pedidoServiceAPI.get(id);
		if (pedido != null) {
			pedidoServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Pedido>(pedido, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Pedido>(pedido, HttpStatus.OK);
	}
}
