package shuemo.shuemo.service.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.empresa.TipoEmpresa;
import shuemo.shuemo.repository.empresa.ITipoEmpresaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TipoEmpresaService {

    @Autowired
    private ITipoEmpresaRepository tipoEmpresaRepository;

    public List<TipoEmpresa> findAll() {
        return tipoEmpresaRepository.findAll();
    }

    public Optional<TipoEmpresa> findById(Long id) {
        return tipoEmpresaRepository.findById(id);
    }

    public TipoEmpresa getTipoEmpresa(Long id) {
        return tipoEmpresaRepository.getReferenceById(id);
    }

    public TipoEmpresa save(TipoEmpresa tipoEmpresa) {
        return tipoEmpresaRepository.save(tipoEmpresa);
    }

    public Optional<TipoEmpresa> update(Long id, TipoEmpresa tipoEmpresa) {
        return tipoEmpresaRepository.findById(id).map(existingTipoEmpresa -> {
            existingTipoEmpresa.setNombre(tipoEmpresa.getNombre());
            existingTipoEmpresa.setDescripcion(tipoEmpresa.getDescripcion());
            return tipoEmpresaRepository.save(existingTipoEmpresa);
        });
    }

    public boolean deleteById(Long id) {
        if (tipoEmpresaRepository.existsById(id)) {
            tipoEmpresaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
