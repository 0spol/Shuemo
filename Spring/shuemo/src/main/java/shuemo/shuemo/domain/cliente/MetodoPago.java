package shuemo.shuemo.domain.cliente;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

import jakarta.validation.constraints.NotEmpty;

@Entity
@Data
public class MetodoPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    @NotEmpty(message = "El nombre del método de pago no puede estar vacío")
    private String nombre;

    @OneToMany(mappedBy = "metodoPago")
    @JsonIgnore
    private Collection<Pago> pagosConMetodoPago;
}
