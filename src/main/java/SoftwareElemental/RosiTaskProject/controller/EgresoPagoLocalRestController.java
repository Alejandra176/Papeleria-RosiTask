package SoftwareElemental.RosiTaskProject.controller;
import java.util.List;

import SoftwareElemental.RosiTask.service.api.EgresoPagoLocalServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.EgresoPagoLocal;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/egresoPagoLocal")
public class EgresoPagoLocalRestController {

    @Autowired
    private EgresoPagoLocalServiceAPI egresoPagoLocalServiceAPI;

    @GetMapping(value = "/getAll")
    public List<EgresoPagoLocal> getAll() {
        return egresoPagoLocalServiceAPI.getAll();
    }

    @PostMapping(value = "/saveEgresoPagoLocal")
    public ResponseEntity<EgresoPagoLocal> save(@RequestBody EgresoPagoLocal egreso) {
    	System.out.println("Fecha recibida: " + egreso.getFechaEgreso());
        EgresoPagoLocal obj = egresoPagoLocalServiceAPI.save(egreso);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/findRecord/{id}")
    public ResponseEntity<EgresoPagoLocal> getById(@PathVariable Long id) throws ResourceNotFoundException {
        EgresoPagoLocal egreso = egresoPagoLocalServiceAPI.get(id);
        if (egreso == null) {
            throw new ResourceNotFoundException("Record not found for <EgresoPagoLocal> with id: " + id);
        }
        return ResponseEntity.ok().body(egreso);
    }

    @DeleteMapping(value = "/deleteEgresoPagoLocal/{id}")
    public ResponseEntity<EgresoPagoLocal> delete(@PathVariable Long id) {
        EgresoPagoLocal egreso = egresoPagoLocalServiceAPI.get(id);
        if (egreso != null) {
            egresoPagoLocalServiceAPI.delete(id);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(egreso, HttpStatus.OK);
    }
    
    @GetMapping(value = "/nextId")
    public ResponseEntity<Long> getNextEgresoId() {
        List<EgresoPagoLocal> egresoPagoLocal = egresoPagoLocalServiceAPI.getAll();
        Long maxId = egresoPagoLocal.stream()
            .mapToLong(el -> el.getId())
            .max()
            .orElse(0L); // Si no hay ventas aún
        return ResponseEntity.ok(maxId + 1);
    }
    
}

