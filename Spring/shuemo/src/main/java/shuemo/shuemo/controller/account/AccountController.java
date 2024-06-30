package shuemo.shuemo.controller.account;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.UUID;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import shuemo.shuemo.controller.email.EmailController;
import shuemo.shuemo.domain.account.LoginDto;
import shuemo.shuemo.domain.account.NewUserDto;
import shuemo.shuemo.domain.account.RegisterDto;
import shuemo.shuemo.domain.empleado.Empleado;
import shuemo.shuemo.domain.empleado.RecuperarTemporal;
import shuemo.shuemo.domain.empleado.Rol;
import shuemo.shuemo.domain.empleado.TemporalEmpleado;
import shuemo.shuemo.domain.empresa.Departamento;
import shuemo.shuemo.domain.empresa.Empresa;
import shuemo.shuemo.service.account.TokenService;
import shuemo.shuemo.service.empleado.EmpleadoService;
import shuemo.shuemo.service.empleado.RecuperarTemporalService;
import shuemo.shuemo.service.empleado.RolService;
import shuemo.shuemo.service.empleado.TemporalEmpleadoService;
import shuemo.shuemo.service.empresa.DepartamentoService;
import shuemo.shuemo.service.empresa.EmpresaService;
import shuemo.shuemo.service.empresa.TipoDepartamentoService;
import shuemo.shuemo.service.empresa.TipoEmpresaService;
import shuemo.shuemo.service.infraestructura.CiudadService;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Value("${cors.origin}")
    private String corsOrigin;

    @Autowired
    private EmpleadoService empleadoService;

    @Autowired
    private DepartamentoService departamentoService;

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private CiudadService ciudadService;

    @Autowired
    private TipoEmpresaService tipoEmpresaService;

    @Autowired
    private TipoDepartamentoService tipoDepartamentoService;

    @Autowired
    private RolService rolService;

    @Autowired
    private TemporalEmpleadoService temporalEmpleadoService;

    @Autowired
    private RecuperarTemporalService recuperarTemporalService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        Empleado empleado = empleadoService.findByEmail(loginDto.getEmail());
        if (empleado == null || !passwordEncoder.matches(loginDto.getPassword(), empleado.getPasswd())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Correo o contraseña incorrectos"));
        }
        if (empleado.isDeshabilitado() == true) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuario deshabilitado"));
        }
        if (empleado.isTieneCuentaUsuario() == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "El usuario no tiene cuenta"));
        }

        // Datos a devolver al front
        String token = tokenService.createToken(empleado);
        NewUserDto newUserDto = new NewUserDto();
        newUserDto.setIdEmpresa(empleado.getDepartamento().getEmpresa().getId());
        newUserDto
                .setIdTipoEmpresa(empleado.getDepartamento().getEmpresa().getTipoEmpresa().getId());
        newUserDto.setIdUsuario(empleado.getId());
        newUserDto.setEmail(empleado.getEmail());
        newUserDto.setUsername(empleado.getNombre());
        Collection<Rol> rolesEmpleado = empleado.getRoles();
        Long[] arrayRolesEnviar = new Long[rolesEmpleado.size()];
        int i = 0;
        for (Rol rolRecorrer : rolesEmpleado) {
            arrayRolesEnviar[i] = rolRecorrer.getId();
            i++;
        }
        newUserDto.setRoles(arrayRolesEnviar);
        newUserDto.setToken(token);

        return ResponseEntity.ok(newUserDto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto) {
        if (empleadoService.existsByEmail(registerDto.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Este Email ya este en uso"));
        }

        try {
            // Crear un token de confirmación
            String token = UUID.randomUUID().toString();

            // Guardar temporalmente los datos del usuario (puedes usar una base de datos
            // temporal o una tabla específica para registros no confirmados)
            TemporalEmpleado temporalEmpleado = new TemporalEmpleado();
            temporalEmpleado.setEmail(registerDto.getEmail());
            temporalEmpleado.setNombre(registerDto.getUsername());
            temporalEmpleado.setPasswd(passwordEncoder.encode(registerDto.getPassword()));
            temporalEmpleado.setTelefonoUno(registerDto.getTelefono());
            temporalEmpleado.setToken(token);
            temporalEmpleado.setEmpresaNombre(registerDto.getNombreEmpresa());
            temporalEmpleado.setCiudadId(Long.parseLong(registerDto.getCiudad()));
            temporalEmpleado.setTipoEmpresaId(Long.parseLong(registerDto.getTipoEmpresa()));
            temporalEmpleado.setDireccion(registerDto.getDireccion());
            temporalEmpleado.setTelefonoUno(registerDto.getTelefono());
            temporalEmpleado.setNombreDepartamento(registerDto.getNombreDepartamento());
            temporalEmpleado.setTipoDepartamentoId(Long.parseLong(registerDto.getTipoDepartamento()));
            temporalEmpleado.setDescripcion(registerDto.getAccion());

            temporalEmpleadoService.save(temporalEmpleado);

            // Enviar el correo de confirmación
            String enlaceConfirmacion = corsOrigin + "/confirm?token=" + token;
            EmailController.gmailBienvenidaRegistro(registerDto.getEmail(), registerDto.getUsername(),
                    enlaceConfirmacion);

            return ResponseEntity.ok("Correo enviado.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Se a producido un error: " + e.getMessage());
        }
    }

    @GetMapping("/confirm")
    public ResponseEntity<?> confirmAccount(@RequestParam("token") String token) {
        TemporalEmpleado temporalEmpleado = temporalEmpleadoService.findByToken(token);
        if (temporalEmpleado == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token incorrecto");
        }

        try {
            // Empresa
            Empresa empresa = new Empresa();
            empresa.setCiudad(ciudadService.getCiudad(temporalEmpleado.getCiudadId()));
            empresa.setDireccion(temporalEmpleado.getDireccion());
            empresa.setTelefonoUno(temporalEmpleado.getTelefonoUno());
            empresa.setTipoEmpresa(tipoEmpresaService.getTipoEmpresa(temporalEmpleado.getTipoEmpresaId()));
            empresa.setNombre(temporalEmpleado.getEmpresaNombre());

            // Departamento
            Departamento departamento = new Departamento();
            departamento.setEmpresa(empresa);
            departamento
                    .setTipoDept(tipoDepartamentoService.getTipoDepartamento(temporalEmpleado.getTipoDepartamentoId()));
            departamento.setDescripcion(temporalEmpleado.getDescripcion());
            departamento.setNombre(temporalEmpleado.getNombreDepartamento());

            Collection<Departamento> departamentos = new ArrayList<>();
            departamentos.add(departamento);

            // Roles
            Rol rol = rolService.getRol(Long.valueOf(2));
            Collection<Rol> roles = new ArrayList<>();
            roles.add(rol);

            // Empleado
            Empleado empleado = new Empleado();
            empleado.setEmail(temporalEmpleado.getEmail());
            empleado.setNombre(temporalEmpleado.getNombre());
            empleado.setPasswd(temporalEmpleado.getPasswd());
            empleado.setTelefonoUno(temporalEmpleado.getTelefonoUno());
            empleado.setDepartamento(departamento);
            empleado.setRoles(roles);
            empleado.setTieneCuentaUsuario(true);

            Collection<Empleado> empleados = new ArrayList<>();
            empleados.add(empleado);

            // Relacion EmpresaDepartamento
            empresa.setDepartamentos(departamentos);
            departamento.setEmpleados(empleados);

            // Relacion RolEmpleado
            Collection<Empleado> empleadosEnRol = rol.getEmpleados();
            empleadosEnRol.add(empleado);
            rol.setEmpleados(empleadosEnRol);

            // Guardado de datos
            empresaService.save(empresa);
            departamentoService.save(departamento);
            empleadoService.save(empleado);
            rolService.save(rol);

            // Eliminar el registro temporal
            temporalEmpleadoService.delete(temporalEmpleado);

            return ResponseEntity.ok("Cuenta creada");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during confirmation process: " + e.getMessage());
        }
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @Valid @RequestBody Empleado updatedEmpleado) {
        Optional<Empleado> optionalEmpleado = empleadoService.findById(id);
        if (!optionalEmpleado.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empleado no encontrado");
        }

        Empleado empleado = optionalEmpleado.get();
        empleado.setPasswd(passwordEncoder.encode(updatedEmpleado.getPasswd()));
        // Actualiza otros campos si es necesario
        empleadoService.save(empleado);
        return ResponseEntity.ok("Contraseña actualizada con éxito");
    }

    @PostMapping("/emailRecuperar")
    public ResponseEntity<?> emailRecuperar(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (!empleadoService.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Este email no existe en la base de datos"));
        }

        try {
            String token = UUID.randomUUID().toString();

            Empleado empleado = empleadoService.findByEmail(email);

            String enlaceConfirmacion = corsOrigin + "/cambiarContrasena?token=" + token;
            EmailController.gmailReestablecerPwd(empleado.getUsername(), empleado.getNombre(), enlaceConfirmacion);

            RecuperarTemporal temp = new RecuperarTemporal();
            temp.setToken(token);
            temp.setEmail(email);
            recuperarTemporalService.save(temp);

            return ResponseEntity.ok("Correo enviado.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Se ha producido un error: " + e.getMessage());
        }
    }

    @PostMapping("/recuperar")
    public ResponseEntity<?> recuperar(@RequestBody Map<String, String> request) {
        String token = request.get("token");

        try {
            RecuperarTemporal temp =  recuperarTemporalService.findByToken(token);

            Empleado empleado = empleadoService.findByEmail(temp.getEmail());

            empleado.setPasswd(passwordEncoder.encode(request.get("password")));

            recuperarTemporalService.delete(temp);

            return ResponseEntity.ok("Contraseña cambiado con exito.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Se ha producido un error: " + e.getMessage());
        }
    }

}
