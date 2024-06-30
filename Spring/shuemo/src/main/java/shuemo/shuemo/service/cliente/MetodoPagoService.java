package shuemo.shuemo.service.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.cliente.MetodoPago;
import shuemo.shuemo.repository.cliente.IMetodoPagoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MetodoPagoService {

    @Autowired
    private IMetodoPagoRepository metodoPagoRepository;

    public List<MetodoPago> findAll() {
        return metodoPagoRepository.findAll();
    }

    public Optional<MetodoPago> findById(Long id) {
        return metodoPagoRepository.findById(id);
    }

    public MetodoPago save(MetodoPago metodoPago) {
        return metodoPagoRepository.save(metodoPago);
    }

    public Optional<MetodoPago> update(Long id, MetodoPago metodoPago) {
        return metodoPagoRepository.findById(id)
                .map(existingMetodoPago -> {
                    existingMetodoPago.setNombre(metodoPago.getNombre());
                    return metodoPagoRepository.save(existingMetodoPago);
                });
    }

    public boolean deleteById(Long id) {
        if (metodoPagoRepository.existsById(id)) {
            metodoPagoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
