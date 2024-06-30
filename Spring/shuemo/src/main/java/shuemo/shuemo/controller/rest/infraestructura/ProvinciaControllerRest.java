package shuemo.shuemo.controller.rest.infraestructura;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.infraestructura.Provincia;
import shuemo.shuemo.service.infraestructura.ProvinciaService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/provincia")
public class ProvinciaControllerRest {

    @Autowired
    private ProvinciaService provinciaService;

    @GetMapping("/r")
    public ResponseEntity<List<Provincia>> getAllProvincias() {
        return ResponseEntity.ok(provinciaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Provincia> getProvinciaById(@PathVariable Long id) {
        return provinciaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Provincia> createProvincia(@Valid @RequestBody Provincia provincia) {
        Provincia savedProvincia = provinciaService.save(provincia);
        return ResponseEntity.ok(savedProvincia);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Provincia> updateProvincia(@PathVariable Long id, @Valid @RequestBody Provincia provincia) {
        return provinciaService.update(id, provincia)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteProvincia(@PathVariable Long id) {
        if (provinciaService.deleteById(id)) {
            return ResponseEntity.ok("Provincia eliminada correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
