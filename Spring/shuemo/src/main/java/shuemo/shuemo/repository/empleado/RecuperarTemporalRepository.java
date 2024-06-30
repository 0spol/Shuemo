package shuemo.shuemo.repository.empleado;

import org.springframework.data.jpa.repository.JpaRepository;
import shuemo.shuemo.domain.empleado.RecuperarTemporal;

public interface RecuperarTemporalRepository extends JpaRepository<RecuperarTemporal, Long> {
    RecuperarTemporal findByToken(String token);
}
