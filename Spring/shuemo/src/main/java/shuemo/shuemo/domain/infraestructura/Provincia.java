package shuemo.shuemo.domain.infraestructura;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Provincia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    @NotBlank(message = "El nombre de la provincia es obligatorio.")
    private String nombre;

    @Column(name = "cp", nullable = false)
    @Pattern(regexp = "\\d{5}", message = "El código postal debe tener 5 dígitos.")
    private String cp;

    @ManyToOne
    @JoinColumn(name = "pais_id")
    @NotNull(message = "Debe asignarse un país.")
    @JsonIgnore
    private Pais pais;

    @OneToMany(mappedBy = "provincia")
    @JsonIgnore
    private Collection<Ciudad> ciudades;
}
