package shuemo.shuemo.domain.infraestructura;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import shuemo.shuemo.domain.cliente.Cliente;
import shuemo.shuemo.domain.empresa.Empresa;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
public class Ciudad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, unique = true)
    @NotBlank(message = "El nombre de la ciudad es obligatorio.")
    @Size(min = 2, max = 100, message = "El nombre de la ciudad debe tener entre 2 y 100 caracteres.")
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "provincia_id", nullable = false)
    @JsonIgnore
    private Provincia provincia;

    @OneToMany(mappedBy = "ciudad")
    @JsonIgnore
    private Collection<Cliente> clientes;

    @OneToMany(mappedBy = "ciudad")
    @JsonIgnore
    private Collection<Empresa> empresas;
}
