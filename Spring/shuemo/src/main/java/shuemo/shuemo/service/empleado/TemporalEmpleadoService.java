package shuemo.shuemo.service.empleado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shuemo.shuemo.domain.empleado.TemporalEmpleado;
import shuemo.shuemo.repository.empleado.TemporalEmpleadoRepository;

@Service
public class TemporalEmpleadoService {
    @Autowired
    private TemporalEmpleadoRepository temporalEmpleadoRepository;

    public void save(TemporalEmpleado temporalEmpleado) {
        temporalEmpleadoRepository.save(temporalEmpleado);
    }

    public TemporalEmpleado findByToken(String token) {
        return temporalEmpleadoRepository.findByToken(token);
    }

    public void delete(TemporalEmpleado temporalEmpleado) {
        temporalEmpleadoRepository.delete(temporalEmpleado);
    }
}
