package shuemo.shuemo.service.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.empresa.Departamento;
import shuemo.shuemo.repository.empresa.IDepartamentoRepository;
import shuemo.shuemo.repository.empresa.IEmpresaRepository;
import shuemo.shuemo.repository.empresa.ITipoDepartamentoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DepartamentoService {

    @Autowired
    private IDepartamentoRepository departamentoRepository;

    @Autowired
    private IEmpresaRepository empresaRepository;

    @Autowired
    private ITipoDepartamentoRepository tipoDepartamentoRepository;

    public List<Departamento> findAll() {
        return departamentoRepository.findAll();
    }

    public Optional<Departamento> findById(Long id) {
        return departamentoRepository.findById(id);
    }

    public Departamento save(Departamento departamento) {
        if (departamento.getEmpresa() != null && departamento.getEmpresa().getId() != null) {
            departamento.setEmpresa(empresaRepository.findById(departamento.getEmpresa().getId()).orElse(null));
        }
        if (departamento.getTipoDept() != null && departamento.getTipoDept().getId() != null) {
            departamento
                    .setTipoDept(tipoDepartamentoRepository.findById(departamento.getTipoDept().getId()).orElse(null));
        }
        return departamentoRepository.save(departamento);
    }

    public Optional<Departamento> update(Long id, Departamento departamento) {
        return departamentoRepository.findById(id)
                .map(existingDepartamento -> {
                    existingDepartamento.setNombre(departamento.getNombre());
                    existingDepartamento.setDescripcion(departamento.getDescripcion());
                    if (departamento.getEmpresa() != null && departamento.getEmpresa().getId() != null) {
                        existingDepartamento
                                .setEmpresa(empresaRepository.findById(departamento.getEmpresa().getId()).orElse(null));
                    }
                    if (departamento.getTipoDept() != null && departamento.getTipoDept().getId() != null) {
                        existingDepartamento.setTipoDept(
                                tipoDepartamentoRepository.findById(departamento.getTipoDept().getId()).orElse(null));
                    }
                    return departamentoRepository.save(existingDepartamento);
                });
    }

    public boolean deleteById(Long id) {
        if (departamentoRepository.existsById(id)) {
            departamentoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
