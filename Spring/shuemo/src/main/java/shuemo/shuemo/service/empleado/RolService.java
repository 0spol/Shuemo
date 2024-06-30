package shuemo.shuemo.service.empleado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.empleado.Rol;
import shuemo.shuemo.repository.empleado.IRolRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    @Autowired
    private IRolRepository rolRepository;

    public List<Rol> findAll() {
        return rolRepository.findAll();
    }

    public Optional<Rol> findById(Long id) {
        return rolRepository.findById(id);
    }

    public Rol getRol(Long id) {
        return rolRepository.getReferenceById(id);
    }

    public Rol save(Rol rol) {
        return rolRepository.save(rol);
    }

    public Optional<Rol> update(Long id, Rol rolDetails) {
        return rolRepository.findById(id)
                .map(rol -> {
                    rol.setNombre(rolDetails.getNombre());
                    return rolRepository.save(rol);
                });
    }

    public boolean deleteById(Long id) {
        if (rolRepository.existsById(id)) {
            rolRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
