package shuemo.shuemo.repository.empleado;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import shuemo.shuemo.domain.empleado.TemporalEmpleado;

@Repository
public interface TemporalEmpleadoRepository extends JpaRepository<TemporalEmpleado, Long> {
    TemporalEmpleado findByToken(String token);
}
