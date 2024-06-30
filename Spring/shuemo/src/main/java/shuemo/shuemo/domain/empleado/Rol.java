package shuemo.shuemo.domain.empleado;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Rol implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Collection<Empleado> empleados;

    public Rol() {
        // Constructor predeterminado
    }

    @Override
    public String getAuthority() {
        return nombre;
    }
}
