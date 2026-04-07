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

import SoftwareElemental.RosiTask.service.api.ProveedorServiceAPI;
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
	
	// NUEVAS FUNCIOES AGREGADAS PARA VALIDACIONES:
	
	// ProveedorRestController.java

	@GetMapping("/existeNombre/{nombre}")
	public ResponseEntity<Boolean> existeNombre(@PathVariable String nombre) {
	    return ResponseEntity.ok(proveedorServiceAPI.existsByNombreProveedor(nombre));
	}

	@GetMapping("/existeDocumento/{numeroDocumento}")
	public ResponseEntity<Boolean> existeDocumento(@PathVariable String numeroDocumento) {
	    return ResponseEntity.ok(proveedorServiceAPI.existsByNumeroDocumento(numeroDocumento));
	}

	@GetMapping("/existeTelefono/{telefono}")
	public ResponseEntity<Boolean> existeTelefono(@PathVariable String telefono) {
	    return ResponseEntity.ok(proveedorServiceAPI.existsByTelefono(telefono));
	}

	@GetMapping("/existeCorreo/{correo}")
	public ResponseEntity<Boolean> existeCorreo(@PathVariable String correo) {
	    return ResponseEntity.ok(proveedorServiceAPI.existsByCorreo(correo));
	}
	
	@PostMapping("/validar")
	public ResponseEntity<Map<String, Boolean>> validarDuplicados(@RequestBody Proveedor proveedor) {
	    Map<String, Boolean> resultado = new HashMap<>();

	    Integer id = proveedor.getIdProveedor(); // Puede ser null si es un nuevo proveedor

	    if (id != null) {
	        // Edición: ignora el mismo proveedor
	        resultado.put("nombreExistente", proveedorServiceAPI.existsByNombreProveedorAndIdProveedorNot(proveedor.getNombreProveedor(), id));
	        resultado.put("numeroDocumentoExistente", proveedorServiceAPI.existsByNumeroDocumentoAndIdProveedorNot(proveedor.getNumeroDocumento(), id));
	        resultado.put("telefonoExistente", proveedorServiceAPI.existsByTelefonoAndIdProveedorNot(proveedor.getTelefono(), id));
	        resultado.put("correoExistente", proveedorServiceAPI.existsByCorreoAndIdProveedorNot(proveedor.getCorreo(), id));
	    } else {
	        // Nuevo proveedor
	        resultado.put("nombreExistente", proveedorServiceAPI.existsByNombreProveedor(proveedor.getNombreProveedor()));
	        resultado.put("numeroDocumentoExistente", proveedorServiceAPI.existsByNumeroDocumento(proveedor.getNumeroDocumento()));
	        resultado.put("telefonoExistente", proveedorServiceAPI.existsByTelefono(proveedor.getTelefono()));
	        resultado.put("correoExistente", proveedorServiceAPI.existsByCorreo(proveedor.getCorreo()));
	    }

	    return ResponseEntity.ok(resultado);
	}




}
