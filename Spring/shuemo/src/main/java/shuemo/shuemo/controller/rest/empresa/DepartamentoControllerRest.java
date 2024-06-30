package shuemo.shuemo.controller.rest.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.empresa.Departamento;
import shuemo.shuemo.service.empresa.DepartamentoService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/departamento")
public class DepartamentoControllerRest {

    @Autowired
    private DepartamentoService departamentoService;

    @GetMapping("/r")
    public ResponseEntity<List<Departamento>> getAllDepartamentos() {
        return ResponseEntity.ok(departamentoService.findAll());
    }

    @GetMapping("/r/{id}")
    public ResponseEntity<Departamento> getDepartamentoById(@PathVariable Long id) {
        return departamentoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Departamento> createDepartamento(@Valid @RequestBody Departamento departamento) {
        Departamento savedDepartamento = departamentoService.save(departamento);
        return ResponseEntity.ok(savedDepartamento);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Departamento> updateDepartamento(@PathVariable Long id,
            @Valid @RequestBody Departamento departamento) {
        return departamentoService.update(id, departamento)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteDepartamento(@PathVariable Long id) {
        if (departamentoService.deleteById(id)) {
            return ResponseEntity.ok("Departamento eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
