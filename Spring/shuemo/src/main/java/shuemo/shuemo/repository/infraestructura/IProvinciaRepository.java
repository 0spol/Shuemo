package shuemo.shuemo.repository.infraestructura;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import shuemo.shuemo.domain.infraestructura.Provincia;

import java.util.Collection;

@Repository
public interface IProvinciaRepository extends JpaRepository<Provincia, Long> {

    Collection<Provincia> findByNombre(String nombre);
}
