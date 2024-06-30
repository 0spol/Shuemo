package shuemo.shuemo.repository.infraestructura;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import shuemo.shuemo.domain.infraestructura.Pais;

@Repository
public interface IPaisRepository extends JpaRepository<Pais, Long> {

}