package shuemo.shuemo.repository.empresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.empresa.TipoEmpresa;

@Repository
public interface ITipoEmpresaRepository extends JpaRepository<TipoEmpresa, Long> {

}
