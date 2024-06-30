package shuemo.shuemo.repository.empresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.empresa.Departamento;
import java.util.Collection;

@Repository
public interface IDepartamentoRepository extends JpaRepository<Departamento, Long> {

    Collection<Departamento> findByNombre(String nombre);
}
