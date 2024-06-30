package shuemo.shuemo.controller.rest.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.cliente.TipoMoneda;
import shuemo.shuemo.service.cliente.TipoMonedaService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tipomoneda")
public class TipoMonedaControllerRest {

    @Autowired
    private TipoMonedaService tipoMonedaService;

    @GetMapping("/r")
    public ResponseEntity<List<TipoMoneda>> getAllTipoMonedas() {
        List<TipoMoneda> tipoMonedas = tipoMonedaService.findAll();
        return ResponseEntity.ok(tipoMonedas);
    }

    @GetMapping("/r/{id}")
    public ResponseEntity<TipoMoneda> getTipoMonedaById(@PathVariable Long id) {
        return tipoMonedaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<TipoMoneda> createTipoMoneda(@Valid @RequestBody TipoMoneda tipoMoneda) {
        TipoMoneda savedTipoMoneda = tipoMonedaService.save(tipoMoneda);
        return ResponseEntity.ok(savedTipoMoneda);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<TipoMoneda> updateTipoMoneda(@PathVariable Long id,
            @Valid @RequestBody TipoMoneda tipoMoneda) {
        return tipoMonedaService.update(id, tipoMoneda)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteTipoMoneda(@PathVariable Long id) {
        if (tipoMonedaService.deleteById(id)) {
            return ResponseEntity.ok("Tipo de moneda eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
