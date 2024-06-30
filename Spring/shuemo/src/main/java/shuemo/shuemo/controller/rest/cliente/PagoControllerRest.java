package shuemo.shuemo.controller.rest.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.cliente.Pago;
import shuemo.shuemo.service.cliente.PagoService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/pago")
public class PagoControllerRest {

    @Autowired
    private PagoService pagoService;

    @GetMapping("/r")
    public ResponseEntity<List<Pago>> getAllPagos() {
        return ResponseEntity.ok(pagoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> getPagoById(@PathVariable Long id) {
        return pagoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Pago> createPago(@Valid @RequestBody Pago pago) {
        Pago savedPago = pagoService.save(pago);
        return ResponseEntity.ok(savedPago);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Pago> updatePago(@PathVariable Long id, @Valid @RequestBody Pago pago) {
        return pagoService.update(id, pago)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deletePago(@PathVariable Long id) {
        if (pagoService.deleteById(id)) {
            return ResponseEntity.ok("Pago eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
