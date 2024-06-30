package shuemo.shuemo.domain.infraestructura;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Pais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, unique = true)
    @NotBlank(message = "El nombre del país es obligatorio.")
    private String nombre;

    @Column(name = "activo", nullable = false)
    @NotNull(message = "El estado activo es obligatorio.")
    private boolean activo;

    @OneToMany(mappedBy = "pais")
    @JsonIgnore
    private Collection<Provincia> provincias;
}
