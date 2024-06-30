package shuemo.shuemo.domain.cliente;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Data
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha", nullable = false)
    @NotNull(message = "La fecha no puede estar vacía")
    private LocalDateTime fecha;

    @Column(name = "fecha_hora_inicio", nullable = false)
    @NotNull(message = "La fecha y hora de inicio no puede estar vacía")
    private LocalDateTime fechaHoraInicio;

    @Column(name = "fecha_hora_fin", nullable = false)
    @NotNull(message = "La fecha y hora de fin no puede estar vacía")
    private LocalDateTime fechaHoraFin;

    @Column(name = "ubicacion")
    @Size(max = 100, message = "La ubicación no puede superar los 100 caracteres")
    private String ubicacion;

    @Column(name = "descripcion")
    @Size(max = 200, message = "La descripción no puede superar los 200 caracteres")
    private String descripcion;

    @ManyToOne
    @NotNull(message = "El cliente asociado no puede estar vacío")
    private Cliente cliente;
}
