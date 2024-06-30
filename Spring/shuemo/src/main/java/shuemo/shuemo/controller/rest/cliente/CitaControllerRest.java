package shuemo.shuemo.controller.rest.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.cliente.Cita;
import shuemo.shuemo.service.cliente.CitaService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/cita")
public class CitaControllerRest {

    @Autowired
    private CitaService citaService;

    @GetMapping("/r")
    public ResponseEntity<List<Cita>> getAllCitas() {
        return ResponseEntity.ok(citaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cita> getCitaById(@PathVariable Long id) {
        return citaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Cita> createCita(@Valid @RequestBody Cita cita) {
        Cita savedCita = citaService.save(cita);
        return ResponseEntity.ok(savedCita);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Cita> updateCita(@PathVariable Long id, @Valid @RequestBody Cita cita) {

        return citaService.update(id, cita)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteCita(@PathVariable Long id) {
        if (citaService.deleteById(id)) {
            return ResponseEntity.ok("Cita eliminada correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
