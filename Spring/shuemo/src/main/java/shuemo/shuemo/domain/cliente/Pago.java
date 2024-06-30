package shuemo.shuemo.domain.cliente;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Data
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_pago", nullable = false)
    @NotNull(message = "La fecha de pago no puede estar vacía")
    private LocalDateTime fechaPago;

    @Column(name = "fecha_prox_pago", nullable = false)
    @NotNull(message = "La fecha del próximo pago no puede estar vacía")
    private LocalDateTime fechaProxPago;

    @Column(name = "monto", nullable = false)
    @NotNull(message = "El monto del pago no puede estar vacío")
    @Positive(message = "El monto del pago debe ser un valor positivo")
    private BigDecimal monto;

    @Column(name = "detalles")
    private String detalles;

    @ManyToOne
    @NotNull(message = "El cliente asociado al pago no puede estar vacío")
    private Cliente cliente;

    @ManyToOne
    @NotNull(message = "El tipo de moneda del pago no puede estar vacío")
    private TipoMoneda tipoMoneda;

    @ManyToOne
    @NotNull(message = "El método de pago del pago no puede estar vacío")
    private MetodoPago metodoPago;
}
