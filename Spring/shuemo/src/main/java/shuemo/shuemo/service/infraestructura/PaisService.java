package shuemo.shuemo.service.infraestructura;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shuemo.shuemo.domain.infraestructura.Pais;
import shuemo.shuemo.repository.infraestructura.IPaisRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PaisService {

    @Autowired
    private IPaisRepository paisRepository;

    public List<Pais> findAll() {
        return paisRepository.findAll();
    }

    public Optional<Pais> findById(Long id) {
        return paisRepository.findById(id);
    }

    public Pais save(Pais pais) {
        return paisRepository.save(pais);
    }

    public Optional<Pais> update(Long id, Pais pais) {
        return paisRepository.findById(id).map(existingPais -> {
            existingPais.setNombre(pais.getNombre());
            existingPais.setActivo(pais.isActivo());
            return paisRepository.save(existingPais);
        });
    }

    public boolean deleteById(Long id) {
        if (paisRepository.existsById(id)) {
            paisRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
