package shuemo.shuemo.repository.cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.cliente.MetodoPago;

@Repository
public interface IMetodoPagoRepository extends JpaRepository<MetodoPago, Long> {
}
