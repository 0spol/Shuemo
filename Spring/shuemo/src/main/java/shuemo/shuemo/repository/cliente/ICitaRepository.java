package shuemo.shuemo.repository.cliente;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import shuemo.shuemo.domain.cliente.Cita;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ICitaRepository extends CrudRepository<Cita, Long> {
    @Query("SELECT c FROM Cita c JOIN FETCH c.cliente cl LEFT JOIN FETCH cl.empresa WHERE c.fechaHoraInicio BETWEEN :start AND :end")
    List<Cita> findCitasBetween(LocalDateTime start, LocalDateTime end);
}
