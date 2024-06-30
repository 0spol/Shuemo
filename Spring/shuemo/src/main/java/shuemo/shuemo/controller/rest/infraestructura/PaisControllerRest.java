package shuemo.shuemo.controller.rest.infraestructura;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.infraestructura.Pais;
import shuemo.shuemo.service.infraestructura.PaisService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/pais")
public class PaisControllerRest {

    @Autowired
    private PaisService paisService;

    @GetMapping("/r")
    public ResponseEntity<List<Pais>> getAllPaises() {
        return ResponseEntity.ok(paisService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pais> getPaisById(@PathVariable Long id) {
        return paisService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Pais> createPais(@Valid @RequestBody Pais pais) {
        Pais savedPais = paisService.save(pais);
        return ResponseEntity.ok(savedPais);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Pais> updatePais(@PathVariable Long id, @Valid @RequestBody Pais pais) {
        return paisService.update(id, pais)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deletePais(@PathVariable Long id) {
        if (paisService.deleteById(id)) {
            return ResponseEntity.ok("Pais eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
