package SoftwareElemental.RosiTaskProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import SoftwareElemental.RosiTask.service.api.ProveedorServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Producto;
import SoftwareElemental.RosiTaskProject.entity.Proveedor;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

@RestController
@RequestMapping("/proveedor")
public class ProveedorRestController {

	@Autowired
	private ProveedorServiceAPI proveedorServiceAPI;

	@GetMapping(value = "/getAll")
	public List<Proveedor> getAll() {
		return proveedorServiceAPI.getAll();
	}

	@PostMapping(value = "/saveProveedor")
	public ResponseEntity<Proveedor> save(@RequestBody Proveedor proveedor) {
		Proveedor obj = proveedorServiceAPI.save(proveedor);
		return new ResponseEntity<Proveedor>(obj, HttpStatus.OK); // 200
	}

	@GetMapping(value = "/findRecord/{id}")
	public ResponseEntity<Proveedor> getProveedorById(@PathVariable Long id) throws ResourceNotFoundException {
		Proveedor proveedor = proveedorServiceAPI.get(id);
		if (proveedor == null) {
			throw new ResourceNotFoundException("Record not found for <Proveedor>" + id);
		}
		return ResponseEntity.ok().body(proveedor);
	}

	@DeleteMapping(value = "/deleteProveedor/{id}")
	public ResponseEntity<Proveedor> delete(@PathVariable Long id) {
		Proveedor proveedor = proveedorServiceAPI.get(id);
		if (proveedor != null) {
			proveedorServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Proveedor>(proveedor, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Proveedor>(proveedor, HttpStatus.OK);
	}

}
