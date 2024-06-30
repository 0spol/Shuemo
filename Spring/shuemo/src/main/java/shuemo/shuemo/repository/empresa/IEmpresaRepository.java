package shuemo.shuemo.repository.empresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.empresa.Empresa;

@Repository
public interface IEmpresaRepository extends JpaRepository<Empresa, Long> {

}
