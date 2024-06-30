package shuemo.shuemo.domain.empresa;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import shuemo.shuemo.domain.cliente.Cliente;
import shuemo.shuemo.domain.infraestructura.Ciudad;

@Entity
@Data
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    @NotNull(message = "El nombre es obligatorio.")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres.")
    private String nombre;

    @Column(name = "CIF")
    @Size(max = 9, message = "El CIF no puede tener más de 9 caracteres.")
    private String cif;

    @Column(name = "direccion")
    @Size(max = 200, message = "La dirección no puede tener más de 200 caracteres.")
    private String direccion;

    @Column(name = "telefono_uno")
    @Size(max = 12, message = "El teléfono uno no puede tener más de 12 caracteres.")
    private String telefonoUno;

    @Column(name = "telefono_dos")
    @Size(max = 12, message = "El teléfono dos no puede tener más de 12 caracteres.")
    private String telefonoDos;

    @Column(name = "fax")
    @Size(max = 12, message = "El fax no puede tener más de 12 caracteres.")
    private String fax;

    @Column(name = "email")
    @Email(message = "Debe proporcionar un correo electrónico válido.")
    private String email;

    @OneToMany(mappedBy = "empresa")
    @JsonIgnore
    private Collection<Departamento> departamentos;

    @OneToMany(mappedBy = "empresa")
    @JsonIgnore
    private Collection<Cliente> clientes;

    @ManyToOne
    private TipoEmpresa tipoEmpresa;

    @ManyToOne
    private Ciudad ciudad;
}
