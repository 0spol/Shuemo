package shuemo.shuemo.domain.cliente;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

import jakarta.validation.constraints.NotEmpty;

@Entity
@Data
public class TipoMoneda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", unique = true, nullable = false)
    @NotEmpty(message = "El nombre del tipo de moneda no puede estar vacío")
    private String nombre;

    @OneToMany(mappedBy = "tipoMoneda")
    @JsonIgnore
    private Collection<Pago> pagosConTipoMoneda;
}
