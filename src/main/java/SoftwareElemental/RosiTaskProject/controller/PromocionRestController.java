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

import SoftwareElemental.RosiTask.service.api.PromocionServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.Promocion;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/promocion")
public class PromocionRestController {

	@Autowired
	private PromocionServiceAPI promocionServiceAPI;

	@GetMapping(value = "/getAll")
	public List<Promocion> getAll() {
		return promocionServiceAPI.getAll();
	}

	@PostMapping(value = "/savePromocion")
	public ResponseEntity<Promocion> save(@RequestBody Promocion promocion) {
		Promocion obj = promocionServiceAPI.save(promocion);
		return new ResponseEntity<Promocion>(obj, HttpStatus.OK); // 200
	}
	
	@GetMapping(value = "/findRecord/{id}")
	public ResponseEntity<Promocion> getPromocionById(@PathVariable Long id) throws ResourceNotFoundException {
		Promocion promocion = promocionServiceAPI.get(id);
		if (promocion == null) {
			throw new ResourceNotFoundException("Record not found for <Promocion>" + id);
		}
		return ResponseEntity.ok().body(promocion);
	}

	@DeleteMapping(value = "/deletePromocion/{id}")
	public ResponseEntity<Promocion> delete(@PathVariable Long id) {
		Promocion promocion = promocionServiceAPI.get(id);
		if (promocion != null) {
			promocionServiceAPI.delete(id);
		} else {
			return new ResponseEntity<Promocion>(promocion, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Promocion>(promocion, HttpStatus.OK);
	}

}
