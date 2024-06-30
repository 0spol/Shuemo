package shuemo.shuemo.domain.empresa;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import shuemo.shuemo.domain.empleado.Empleado;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    @NotNull
    @Size(min = 3, max = 100)
    private String nombre;

    @Column(name = "descripcion")
    @Size(max = 250)
    private String descripcion;

    @ManyToOne
    private Empresa empresa;

    @ManyToOne
    private TipoDepartamento tipoDept;

    @OneToMany(mappedBy = "departamento")
    private Collection<Empleado> empleados;
}
