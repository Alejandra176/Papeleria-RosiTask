package SoftwareElemental.RosiTaskProject.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import SoftwareElemental.RosiTask.service.api.NominaServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Nomina;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

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
	public ResponseEntity<Nomina> getProductoById(@PathVariable Long id) throws ResourceNotFoundException {
		Nomina nomina = nominaServiceAPI.get(id);
		if (nomina == null) {
			throw new ResourceNotFoundException("Record not found for <Nomina>" + id);
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


	// NUEVAS FUNCIOES AGREGADAS PARA VALIDACIONES:
	
	// NominaRestController.java
	@GetMapping("/existeDocumento/{numeroDocumento}")
	public ResponseEntity<Boolean> existeDocumento(@PathVariable String numeroDocumento) {
	    return ResponseEntity.ok(nominaServiceAPI.existsByNumeroDocumento(numeroDocumento));
	}

	@GetMapping("/existeTelefono/{telefono}")
	public ResponseEntity<Boolean> existeTelefono(@PathVariable String telefono) {
	    return ResponseEntity.ok(nominaServiceAPI.existsByTelefono(telefono));
	}

	@GetMapping("/existeCorreo/{correo}")
	public ResponseEntity<Boolean> existeCorreo(@PathVariable String correo) {
	    return ResponseEntity.ok(nominaServiceAPI.existsByCorreo(correo));
	}
	
	@PostMapping("/validar")
	public ResponseEntity<Map<String, Boolean>> validarDuplicados(@RequestBody Nomina nomina) {
	    Map<String, Boolean> resultado = new HashMap<>();

	    Integer id = nomina.getIdEmpleado(); // Puede ser null si es un nuevo empleado

	    if (id != null) {
	        // Edición: ignora el mismo empleado
	        resultado.put("numeroDocumentoExistente", nominaServiceAPI.existsByNumeroDocumentoAndIdEmpleadoNot(nomina.getNumeroDocumento(), id));
	        resultado.put("telefonoExistente", nominaServiceAPI.existsByTelefonoAndIdEmpleadoNot(nomina.getTelefono(), id));
	        resultado.put("correoExistente", nominaServiceAPI.existsByCorreoAndIdEmpleadoNot(nomina.getCorreo(), id));
	    } else {
	        // Nuevo proveedor
	        resultado.put("numeroDocumentoExistente", nominaServiceAPI.existsByNumeroDocumento(nomina.getNumeroDocumento()));
	        resultado.put("telefonoExistente", nominaServiceAPI.existsByTelefono(nomina.getTelefono()));
	        resultado.put("correoExistente", nominaServiceAPI.existsByCorreo(nomina.getCorreo()));
	    }

	    return ResponseEntity.ok(resultado);
	}

}
