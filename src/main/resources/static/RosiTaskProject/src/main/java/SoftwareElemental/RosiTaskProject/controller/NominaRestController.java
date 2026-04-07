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

import SoftwareElemental.RosiTask.service.api.NominaServiceAPI;
import SoftwareElemental.RosiTask.service.api.ProductoServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Nomina;
import SoftwareElemental.RosiTaskProject.entity.Producto;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/nomina")

public class NominaRestController {
	
	@Autowired
	private NominaServiceAPI nominaServiceAPI;

	@GetMapping(value = "/getAll")
	public List<Nomina> getAll() {
		return nominaServiceAPI.getAll();
	}
	
	@PostMapping(value = "/saveNomina")
	public ResponseEntity<Nomina> save(@RequestBody Nomina nomina) {
		Nomina obj = nominaServiceAPI.save(nomina);
		return new ResponseEntity<Nomina>(obj, HttpStatus.OK); // 200
	}
	
	@GetMapping(value = "/findRecord/{id}")
	public ResponseEntity<Nomina> getEmpleadoById(@PathVariable Long id) throws ResourceNotFoundException {
		Nomina nomina = nominaServiceAPI.get(id);
		if (nomina == null) {
			throw new ResourceNotFoundException("Record not found for <Producto>" + id);
		}
		return ResponseEntity.ok().body(nomina);
	}
	
	@DeleteMapping(value = "/deleteNomina/{id}")
	public ResponseEntity<Nomina> delete(@PathVariable Long id) {
		Nomina nomina = nominaServiceAPI.get(id);
		if (nomina != null) {
			nominaServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Nomina>(nomina, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Nomina>(nomina, HttpStatus.OK);
	}
	
	
}
