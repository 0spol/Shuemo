package shuemo.shuemo.controller.rest.infraestructura;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.infraestructura.Ciudad;
import shuemo.shuemo.service.infraestructura.CiudadService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/ciudad")
public class CiudadControllerRest {

    @Autowired
    private CiudadService ciudadService;

    @GetMapping("/r")
    public ResponseEntity<List<Ciudad>> getAllCiudades() {
        return ResponseEntity.ok(ciudadService.findAll());
    }

    @GetMapping("/r/{id}")
    public ResponseEntity<Ciudad> getCiudadById(@PathVariable Long id) {
        return ciudadService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Ciudad> createCiudad(@Valid @RequestBody Ciudad ciudad) {
        Ciudad savedCiudad = ciudadService.save(ciudad);
        return ResponseEntity.ok(savedCiudad);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Ciudad> updateCiudad(@PathVariable Long id, @Valid @RequestBody Ciudad ciudad) {

        return ciudadService.update(id, ciudad)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteCiudad(@PathVariable Long id) {
        ciudadService.deleteById(id);
        return ResponseEntity.ok("Ciudad eliminada correctamente.");
    }
}
