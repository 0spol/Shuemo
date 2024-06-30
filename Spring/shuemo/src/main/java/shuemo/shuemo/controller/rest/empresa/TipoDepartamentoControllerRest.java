package shuemo.shuemo.controller.rest.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.empresa.TipoDepartamento;
import shuemo.shuemo.service.empresa.TipoDepartamentoService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/tipo-departamento")
public class TipoDepartamentoControllerRest {

    @Autowired
    private TipoDepartamentoService tipoDepartamentoService;

    @GetMapping("/r")
    public ResponseEntity<List<TipoDepartamento>> getAllTipoDepartamentos() {
        return ResponseEntity.ok(tipoDepartamentoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoDepartamento> getTipoDepartamentoById(@PathVariable Long id) {
        return tipoDepartamentoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<TipoDepartamento> createTipoDepartamento(
            @Valid @RequestBody TipoDepartamento tipoDepartamento) {
        TipoDepartamento savedTipoDepartamento = tipoDepartamentoService.save(tipoDepartamento);
        return ResponseEntity.ok(savedTipoDepartamento);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<TipoDepartamento> updateTipoDepartamento(@PathVariable Long id,
            @Valid @RequestBody TipoDepartamento tipoDepartamento) {
        return tipoDepartamentoService.findById(id)
                .map(existingTipoDept -> {
                    existingTipoDept.setNombre(tipoDepartamento.getNombre());
                    existingTipoDept.setDescripcion(tipoDepartamento.getDescripcion());
                    return ResponseEntity.ok(tipoDepartamentoService.save(existingTipoDept));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteTipoDepartamento(@PathVariable Long id) {
        if (tipoDepartamentoService.findById(id).isPresent()) {
            tipoDepartamentoService.deleteById(id);
            return ResponseEntity.ok("Tipo de departamento eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
