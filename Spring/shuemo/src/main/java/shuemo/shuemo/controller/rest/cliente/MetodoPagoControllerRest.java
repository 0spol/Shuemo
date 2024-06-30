package shuemo.shuemo.controller.rest.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.cliente.MetodoPago;
import shuemo.shuemo.service.cliente.MetodoPagoService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/metodoPago")
public class MetodoPagoControllerRest {

    @Autowired
    private MetodoPagoService metodoPagoService;

    @GetMapping("/r")
    public ResponseEntity<List<MetodoPago>> getAllMetodoPagos() {
        return ResponseEntity.ok(metodoPagoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetodoPago> getMetodoPagoById(@PathVariable Long id) {
        return metodoPagoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<MetodoPago> createMetodoPago(@Valid @RequestBody MetodoPago metodoPago) {
        MetodoPago savedMetodoPago = metodoPagoService.save(metodoPago);
        return ResponseEntity.ok(savedMetodoPago);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<MetodoPago> updateMetodoPago(@PathVariable Long id,
            @Valid @RequestBody MetodoPago metodoPago) {
        return metodoPagoService.update(id, metodoPago)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteMetodoPago(@PathVariable Long id) {
        if (metodoPagoService.deleteById(id)) {
            return ResponseEntity.ok("Metodo de pago eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
