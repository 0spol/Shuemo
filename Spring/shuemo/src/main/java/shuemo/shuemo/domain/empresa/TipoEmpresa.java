package shuemo.shuemo.domain.empresa;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class TipoEmpresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    @NotBlank(message = "El nombre de la empresa es un campo obligatorio.")
    @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres.")
    private String nombre;

    @Column(name = "descripcion")
    @Size(max = 200, message = "La descripción no puede superar los 200 caracteres.")
    private String descripcion;

    @OneToMany(mappedBy = "tipoEmpresa")
    @JsonIgnore
    private Collection<Empresa> empresas;
}
