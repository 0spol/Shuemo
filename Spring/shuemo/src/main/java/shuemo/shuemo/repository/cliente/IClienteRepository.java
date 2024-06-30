package shuemo.shuemo.repository.cliente;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.cliente.Cliente;
import shuemo.shuemo.domain.empresa.Empresa;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Long> {
    Collection<Cliente> findByEmpresa(Empresa empresa);
}
