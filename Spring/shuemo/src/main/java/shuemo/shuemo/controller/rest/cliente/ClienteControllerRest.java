package shuemo.shuemo.controller.rest.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.cliente.Cliente;
import shuemo.shuemo.service.cliente.ClienteService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/cliente")
public class ClienteControllerRest {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/r")
    public ResponseEntity<List<Cliente>> getAllClientes() {
        return ResponseEntity.ok(clienteService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        return clienteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Cliente> createCliente(@Valid @RequestBody Cliente cliente) {
        Cliente savedCliente = clienteService.save(cliente);
        return ResponseEntity.ok(savedCliente);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @Valid @RequestBody Cliente cliente) {

        return clienteService.update(id, cliente)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteCliente(@PathVariable Long id) {
        if (clienteService.deleteById(id)) {
            return ResponseEntity.ok("Cliente eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
