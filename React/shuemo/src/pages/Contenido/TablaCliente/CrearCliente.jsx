import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function CrearCliente({ clienteId = null, clienteInicial = null, deshabilitarModulo, onSave, isUpdating = false }) {
  const { token, user } = useAuth();
  const [cliente, setCliente] = useState({
    nombre: '',
    apellidoUno: '',
    email: '',
    telefonoUno: '',
    telefonoDos: '',
    direccion: '',
    codigoPostal: '',
    detalles: '',
    ciudadId: '',
    empresaId: ''
  });
  const [errores, setErrores] = useState({});
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/ciudad/r`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setCiudades(data))
      .catch(error => console.error('Error fetching cities:', error));

    if (isUpdating && clienteId) {
      fetch(`${BACKEND_URL}/api/cliente/${clienteId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch client');
          }
          return response.json();
        })
        .then(data => {
          setCliente(prevState => ({
            ...prevState,
            ...data,
            ciudadId: data.ciudad.id,
            empresaId: data.empresa.id,
          }));
        })
        .catch(error => console.error('Error fetching client:', error));
    }
  }, [clienteId, isUpdating, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCliente(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!cliente.nombre.trim()) newErrors.nombre = "El nombre no puede estar vacío.";
    if (!/\S+@\S+\.\S+/.test(cliente.email)) newErrors.email = "Debe ser un correo electrónico válido.";
    if (cliente.telefonoUno && (cliente.telefonoUno.length < 9 || cliente.telefonoUno.length > 15)) newErrors.telefonoUno = "El teléfono debe tener entre 9 y 15 caracteres.";
    if (cliente.telefonoDos && (cliente.telefonoDos.length < 9 || cliente.telefonoDos.length > 15)) newErrors.telefonoDos = "El teléfono debe tener entre 9 y 15 caracteres.";
    if (cliente.codigoPostal && (cliente.codigoPostal.length < 4 || cliente.codigoPostal.length > 10)) newErrors.codigoPostal = "El código postal debe tener entre 4 y 10 caracteres.";
    if (cliente.detalles.length > 200) newErrors.detalles = "Los detalles no pueden superar los 200 caracteres.";
    if (!cliente.ciudadId) newErrors.ciudadId = "Debe seleccionar una ciudad.";

    setErrores(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const clienteData = {
        ...cliente,
        ciudad: { id: cliente.ciudadId },
        empresa: { id: user.idEmpresa },
      };

      const apiUrl = isUpdating ? `${BACKEND_URL}/api/cliente/u/${clienteId}` : `${BACKEND_URL}/api/cliente/c`;
      const method = isUpdating ? 'PUT' : 'POST';

      try {
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(clienteData)
        });

        if (response.ok) {
          onSave();
          deshabilitarModulo();
        } else {
          throw new Error('Failed to save the client');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrores({ form: 'Error al enviar el formulario. Revise los datos introducidos.' });
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-fondo-200 border-borde-100 p-6 rounded-lg">
      <h1 className="text-2xl mb-4 text-brillante-100">{isUpdating ? 'Actualizar' : 'Crear'} Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="nombre" className="mb-2 text-white">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={cliente.nombre} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.nombre && <p className="text-red-500 text-xs">{errores.nombre}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="apellidoUno" className="mb-2 text-white">Apellido:</label>
            <input type="text" id="apellidoUno" name="apellidoUno" value={cliente.apellidoUno} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-white">Email:</label>
            <input type="email" id="email" name="email" value={cliente.email} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.email && <p className="text-red-500 text-xs">{errores.email}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefonoUno" className="mb-2 text-white">Teléfono Uno:</label>
            <input type="text" id="telefonoUno" name="telefonoUno" value={cliente.telefonoUno} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
            {errores.telefonoUno && <p className="text-red-500 text-xs">{errores.telefonoUno}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefonoDos" className="mb-2 text-white">Teléfono Dos:</label>
            <input type="text" id="telefonoDos" name="telefonoDos" value={cliente.telefonoDos} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
            {errores.telefonoDos && <p className="text-red-500 text-xs">{errores.telefonoDos}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="direccion" className="mb-2 text-white">Dirección:</label>
            <input type="text" id="direccion" name="direccion" value={cliente.direccion} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="codigoPostal" className="mb-2 text-white">Código Postal:</label>
            <input type="text" id="codigoPostal" name="codigoPostal" value={cliente.codigoPostal} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
            {errores.codigoPostal && <p className="text-red-500 text-xs">{errores.codigoPostal}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="detalles" className="mb-2 text-white">Detalles:</label>
            <textarea id="detalles" name="detalles" value={cliente.detalles} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" maxLength="200" />
            {errores.detalles && <p className="text-red-500 text-xs">{errores.detalles}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="ciudadId" className="mb-2 text-white">Ciudad:</label>
            <select
              value={cliente.ciudadId}
              onChange={e => handleChange({ target: { name: 'ciudadId', value: e.target.value } })}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              id="ciudadId"
              name="ciudadId"
              required
            >
              <option value="">Seleccionar Ciudad</option>
              {ciudades.map(ciudad => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>
            {errores.ciudadId && <p className="text-red-500 text-xs">{errores.ciudadId}</p>}
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 border border-transparent rounded text-white"
            size="M"
          >
            {isUpdating ? 'Actualizar Cliente' : 'Agregar Cliente'}
          </button>
          <button
            onClick={deshabilitarModulo}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 border border-transparent rounded text-white"
            size="M"
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
}

export default CrearCliente;
