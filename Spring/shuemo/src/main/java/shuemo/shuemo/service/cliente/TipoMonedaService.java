package shuemo.shuemo.service.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shuemo.shuemo.domain.cliente.TipoMoneda;
import shuemo.shuemo.repository.cliente.ITipoMonedaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TipoMonedaService {

    @Autowired
    private ITipoMonedaRepository tipoMonedaRepository;

    public List<TipoMoneda> findAll() {
        return tipoMonedaRepository.findAll();
    }

    public Optional<TipoMoneda> findById(Long id) {
        return tipoMonedaRepository.findById(id);
    }

    public TipoMoneda save(TipoMoneda tipoMoneda) {
        return tipoMonedaRepository.save(tipoMoneda);
    }

    @Transactional
    public Optional<TipoMoneda> update(Long id, TipoMoneda tipoMoneda) {
        return tipoMonedaRepository.findById(id)
                .map(existingTipoMoneda -> {
                    existingTipoMoneda.setNombre(tipoMoneda.getNombre());
                    return tipoMonedaRepository.save(existingTipoMoneda);
                });
    }

    public boolean deleteById(Long id) {
        if (tipoMonedaRepository.existsById(id)) {
            tipoMonedaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
