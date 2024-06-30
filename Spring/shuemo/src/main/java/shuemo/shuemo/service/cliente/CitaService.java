package shuemo.shuemo.service.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.cliente.Cita;
import shuemo.shuemo.repository.cliente.ICitaRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CitaService {

    @Autowired
    private ICitaRepository citaRepository;

    public List<Cita> findAll() {
        // Convert Iterable to List
        return StreamSupport.stream(citaRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public Optional<Cita> findById(Long id) {
        return citaRepository.findById(id);
    }

    public Cita save(Cita cita) {
        return citaRepository.save(cita);
    }

    public Optional<Cita> update(Long id, Cita cita) {
        return citaRepository.findById(id)
                .map(existingCita -> {
                    existingCita.setFecha(cita.getFecha());
                    existingCita.setFechaHoraInicio(cita.getFechaHoraInicio());
                    existingCita.setFechaHoraFin(cita.getFechaHoraFin());
                    existingCita.setUbicacion(cita.getUbicacion());
                    existingCita.setDescripcion(cita.getDescripcion());
                    existingCita.setCliente(cita.getCliente());
                    return citaRepository.save(existingCita);
                });
    }

    public boolean deleteById(Long id) {
        if (citaRepository.existsById(id)) {
            citaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
