package shuemo.shuemo.service.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import shuemo.shuemo.controller.email.EmailController;
import shuemo.shuemo.domain.cliente.Cita;
import shuemo.shuemo.repository.cliente.ICitaRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RecordatorioCitaService {

    @Autowired
    private ICitaRepository citaRepository;

    @Autowired
    private EmailController emailController;

    private Set<Long> citasNotificadas = new HashSet<>();

    @Scheduled(cron = "*/20 * * * * *") // Se ejecuta cada 20 segundos
    public void enviarRecordatoriosDeCitas() {
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime dentroDe24Horas = ahora.plusHours(24);

        List<Cita> citasEn24Horas = citaRepository.findCitasBetween(ahora, dentroDe24Horas);

        for (Cita cita : citasEn24Horas) {
            if (!citasNotificadas.contains(cita.getId())) {
                enviarRecordatorio(cita);
                citasNotificadas.add(cita.getId());
            }
        }
    }

    private void enviarRecordatorio(Cita cita) {
        String nombreEmpresa = "Shuemo";
        String iconoEmpresa = "http://localhost:8080/img/Logo.png";
        String emailDestinatario = cita.getCliente().getEmail();
        String nombreDestinatario = cita.getCliente().getNombre();
        String fechaCita = cita.getFechaHoraInicio().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        String horaCita = cita.getFechaHoraInicio().format(DateTimeFormatter.ofPattern("HH:mm"));
        String lugarCita = cita.getUbicacion();

        emailController.gmailRecordatorioCita(nombreEmpresa, iconoEmpresa, emailDestinatario, nombreDestinatario,
                fechaCita, horaCita, lugarCita);
    }
}
