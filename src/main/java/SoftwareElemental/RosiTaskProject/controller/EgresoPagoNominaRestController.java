package SoftwareElemental.RosiTaskProject.controller;

import java.util.List;

import SoftwareElemental.RosiTask.service.api.EgresoPagoNominaServiceAPI;
import SoftwareElemental.RosiTaskProject.entity.EgresoPagoNomina;
import SoftwareEmelental.RosiTaskProject.utils.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/egresoPagoNomina")
public class EgresoPagoNominaRestController {

    @Autowired
    private EgresoPagoNominaServiceAPI egresoPagoNominaServiceAPI;

    @GetMapping("/getAll")
    public List<EgresoPagoNomina> getAll() {
        return egresoPagoNominaServiceAPI.getAll();
    }

    @PostMapping("/saveEgresoPagoNomina")
    public ResponseEntity<EgresoPagoNomina> save(@RequestBody EgresoPagoNomina egreso) {
        EgresoPagoNomina obj = egresoPagoNominaServiceAPI.save(egreso);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/findRecord/{id}")
    public ResponseEntity<EgresoPagoNomina> getById(@PathVariable Long id) throws ResourceNotFoundException {
        EgresoPagoNomina egreso = egresoPagoNominaServiceAPI.get(id);
        if (egreso == null) {
            throw new ResourceNotFoundException("Record not found for <EgresoPagoNomina> with id: " + id);
        }
        return ResponseEntity.ok().body(egreso);
    }

    @DeleteMapping("/deleteEgresoPagoNomina/{id}")
    public ResponseEntity<EgresoPagoNomina> delete(@PathVariable Long id) {
        EgresoPagoNomina egreso = egresoPagoNominaServiceAPI.get(id);
        if (egreso != null) {
            egresoPagoNominaServiceAPI.delete(id);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(egreso, HttpStatus.OK);
    }
    
    @GetMapping("/nextId")
    public ResponseEntity<Long> getNextEgresoId() {
        List<EgresoPagoNomina> egresosPagoNomina = egresoPagoNominaServiceAPI.getAll();
        Long maxId = egresosPagoNomina.stream()
            .mapToLong(en -> en.getId())
            .max()
            .orElse(0L); // Si no hay ventas aún
        return ResponseEntity.ok(maxId + 1);
    }
}

