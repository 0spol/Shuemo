package shuemo.shuemo.repository.infraestructura;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import shuemo.shuemo.domain.infraestructura.Ciudad;

@Repository
public interface ICiudadRepository extends JpaRepository<Ciudad, Long> {
}
