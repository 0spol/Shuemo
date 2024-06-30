package shuemo.shuemo.controller.rest.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.empresa.TipoEmpresa;
import shuemo.shuemo.service.empresa.TipoEmpresaService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/tipoEmpresa")
public class TipoEmpresaControllerRest {

    @Autowired
    private TipoEmpresaService tipoEmpresaService;

    @GetMapping("/r")
    public ResponseEntity<List<TipoEmpresa>> getAllTipoEmpresas() {
        return ResponseEntity.ok(tipoEmpresaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoEmpresa> getTipoEmpresaById(@PathVariable Long id) {
        return tipoEmpresaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<TipoEmpresa> createTipoEmpresa(@Valid @RequestBody TipoEmpresa tipoEmpresa) {
        TipoEmpresa savedTipoEmpresa = tipoEmpresaService.save(tipoEmpresa);
        return ResponseEntity.ok(savedTipoEmpresa);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<TipoEmpresa> updateTipoEmpresa(@PathVariable Long id,
            @Valid @RequestBody TipoEmpresa tipoEmpresa) {
        return tipoEmpresaService.update(id, tipoEmpresa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteTipoEmpresa(@PathVariable Long id) {
        if (tipoEmpresaService.deleteById(id)) {
            return ResponseEntity.ok("TipoEmpresa eliminada correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
