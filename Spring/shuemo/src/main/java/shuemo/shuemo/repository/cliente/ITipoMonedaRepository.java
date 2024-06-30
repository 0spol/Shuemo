package shuemo.shuemo.repository.cliente;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.cliente.TipoMoneda;

@Repository
public interface ITipoMonedaRepository extends JpaRepository<TipoMoneda, Long> {
    Collection<TipoMoneda> findByNombre(String nombre);
}
