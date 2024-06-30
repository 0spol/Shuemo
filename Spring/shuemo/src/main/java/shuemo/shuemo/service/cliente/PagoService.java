package shuemo.shuemo.service.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.cliente.Pago;
import shuemo.shuemo.repository.cliente.IPagoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PagoService {

    @Autowired
    private IPagoRepository pagoRepository;

    public List<Pago> findAll() {
        return pagoRepository.findAll();
    }

    public Optional<Pago> findById(Long id) {
        return pagoRepository.findById(id);
    }

    public Pago save(Pago pago) {
        return pagoRepository.save(pago);
    }

    public Optional<Pago> update(Long id, Pago pagoDetails) {
        return pagoRepository.findById(id).map(pago -> {
            pago.setFechaPago(pagoDetails.getFechaPago());
            pago.setFechaProxPago(pagoDetails.getFechaProxPago());
            pago.setMonto(pagoDetails.getMonto());
            pago.setDetalles(pagoDetails.getDetalles());
            pago.setCliente(pagoDetails.getCliente());
            pago.setTipoMoneda(pagoDetails.getTipoMoneda());
            pago.setMetodoPago(pagoDetails.getMetodoPago());
            return pagoRepository.save(pago);
        });
    }

    public boolean deleteById(Long id) {
        if (pagoRepository.existsById(id)) {
            pagoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
