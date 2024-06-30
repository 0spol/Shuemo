import React, { useState, useEffect } from 'react';
import { BotonAccion } from '../../../component/Botones/Botones';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function CrearEmpleado({ empleadoId = null, deshabilitarModulo, onSave, isUpdating = false }) {
  const { token, user } = useAuth();
  const [empleado, setEmpleado] = useState({
    nombre: '',
    apellidos: '',
    passwd: '',
    email: '',
    dni: '',
    telefonoUno: '',
    telefonoDos: '',
    movil: '',
    detalles: '',
    tieneCuentaUsuario: false,
    deshabilitado: false,
    departamento: null,
    roles: []
  });
  const [errores, setErrores] = useState({});
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    if (user?.idEmpresa) {
      fetch(`${BACKEND_URL}/api/empresa/${user.idEmpresa}/departamentos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(data => setDepartamentos(data))
        .catch(error => console.error('Error fetching departments:', error));
    }

    if (isUpdating && empleadoId) {
      fetch(`${BACKEND_URL}/api/empleado/${empleadoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch employee');
          }
          return response.json();
        })
        .then(data => {
          setEmpleado({
            nombre: data.nombre || '',
            apellidos: data.apellidos || '',
            passwd: '',
            email: data.email || '',
            dni: data.dni || '',
            telefonoUno: data.telefonoUno || '',
            telefonoDos: data.telefonoDos || '',
            movil: data.movil || '',
            detalles: data.detalles || '',
            tieneCuentaUsuario: data.tieneCuentaUsuario,
            deshabilitado: data.deshabilitado,
            departamento: data.departamento ? data.departamento.id : null,
            roles: data.roles || []
          });
          console.log("Empleado cargado para actualización:", data);
        })
        .catch(error => console.error('Error fetching employee:', error));
    }
  }, [empleadoId, isUpdating, token, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpleado(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  function validarContrasena(contrasena) {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,}$/;
    return regex.test(contrasena);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!empleado.nombre.trim()) newErrors.nombre = "El nombre no puede estar vacío.";
    if (!empleado.apellidos.trim()) newErrors.apellidos = "Los apellidos no pueden estar vacíos.";
    if (!isUpdating) {
      if (empleado.passwd.length < 6) {
        newErrors.passwd = "La contraseña debe tener al menos 6 caracteres.";
      } else if (!validarContrasena(empleado.passwd)) {
        newErrors.passwd = "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial";
      }
    }
    if (!/\S+@\S+\.\S+/.test(empleado.email)) newErrors.email = "Debe ser un correo electrónico válido.";
    if (empleado.dni.length < 9 || empleado.dni.length > 12) newErrors.dni = "El DNI debe tener entre 9 y 12 caracteres.";
    if (empleado.telefonoUno && (empleado.telefonoUno.length < 9 || empleado.telefonoUno.length > 15)) newErrors.telefonoUno = "El teléfono debe tener entre 9 y 15 caracteres.";
    if (empleado.movil && (empleado.movil.length < 9 || empleado.movil.length > 15)) newErrors.movil = "El móvil debe tener entre 9 y 15 caracteres.";
    if (empleado.detalles.length > 200) newErrors.detalles = "Los detalles no pueden superar los 200 caracteres.";
    if (empleado.tieneCuentaUsuario === null) newErrors.tieneCuentaUsuario = "Debe especificar si tiene cuenta de usuario.";
    if (empleado.deshabilitado === null) newErrors.deshabilitado = "Debe especificar si está deshabilitado.";
    if (!empleado.departamento) newErrors.departamento = "Debe seleccionar un departamento.";
    
    setErrores(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const apiUrl = isUpdating ? `${BACKEND_URL}/api/empleado/u/${empleadoId}` : `${BACKEND_URL}/api/empleado/cInApp`;
      const method = isUpdating ? 'PUT' : 'POST';

      const payload = JSON.stringify({
        ...empleado,
        departamento: { id: empleado.departamento }
      });
      console.log('Payload antes de enviar:', payload);

      try {
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: payload
        });

        if (response.ok) {
          console.log(`${isUpdating ? 'Updated' : 'Created'} successfully`);
          onSave();
          deshabilitarModulo();
        } else {
          if (response.status === 403) {
            setErrores({ form: 'No tiene permisos para realizar esta acción.' });
          } else {
            throw new Error('Failed to save the employee');
          }
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrores({ form: 'Error al enviar el formulario. Revise los datos introducidos.' });
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-fondo-200 border-borde-100 p-6 rounded-lg">
      <h1 className="text-2xl mb-4 text-brillante-100">{isUpdating ? 'Actualizar' : 'Crear'} Empleado</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="nombre" className="mb-2 text-white">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={empleado.nombre} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.nombre && <p className="text-red-500 text-xs">{errores.nombre}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="apellidos" className="mb-2 text-white">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" value={empleado.apellidos} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.apellidos && <p className="text-red-500 text-xs">{errores.apellidos}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-white">Email:</label>
            <input type="email" id="email" name="email" value={empleado.email} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.email && <p className="text-red-500 text-xs">{errores.email}</p>}
          </div>
          {!isUpdating && (
            <div className="flex flex-col">
              <label htmlFor="passwd" className="mb-2 text-white">Contraseña:</label>
              <input type="password" id="passwd" name="passwd" value={empleado.passwd} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
              {errores.passwd && <p className="text-red-500 text-xs">{errores.passwd}</p>}
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="dni" className="mb-2 text-white">DNI:</label>
            <input type="text" id="dni" name="dni" value={empleado.dni} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.dni && <p className="text-red-500 text-xs">{errores.dni}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefonoUno" className="mb-2 text-white">Teléfono Uno:</label>
            <input type="text" id="telefonoUno" name="telefonoUno" value={empleado.telefonoUno} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
            {errores.telefonoUno && <p className="text-red-500 text-xs">{errores.telefonoUno}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefonoDos" className="mb-2 text-white">Teléfono Dos:</label>
            <input type="text" id="telefonoDos" name="telefonoDos" value={empleado.telefonoDos} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
            {errores.telefonoDos && <p className="text-red-500 text-xs">{errores.telefonoDos}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="movil" className="mb-2 text-white">Móvil:</label>
            <input type="text" id="movil" name="movil" value={empleado.movil} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
            {errores.movil && <p className="text-red-500 text-xs">{errores.movil}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="detalles" className="mb-2 text-white">Detalles:</label>
            <textarea id="detalles" name="detalles" value={empleado.detalles} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" maxLength="200" />
            {errores.detalles && <p className="text-red-500 text-xs">{errores.detalles}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="departamento" className="mb-2 text-white">Departamento:</label>
            <select value={empleado.departamento || ''} onChange={e => {
              setEmpleado(prevState => ({
                ...prevState,
                departamento: parseInt(e.target.value)
              }));
            }} className="border borde-100 p-2 rounded-md bg-fondo-300" id="departamento" name="departamento" required>
              <option value="" disabled>Seleccione un departamento</option>
              {departamentos.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.nombre} - {dept.descripcion}
                </option>
              ))}
            </select>
            {errores.departamento && <p className="text-red-500 text-xs">{errores.departamento}</p>}
          </div><br/><br/>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="tieneCuentaUsuario" name="tieneCuentaUsuario" checked={empleado.tieneCuentaUsuario} onChange={handleChange} className="mr-2 h-4 w-4" />
            <label htmlFor="tieneCuentaUsuario" className="text-white">¿Quiere generar una cuenta para este empleado?</label>
            {errores.tieneCuentaUsuario && <p className="text-red-500 text-xs">{errores.tieneCuentaUsuario}</p>}
          </div>
          <br/>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="deshabilitado" name="deshabilitado" checked={empleado.deshabilitado} onChange={handleChange} className="mr-2 h-4 w-4" />
            <label htmlFor="deshabilitado" className="text-white">¿Está deshabilitado?</label>
            {errores.deshabilitado && <p className="text-red-500 text-xs">{errores.deshabilitado}</p>}
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <BotonAccion
            onclick={handleSubmit}
            contenido={isUpdating ? 'Actualizar Empleado' : 'Agregar Empleado'}
            size="M"
          />
          <BotonAccion
            onclick={deshabilitarModulo}
            contenido="Cancelar"
            size="M"
            className="bg-red-500 hover:bg-red-600"
          />
        </div>
      </form>
    </div>
  );
}

export default CrearEmpleado;
