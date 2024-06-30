package shuemo.shuemo.service.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.empresa.TipoDepartamento;
import shuemo.shuemo.repository.empresa.ITipoDepartamentoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TipoDepartamentoService {

    @Autowired
    private ITipoDepartamentoRepository tipoDepartamentoRepository;

    public List<TipoDepartamento> findAll() {
        return tipoDepartamentoRepository.findAll();
    }

    public Optional<TipoDepartamento> findById(Long id) {
        return tipoDepartamentoRepository.findById(id);
    }

    public TipoDepartamento getTipoDepartamento(Long id) {
        return tipoDepartamentoRepository.getReferenceById(id);
    }

    public TipoDepartamento save(TipoDepartamento tipoDepartamento) {
        return tipoDepartamentoRepository.save(tipoDepartamento);
    }

    public void deleteById(Long id) {
        tipoDepartamentoRepository.deleteById(id);
    }
}
