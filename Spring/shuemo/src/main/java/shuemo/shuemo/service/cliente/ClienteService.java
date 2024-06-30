package shuemo.shuemo.service.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shuemo.shuemo.domain.cliente.Cliente;
import shuemo.shuemo.repository.cliente.IClienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private IClienteRepository clienteRepository;

    public ClienteService(IClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> update(Long id, Cliente cliente) {
        return clienteRepository.findById(id)
                .map(existingCliente -> {
                    existingCliente.setNombre(cliente.getNombre());
                    existingCliente.setApellidoUno(cliente.getApellidoUno());
                    existingCliente.setEmail(cliente.getEmail());
                    existingCliente.setTelefonoUno(cliente.getTelefonoUno());
                    existingCliente.setTelefonoDos(cliente.getTelefonoDos());
                    existingCliente.setDireccion(cliente.getDireccion());
                    existingCliente.setCiudad(cliente.getCiudad());
                    existingCliente.setCodigoPostal(cliente.getCodigoPostal());
                    existingCliente.setDetalles(cliente.getDetalles());
                    existingCliente.setEmpresa(cliente.getEmpresa());
                    existingCliente.setCiudad(cliente.getCiudad());
                    return clienteRepository.save(existingCliente);
                });
    }

    public boolean deleteById(Long id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
