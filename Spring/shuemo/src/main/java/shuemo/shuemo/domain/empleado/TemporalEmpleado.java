package shuemo.shuemo.domain.empleado;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class TemporalEmpleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String nombre;
    private String passwd;
    private String telefonoUno;
    private String token;
    private String empresaNombre;
    private Long ciudadId;
    private Long tipoEmpresaId;
    private String direccion;
    private String nombreDepartamento;
    private Long tipoDepartamentoId;
    private String descripcion;
}
