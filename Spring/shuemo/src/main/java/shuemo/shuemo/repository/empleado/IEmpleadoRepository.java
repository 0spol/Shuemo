package shuemo.shuemo.repository.empleado;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.empleado.Empleado;

@Repository
public interface IEmpleadoRepository extends JpaRepository<Empleado, Long> {

    // Collection<Empleado> findByNombreUno(String nombre);

    Empleado findByDni(String dni);

    Empleado findByEmail(String email);

    Empleado findByMovil(String movil);

    boolean existsByEmail(String email);
}
