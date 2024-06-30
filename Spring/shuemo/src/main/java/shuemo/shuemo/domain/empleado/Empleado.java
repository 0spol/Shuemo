package shuemo.shuemo.domain.empleado;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import shuemo.shuemo.domain.empresa.Departamento;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Empleado implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    @NotEmpty(message = "El nombre no puede estar vacío")
    private String nombre;

    @Column(name = "apellidos")
    @NotEmpty(message = "Los apellidos no pueden estar vacíos")
    private String apellidos;

    @Column(name = "passwd", nullable = false)
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String passwd;

    @Column(name = "email", unique = true, nullable = false)
    @Email(message = "Debe ser un correo electrónico válido")
    private String email;

    @Column(name = "dni", unique = true)
    @Size(min = 9, max = 12, message = "El DNI debe tener entre 9 y 12 caracteres")
    private String dni;

    @Column(name = "telefono_uno")
    @Size(min = 9, max = 15, message = "El teléfono debe tener entre 9 y 15 caracteres")
    private String telefonoUno;

    @Column(name = "telefono_dos")
    @Size(min = 9, max = 15, message = "El teléfono debe tener entre 9 y 15 caracteres")
    private String telefonoDos;

    @Column(name = "movil")
    @Size(min = 9, max = 15, message = "El móvil debe tener entre 9 y 15 caracteres")
    private String movil;

    @Column(name = "detalles")
    @Size(max = 200, message = "Los detalles no pueden superar los 200 caracteres")
    private String detalles;

    @Column(name = "tiene_cuenta_usuario")
    @NotNull(message = "Debe especificar si tiene cuenta de usuario")
    private boolean tieneCuentaUsuario;

    @Column(name = "deshabilitado")
    @NotNull(message = "Debe especificar si está deshabilitado")
    private boolean deshabilitado;

    @ManyToOne
    @JsonBackReference
    private Departamento departamento;

    @ManyToMany
    @JsonIgnore
    private Collection<Rol> roles;

    @Lob
    @Column(name = "foto_perfil", columnDefinition = "LONGBLOB")
    private byte[] fotoPerfil;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().collect(Collectors.toList());
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return passwd;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return !deshabilitado;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return tieneCuentaUsuario && !deshabilitado;
    }
}
