package shuemo.shuemo.controller.rest.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shuemo.shuemo.domain.cliente.Cita;
import shuemo.shuemo.domain.cliente.Cliente;
import shuemo.shuemo.domain.cliente.Pago;
import shuemo.shuemo.domain.empleado.Empleado;
import shuemo.shuemo.domain.empresa.Departamento;
import shuemo.shuemo.domain.empresa.Empresa;
import shuemo.shuemo.service.empresa.EmpresaService;

import jakarta.validation.Valid;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/empresa")
public class EmpresaControllerRest {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping("/r")
    public ResponseEntity<List<Empresa>> getAllEmpresas() {
        return ResponseEntity.ok(empresaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> getEmpresaById(@PathVariable Long id) {
        return empresaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Empresa> createEmpresa(@Valid @RequestBody Empresa empresa) {
        Empresa savedEmpresa = empresaService.save(empresa);
        return ResponseEntity.ok(savedEmpresa);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Empresa> updateEmpresa(@PathVariable Long id, @Valid @RequestBody Empresa empresa) {
        return empresaService.update(id, empresa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteEmpresa(@PathVariable Long id) {
        if (empresaService.deleteById(id)) {
            return ResponseEntity.ok("Empresa eliminada correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Nuevo endpoint para obtener empleados de una empresa
    @GetMapping("/{id}/empleados")
    public ResponseEntity<Collection<Empleado>> getEmpleadosByEmpresa(@PathVariable Long id) {
        Collection<Empleado> empleados = empresaService.findEmpleadosEmpresa(id);
        return ResponseEntity.ok(empleados);
    }

    // Nuevo endpoint para obtener departamentos de una empresa
    @GetMapping("/{id}/departamentos")
    public ResponseEntity<Collection<Departamento>> getDepartamentosByEmpresa(@PathVariable Long id) {
        Collection<Departamento> departamentos = empresaService.findDepartamentosEmpresa(id);
        return ResponseEntity.ok(departamentos);
    }

    // Nuevo endpoint para obtener clientes de una empresa
    @GetMapping("/{id}/clientes")
    public ResponseEntity<Collection<Cliente>> getClientesByEmpresa(@PathVariable Long id) {
        Collection<Cliente> clientes = empresaService.findClientesEmpresa(id);
        return ResponseEntity.ok(clientes);
    }

    // Nuevo endpoint para obtener citas de una empresa
    @GetMapping("/{id}/citas")
    public ResponseEntity<Collection<Cita>> getCitasByEmpresa(@PathVariable Long id) {
        Collection<Cita> citas = empresaService.findCitasEmpresa(id);
        return ResponseEntity.ok(citas);
    }

    // Nuevo endpoint para obtener pagos de una empresa
    @GetMapping("/{id}/pagos")
    public ResponseEntity<Collection<Pago>> getPagosByEmpresa(@PathVariable Long id) {
        Collection<Pago> pagos = empresaService.findPagosEmpresa(id);
        return ResponseEntity.ok(pagos);
    }
}
