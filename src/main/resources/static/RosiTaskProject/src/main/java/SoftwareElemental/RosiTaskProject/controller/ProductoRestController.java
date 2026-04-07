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

import SoftwareElemental.RosiTask.service.api.ProductoServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Producto;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/producto")
public class ProductoRestController {

	@Autowired
	private ProductoServiceAPI productoServiceAPI;

	@GetMapping(value = "/getAll")
	public List<Producto> getAll() {
		return productoServiceAPI.getAll();
	}

	@PostMapping(value = "/saveProducto")
	public ResponseEntity<Producto> save(@RequestBody Producto producto) {
		Producto obj = productoServiceAPI.save(producto);
		return new ResponseEntity<Producto>(obj, HttpStatus.OK); // 200
	}

	@GetMapping(value = "/findRecord/{id}")
	public ResponseEntity<Producto> getProductoById(@PathVariable Long id) throws ResourceNotFoundException {
		Producto producto = productoServiceAPI.get(id);
		if (producto == null) {
			throw new ResourceNotFoundException("Record not found for <Producto>" + id);
		}
		return ResponseEntity.ok().body(producto);
	}

	@DeleteMapping(value = "/deleteProducto/{id}")
	public ResponseEntity<Producto> delete(@PathVariable Long id) {
		Producto producto = productoServiceAPI.get(id);
		if (producto != null) {
			productoServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Producto>(producto, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Producto>(producto, HttpStatus.OK);
	}

}
