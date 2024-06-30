package shuemo.shuemo.controller.rest.empleado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.empleado.Rol;
import shuemo.shuemo.service.empleado.RolService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolControllerRest {

    @Autowired
    private RolService rolService;

    @GetMapping("/r")
    public ResponseEntity<List<Rol>> getAllRoles() {
        return ResponseEntity.ok(rolService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> getRolById(@PathVariable Long id) {
        return rolService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Rol> createRol(@Valid @RequestBody Rol rol) {
        Rol savedRol = rolService.save(rol);
        return ResponseEntity.ok(savedRol);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Rol> updateRol(@PathVariable Long id, @Valid @RequestBody Rol rol) {
        return rolService.update(id, rol)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteRol(@PathVariable Long id) {
        if (rolService.deleteById(id)) {
            return ResponseEntity.ok("Rol eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
