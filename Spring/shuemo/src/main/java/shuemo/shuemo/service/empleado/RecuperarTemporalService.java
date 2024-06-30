package shuemo.shuemo.service.empleado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.empleado.RecuperarTemporal;
import shuemo.shuemo.domain.empleado.TemporalEmpleado;
import shuemo.shuemo.repository.empleado.RecuperarTemporalRepository;

import java.util.Optional;

@Service
public class RecuperarTemporalService {

    private final RecuperarTemporalRepository recuperarTemporalRepository;

    @Autowired
    public RecuperarTemporalService(RecuperarTemporalRepository recuperarTemporalRepository) {
        this.recuperarTemporalRepository = recuperarTemporalRepository;
    }

    public RecuperarTemporal save(RecuperarTemporal recuperarTemporal) {
        return recuperarTemporalRepository.save(recuperarTemporal);
    }

    public Optional<RecuperarTemporal> findById(Long id) {
        return recuperarTemporalRepository.findById(id);
    }

    public void deleteById(Long id) {
        recuperarTemporalRepository.deleteById(id);
    }

     public void delete(RecuperarTemporal recuperarTemporal) {
        recuperarTemporalRepository.delete(recuperarTemporal);
    }

    public RecuperarTemporal findByToken(String token) {
        return recuperarTemporalRepository.findByToken(token);
    }
}
