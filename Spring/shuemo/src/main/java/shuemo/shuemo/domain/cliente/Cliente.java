package shuemo.shuemo.domain.cliente;

import jakarta.persistence.*;
import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import shuemo.shuemo.domain.empresa.Empresa;
import shuemo.shuemo.domain.infraestructura.Ciudad;

@Entity
@Data
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    @NotEmpty(message = "El nombre no puede estar vacío")
    private String nombre;

    @Column(name = "apellidos")
    private String apellidoUno;

    @Column(name = "email", nullable = false, unique = true)
    @Email(message = "Debe ser un correo electrónico válido")
    private String email;

    @Column(name = "telefono_uno")
    @Size(min = 9, max = 15, message = "El teléfono debe tener entre 9 y 15 caracteres")
    private String telefonoUno;

    @Column(name = "telefono_dos")
    @Size(min = 9, max = 15, message = "El teléfono debe tener entre 9 y 15 caracteres")
    private String telefonoDos;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "codigo_postal")
    @Size(min = 4, max = 10, message = "El código postal debe tener entre 4 y 10 caracteres")
    private String codigoPostal;

    @Column(name = "detalles")
    @Size(max = 200, message = "Los detalles no pueden superar los 200 caracteres")
    private String detalles;

    @ManyToOne
    @NotNull(message = "La ciudad no puede estar vacía")
    private Ciudad ciudad;

    @ManyToOne
    @NotNull(message = "La empresa no puede estar vacía")
    private Empresa empresa;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    private Collection<Pago> pagos;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    private Collection<Cita> citas;
}
