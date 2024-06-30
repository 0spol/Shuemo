import React, { useState, useEffect } from 'react';
import { BotonAccion } from '../../../component/Botones/Botones';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';
import { useNavigate } from 'react-router-dom';

function ModificarEmpresa({ empresaId = null, empresaInicial = null, deshabilitarModulo, onSave = () => { }, isUpdating = false }) {
  const { token } = useAuth(); // Obtener el token del contexto de autenticación
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState({
    nombre: '',
    cif: '',
    direccion: '',
    email: '',
    fax: '',
    telefonoUno: '',
    telefonoDos: '',
    ciudad_id: '',
    tipo_empresa_id: ''
  });
  const [errores, setErrores] = useState({});
  const [tiposEmpresa, setTiposEmpresa] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    const fetchTiposEmpresa = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/tipoEmpresa/r`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tipos de empresa');
        }
        const data = await response.json();
        setTiposEmpresa(data);
      } catch (error) {
        console.error('Error fetching tipos de empresa:', error);
      }
    };

    const fetchCiudades = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/ciudad/r`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch ciudades');
        }
        const data = await response.json();
        setCiudades(data);
      } catch (error) {
        console.error('Error fetching ciudades:', error);
      }
    };

    fetchTiposEmpresa();
    fetchCiudades();

    if (isUpdating && empresaId) {
      fetch(`${BACKEND_URL}/api/empresa/${empresaId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch empresa');
          }
          return response.json();
        })
        .then(data => {
          setEmpresa({
            nombre: data.nombre || '',
            cif: data.cif || '',
            direccion: data.direccion || '',
            email: data.email || '',
            fax: data.fax || '',
            telefonoUno: data.telefonoUno || '',
            telefonoDos: data.telefonoDos || '',
            ciudad_id: data.ciudad ? data.ciudad.id.toString() : '',
            tipo_empresa_id: data.tipoEmpresa ? data.tipoEmpresa.id.toString() : ''
          });
        })
        .catch(error => console.error('Error fetching empresa:', error));
    } else if (empresaInicial) {
      setEmpresa({
        nombre: empresaInicial.nombre || '',
        cif: empresaInicial.cif || '',
        direccion: empresaInicial.direccion || '',
        email: empresaInicial.email || '',
        fax: empresaInicial.fax || '',
        telefonoUno: empresaInicial.telefonoUno || '',
        telefonoDos: empresaInicial.telefonoDos || '',
        ciudad_id: empresaInicial.ciudad_id ? empresaInicial.ciudad_id.toString() : '',
        tipo_empresa_id: empresaInicial.tipo_empresa_id ? empresaInicial.tipo_empresa_id.toString() : ''
      });
    }
  }, [empresaId, isUpdating, token, empresaInicial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpresa(prevState => ({
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
    const telefonoRegex = /^\d+$/; // Expresión regular para solo números

    if (!empresa.nombre.trim()) newErrors.nombre = "El nombre no puede estar vacío.";
    if (!empresa.cif.trim()) newErrors.cif = "El CIF no puede estar vacío.";
    if (!empresa.direccion.trim()) newErrors.direccion = "La dirección no puede estar vacía.";
    if (empresa.telefonoUno.length < 9 || empresa.telefonoUno.length > 15 || !telefonoRegex.test(empresa.telefonoUno)) {
      newErrors.telefonoUno = "El teléfono 1 debe tener entre 9 y 15 caracteres y contener solo números.";
    }
    if (empresa.telefonoDos.length < 9 || empresa.telefonoDos.length > 15 || !telefonoRegex.test(empresa.telefonoDos)) {
      newErrors.telefonoDos = "El teléfono 2 debe tener entre 9 y 15 caracteres y contener solo números.";
    }
    if (!/\S+@\S+\.\S+/.test(empresa.email)) newErrors.email = "Debe ser un correo electrónico válido.";
    if (!empresa.ciudad_id) newErrors.ciudad_id = "La ciudad no puede estar vacía.";
    if (!empresa.tipo_empresa_id) newErrors.tipo_empresa_id = "El tipo de empresa no puede estar vacío.";

    setErrores(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const apiUrl = isUpdating && empresaId ? `${BACKEND_URL}/api/empresa/u/${empresaId}` : `${BACKEND_URL}/api/empresa/c`;
      const method = isUpdating && empresaId ? 'PUT' : 'POST';

      try {
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...empresa,
            tipoEmpresa: { id: Number(empresa.tipo_empresa_id) },
            ciudad: { id: Number(empresa.ciudad_id) }
          })
        });

        if (response.ok) {
          console.log(`${isUpdating ? 'Updated' : 'Created'} successfully`);
          onSave();
          deshabilitarModulo();
          navigate('/'); // Redirigir a home después de guardar
        } else {
          throw new Error('Failed to save the empresa');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrores({ form: 'Error al enviar el formulario. Revise los datos introducidos.' });
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-fondo-200 border-borde-100 p-6 rounded-lg">
      <h1 className="text-2xl mb-4 text-brillante-100">{isUpdating ? 'Actualizar' : 'Crear'} Empresa</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="nombre" className="mb-2 text-white">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={empresa.nombre} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.nombre && <p className="text-red-500 text-xs">{errores.nombre}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="cif" className="mb-2 text-white">CIF:</label>
            <input type="text" id="cif" name="cif" value={empresa.cif} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.cif && <p className="text-red-500 text-xs">{errores.cif}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="direccion" className="mb-2 text-white">Dirección:</label>
            <input type="text" id="direccion" name="direccion" value={empresa.direccion} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.direccion && <p className="text-red-500 text-xs">{errores.direccion}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-white">Email:</label>
            <input type="email" id="email" name="email" value={empresa.email} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.email && <p className="text-red-500 text-xs">{errores.email}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="fax" className="mb-2 text-white">Fax:</label>
            <input type="text" id="fax" name="fax" value={empresa.fax} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.fax && <p className="text-red-500 text-xs">{errores.fax}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefonoUno" className="mb-2 text-white">Teléfono 1:</label>
            <input type="text" id="telefonoUno" name="telefonoUno" value={empresa.telefonoUno} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.telefonoUno && <p className="text-red-500 text-xs">{errores.telefonoUno}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefonoDos" className="mb-2 text-white">Teléfono 2:</label>
            <input type="text" id="telefonoDos" name="telefonoDos" value={empresa.telefonoDos} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" />
            {errores.telefonoDos && <p className="text-red-500 text-xs">{errores.telefonoDos}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="ciudad_id" className="mb-2 text-white">Ciudad:</label>
            <select
              id="ciudad_id"
              name="ciudad_id"
              value={empresa.ciudad_id}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            >
              <option value="">Seleccionar Ciudad</option>
              {ciudades.map(ciudad => (
                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
              ))}
            </select>
            {errores.ciudad_id && <p className="text-red-500 text-xs">{errores.ciudad_id}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="tipo_empresa_id" className="mb-2 text-white">Tipo de Empresa:</label>
            <select
              id="tipo_empresa_id"
              name="tipo_empresa_id"
              value={empresa.tipo_empresa_id}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            >
              <option value="">Seleccionar Tipo de Empresa</option>
              {tiposEmpresa.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
              ))}
            </select>
            {errores.tipo_empresa_id && <p className="text-red-500 text-xs">{errores.tipo_empresa_id}</p>}
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <BotonAccion
            onclick={handleSubmit}
            contenido={isUpdating ? 'Actualizar Empresa' : 'Agregar Empresa'}
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

export default ModificarEmpresa;
