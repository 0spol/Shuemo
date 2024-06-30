package shuemo.shuemo.service.infraestructura;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.infraestructura.Ciudad;
import shuemo.shuemo.repository.infraestructura.ICiudadRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CiudadService {

    @Autowired
    private ICiudadRepository ciudadRepository;

    public List<Ciudad> findAll() {
        return ciudadRepository.findAll();
    }

    public Optional<Ciudad> findById(Long id) {
        return ciudadRepository.findById(id);
    }

    public Ciudad getCiudad(Long id) {
        return ciudadRepository.getReferenceById(id);
    }

    public Ciudad save(Ciudad ciudad) {
        return ciudadRepository.save(ciudad);
    }

    public Optional<Ciudad> update(Long id, Ciudad ciudad) {
        return ciudadRepository.findById(id)
                .map(existingCiudad -> {
                    existingCiudad.setNombre(ciudad.getNombre());
                    existingCiudad.setProvincia(ciudad.getProvincia());
                    return ciudadRepository.save(existingCiudad);
                });
    }

    public void deleteById(Long id) {
        ciudadRepository.deleteById(id);
    }
}
