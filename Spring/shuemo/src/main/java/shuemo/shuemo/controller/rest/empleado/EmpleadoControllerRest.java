package shuemo.shuemo.controller.rest.empleado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shuemo.shuemo.domain.empleado.Empleado;
import shuemo.shuemo.domain.empleado.Rol;
import shuemo.shuemo.service.empleado.EmpleadoService;
import shuemo.shuemo.service.empleado.RolService;

import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/empleado")
public class EmpleadoControllerRest {

    @Autowired
    private EmpleadoService empleadoService;

    @Autowired
    private RolService rolService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/r")
    public ResponseEntity<List<Empleado>> getAllEmpleados() {
        return ResponseEntity.ok(empleadoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        return empleadoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/c")
    public ResponseEntity<Empleado> createEmpleado(@Valid @RequestBody Empleado empleado) {
        Empleado savedEmpleado = empleadoService.save(empleado);
        return ResponseEntity.ok(savedEmpleado);
    }

    @PostMapping("/cInApp")
    public ResponseEntity<Empleado> createEmpleadoInApp(@Valid @RequestBody Empleado empleado) {
        // Hashear la contraseña antes de guardar
        if (empleado.getPasswd() != null && !empleado.getPasswd().isEmpty()) {
            empleado.setPasswd(passwordEncoder.encode(empleado.getPasswd()));
        }

        // Obtener el rol 3 y agregarlo al empleado
        Rol rol = rolService.getRol(3L); // Aquí se asume que el ID del rol es 3
        List<Rol> roles = new ArrayList<>();
        roles.add(rol);
        empleado.setRoles(roles);

        Empleado savedEmpleado = empleadoService.save(empleado);
        return ResponseEntity.ok(savedEmpleado);
    }

    @PutMapping("/u/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @Valid @RequestBody Empleado empleado) {
        return empleadoService.update(id, empleado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/d/{id}")
    public ResponseEntity<?> deleteEmpleado(@PathVariable Long id) {
        if (empleadoService.deleteById(id)) {
            return ResponseEntity.ok("Empleado eliminado correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/foto")
    public ResponseEntity<?> uploadProfilePicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            if (file.getSize() > 6 * 1024 * 1024) {
                return ResponseEntity.badRequest().body("El tamaño del archivo debe ser inferior a 6MB");
            }

            Empleado empleado = empleadoService.findById(id)
                    .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
            empleado.setFotoPerfil(file.getBytes());
            empleadoService.save(empleado);

            return ResponseEntity.ok("Foto de perfil actualizada exitosamente");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al subir el archivo");
        }
    }

    @GetMapping("/{id}/foto")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable Long id) {
        Empleado empleado = empleadoService.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        byte[] image = empleado.getFotoPerfil();
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }
}
