package shuemo.shuemo.repository.cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.cliente.Pago;

@Repository
public interface IPagoRepository extends JpaRepository<Pago, Long> {
    
}
