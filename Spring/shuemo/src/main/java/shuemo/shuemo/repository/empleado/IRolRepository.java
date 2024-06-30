package shuemo.shuemo.repository.empleado;

import org.springframework.data.jpa.repository.JpaRepository;
import shuemo.shuemo.domain.empleado.Rol;

public interface IRolRepository extends JpaRepository<Rol, Long> {
    
}
