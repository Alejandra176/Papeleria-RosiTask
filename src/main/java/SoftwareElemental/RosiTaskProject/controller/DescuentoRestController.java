package SoftwareElemental.RosiTaskProject.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import SoftwareElemental.RosiTask.service.api.DescuentoServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Descuento;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/descuento")
public class DescuentoRestController {

	@Autowired
	private DescuentoServiceAPI descuentoServiceAPI;

	@GetMapping(value = "/getAll")
	public List<Descuento> getAll() {
		return descuentoServiceAPI.getAll();
	}

	@PostMapping(value = "/saveDescuento")
	public ResponseEntity<Descuento> save(@RequestBody Descuento descuento) {
		Descuento obj = descuentoServiceAPI.save(descuento);
		return new ResponseEntity<Descuento>(obj, HttpStatus.OK); // 200
	}

	@GetMapping(value = "/findRecord/{id}")
	public ResponseEntity<Descuento> getDescuentoById(@PathVariable Long id) throws ResourceNotFoundException {
		Descuento descuento = descuentoServiceAPI.get(id);
		if (descuento == null) {
			throw new ResourceNotFoundException("Record not found for <Descuento>" + id);
		}
		return ResponseEntity.ok().body(descuento);
	}

	@DeleteMapping(value = "/deleteDescuento/{id}")
	public ResponseEntity<Descuento> delete(@PathVariable Long id) {
		Descuento descuento = descuentoServiceAPI.get(id);
		if (descuento != null) {
			descuentoServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Descuento>(descuento, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Descuento>(descuento, HttpStatus.OK);
	}

	// ✅ NUEVO ENDPOINT: Buscar descuento por nombre
	@GetMapping("/existeNombre/{nombre}")
	public ResponseEntity<Boolean> existeNombre(@PathVariable String nombre) {
	    return ResponseEntity.ok(descuentoServiceAPI.existsByNombreDescu(nombre));
	}
	
	@PostMapping("/validar")
	public ResponseEntity<Map<String, Boolean>> validarDuplicados(@RequestBody Descuento descuento) {
	    Map<String, Boolean> resultado = new HashMap<>();

	    Integer id = descuento.getIdDescuento(); // Puede ser null si es un nuevo proveedor

	    if (id != null) {
	        // Edición: ignora el mismo proveedor
	        resultado.put("nombreExistente", descuentoServiceAPI.existsByNombreDescuAndIdDescuentoNot(descuento.getNombreDescu(), id));
	    } else {
	        // Nuevo proveedor
	        resultado.put("nombreExistente", descuentoServiceAPI.existsByNombreDescu(descuento.getNombreDescu()));
	        
	    }

	    return ResponseEntity.ok(resultado);
	}
}

