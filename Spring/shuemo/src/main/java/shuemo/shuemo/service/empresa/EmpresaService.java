package shuemo.shuemo.service.empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shuemo.shuemo.domain.cliente.Cita;
import shuemo.shuemo.domain.cliente.Cliente;
import shuemo.shuemo.domain.cliente.Pago;
import shuemo.shuemo.domain.empleado.Empleado;
import shuemo.shuemo.domain.empresa.Departamento;
import shuemo.shuemo.domain.empresa.Empresa;
import shuemo.shuemo.repository.cliente.IClienteRepository;
import shuemo.shuemo.repository.empresa.IEmpresaRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private IEmpresaRepository empresaRepository;

    @Autowired
    IClienteRepository clienteRepository;

    public List<Empresa> findAll() {
        return empresaRepository.findAll();
    }

    public Optional<Empresa> findById(Long id) {
        return empresaRepository.findById(id);
    }

    public Empresa save(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public Optional<Empresa> update(Long id, Empresa empresa) {
        return empresaRepository.findById(id).map(existingEmpresa -> {
            existingEmpresa.setNombre(empresa.getNombre());
            existingEmpresa.setCif(empresa.getCif());
            existingEmpresa.setDireccion(empresa.getDireccion());
            existingEmpresa.setTelefonoUno(empresa.getTelefonoUno());
            existingEmpresa.setTelefonoDos(empresa.getTelefonoDos());
            existingEmpresa.setFax(empresa.getFax());
            existingEmpresa.setEmail(empresa.getEmail());
            existingEmpresa.setTipoEmpresa(empresa.getTipoEmpresa());
            existingEmpresa.setCiudad(empresa.getCiudad());
            return empresaRepository.save(existingEmpresa);
        });
    }

    public boolean deleteById(Long id) {
        if (empresaRepository.existsById(id)) {
            empresaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Collection<Cita> findCitasEmpresa(Long id) {
        Collection<Cita> citas = new ArrayList<>();

        Collection<Cliente> clientes = empresaRepository.getReferenceById(id).getClientes();

        for (Cliente cliente : clientes) {
            citas.addAll(cliente.getCitas());
        }

        return citas;
    }

    public Collection<Empleado> findEmpleadosEmpresa(Long id) {
        Collection<Empleado> empleados = new ArrayList<>();

        Collection<Departamento> departamentos = empresaRepository.getReferenceById(id).getDepartamentos();

        for (Departamento departamento : departamentos) {
            empleados.addAll(departamento.getEmpleados());
        }

        return empleados;
    }

    public Collection<Departamento> findDepartamentosEmpresa(Long id) {
        return empresaRepository.getReferenceById(id).getDepartamentos();
    }

    public Collection<Cliente> findClientesEmpresa(Long idEmpresa) {
        Empresa empresa = empresaRepository.findById(idEmpresa).orElse(null);
        if (empresa != null) {
            return clienteRepository.findByEmpresa(empresa);
        }
        return new ArrayList<>();
    }

    public Collection<Pago> findPagosEmpresa(Long id) {
        Collection<Pago> pagos = new ArrayList<>();

        Collection<Cliente> clientes = empresaRepository.getReferenceById(id).getClientes();

        for (Cliente cliente : clientes) {
            pagos.addAll(cliente.getPagos());
        }

        return pagos;
    }
}
