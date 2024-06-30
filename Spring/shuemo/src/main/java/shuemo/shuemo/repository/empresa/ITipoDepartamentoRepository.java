package shuemo.shuemo.repository.empresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.empresa.TipoDepartamento;

@Repository
public interface ITipoDepartamentoRepository extends JpaRepository<TipoDepartamento, Long> {

}
