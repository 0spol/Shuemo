import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function CrearCita({ citaInicial = null, deshabilitarModulo, onSave, isUpdating = false }) {
  const { token, user } = useAuth();
  const [cita, setCita] = useState({
    id: '',
    fecha: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    ubicacion: '',
    descripcion: '',
    cliente: ''
  });

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const resClientes = await fetch(`${BACKEND_URL}/api/empresa/${user.idEmpresa}/clientes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!resClientes.ok) {
          throw new Error(`HTTP error! status: ${resClientes.status}`);
        }
        const dataClientes = await resClientes.json();
        setClientes(dataClientes);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    if (user?.idEmpresa) {
      cargarClientes();
    }

    if (citaInicial) {
      setCita({
        id: citaInicial.id || '',
        fecha: citaInicial.fecha || '',
        fechaHoraInicio: citaInicial.fechaHoraInicio || '',
        fechaHoraFin: citaInicial.fechaHoraFin || '',
        ubicacion: citaInicial.ubicacion || '',
        descripcion: citaInicial.descripcion || '',
        cliente: citaInicial.cliente?.id || ''
      });
    }
  }, [citaInicial, token, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCita(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!cita.fecha) errors.push("La fecha no puede estar vacía.");
    if (!cita.fechaHoraInicio) errors.push("La fecha y hora de inicio no pueden estar vacías.");
    if (!cita.fechaHoraFin) errors.push("La fecha y hora de fin no pueden estar vacías.");
    if (!cita.cliente) errors.push("Debe seleccionar un cliente.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (formErrors.length > 0) {
      alert(formErrors.join("\n"));
      return;
    }

    const apiUrl = isUpdating ? `${BACKEND_URL}/api/cita/u/${cita.id}` : `${BACKEND_URL}/api/cita/c`;
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...cita,
          cliente: { id: cita.cliente }
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      console.log(`${isUpdating ? 'Updated' : 'Created'} successfully`);
      onSave();
      deshabilitarModulo(); // Cierra el módulo de creación/edición
    } catch (error) {
      console.error('Error in submission:', error);
      alert('Error in submission: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-fondo-200 border-borde-100 p-6 rounded-md">
      <h1 className="text-2xl mb-4 text-brillante-100">{isUpdating ? 'Actualizar Cita' : 'Crear Cita'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fecha */}
          <div className="flex flex-col">
            <label htmlFor="fecha" className="mb-2 text-white">Fecha:</label>
            <input
              type="datetime-local"
              id="fecha"
              name="fecha"
              value={cita.fecha}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            />
          </div>
          {/* Fecha y Hora de Inicio */}
          <div className="flex flex-col">
            <label htmlFor="fechaHoraInicio" className="mb-2 text-white">Fecha y Hora de Inicio:</label>
            <input
              type="datetime-local"
              id="fechaHoraInicio"
              name="fechaHoraInicio"
              value={cita.fechaHoraInicio}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            />
          </div>
          {/* Fecha y Hora de Fin */}
          <div className="flex flex-col">
            <label htmlFor="fechaHoraFin" className="mb-2 text-white">Fecha y Hora de Fin:</label>
            <input
              type="datetime-local"
              id="fechaHoraFin"
              name="fechaHoraFin"
              value={cita.fechaHoraFin}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            />
          </div>
          {/* Ubicación */}
          <div className="flex flex-col">
            <label htmlFor="ubicacion" className="mb-2 text-white">Ubicación:</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={cita.ubicacion}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              maxLength="100"
            />
          </div>
          {/* Descripción */}
          <div className="flex flex-col">
            <label htmlFor="descripcion" className="mb-2 text-white">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={cita.descripcion}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              maxLength="200"
            />
          </div>
          {/* Cliente */}
          <div className="flex flex-col">
            <label htmlFor="cliente" className="mb-2 text-white">Cliente:</label>
            <select
              name="cliente"
              value={cita.cliente}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            {isUpdating ? 'Actualizar Cita' : 'Crear Cita'}
          </button>
          <button
            type="button"
            onClick={deshabilitarModulo}
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearCita;
