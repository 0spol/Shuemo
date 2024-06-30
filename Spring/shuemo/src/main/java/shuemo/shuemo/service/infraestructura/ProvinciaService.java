package shuemo.shuemo.service.infraestructura;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shuemo.shuemo.domain.infraestructura.Provincia;
import shuemo.shuemo.repository.infraestructura.IProvinciaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinciaService {

    @Autowired
    private IProvinciaRepository provinciaRepository;

    public List<Provincia> findAll() {
        return provinciaRepository.findAll();
    }

    public Optional<Provincia> findById(Long id) {
        return provinciaRepository.findById(id);
    }

    public Provincia save(Provincia provincia) {
        return provinciaRepository.save(provincia);
    }

    public Optional<Provincia> update(Long id, Provincia provincia) {
        return provinciaRepository.findById(id)
                .map(existingProvincia -> {
                    existingProvincia.setNombre(provincia.getNombre());
                    existingProvincia.setCp(provincia.getCp());
                    existingProvincia.setPais(provincia.getPais());
                    return provinciaRepository.save(existingProvincia);
                });
    }

    public boolean deleteById(Long id) {
        if (provinciaRepository.existsById(id)) {
            provinciaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
