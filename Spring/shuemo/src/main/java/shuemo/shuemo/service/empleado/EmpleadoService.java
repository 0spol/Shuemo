package shuemo.shuemo.service.empleado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shuemo.shuemo.domain.empleado.Empleado;
import shuemo.shuemo.repository.empleado.IEmpleadoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoService {

    @Autowired
    private IEmpleadoRepository empleadoRepository;

    public List<Empleado> findAll() {
        return empleadoRepository.findAll();
    }

    public Optional<Empleado> findById(Long id) {
        return empleadoRepository.findById(id);
    }

    public Empleado findByEmail(String email) {
        return empleadoRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public Empleado findByEmailWithRoles(String email) {
        Empleado empleado = empleadoRepository.findByEmail(email);
        if (empleado != null) {
            // Forzar la inicialización de roles
            empleado.getRoles().size();
        }
        return empleado;
    }

    @Transactional
    public Empleado save(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    @Transactional
    public Optional<Empleado> update(Long id, Empleado empleado) {
        return empleadoRepository.findById(id).map(existingEmpleado -> {
            existingEmpleado.setDni(empleado.getDni());
            existingEmpleado.setNombre(empleado.getNombre());
            existingEmpleado.setApellidos(empleado.getApellidos());
            existingEmpleado.setPasswd(empleado.getPasswd());
            existingEmpleado.setEmail(empleado.getEmail());
            existingEmpleado.setTelefonoUno(empleado.getTelefonoUno());
            existingEmpleado.setTelefonoDos(empleado.getTelefonoDos());
            existingEmpleado.setMovil(empleado.getMovil());
            existingEmpleado.setDetalles(empleado.getDetalles());
            existingEmpleado.setTieneCuentaUsuario(empleado.isTieneCuentaUsuario());
            existingEmpleado.setDeshabilitado(empleado.isDeshabilitado());
            existingEmpleado.setDepartamento(empleado.getDepartamento());
            return empleadoRepository.save(existingEmpleado);
        });
    }

    @Transactional
    public boolean deleteById(Long id) {
        if (empleadoRepository.existsById(id)) {
            empleadoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean existsByEmail(String email) {
        return empleadoRepository.existsByEmail(email);
    }

}
