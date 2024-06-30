import React, { useState, useEffect } from 'react';
import { BotonAccion } from '../../../component/Botones/Botones';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function CrearDepartamento({ departamentoId = null, departamentoInicial = null, deshabilitarModulo, onSave, isUpdating = false }) {
  const { token, user } = useAuth(); // Obtener el token del contexto de autenticación
  const [departamento, setDepartamento] = useState({
    nombre: '',
    descripcion: '',
    tipo_dept_id: '',
    empresa_id: ''
  });
  const [errores, setErrores] = useState({});
  const [tiposDept, setTiposDept] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/tipo-departamento/r`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => setTiposDept(data))
      .catch(error => console.error('Error fetching department types:', error));

    if (isUpdating && departamentoId) {
      fetch(`${BACKEND_URL}/api/departamento/g/${departamentoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(data => {
          setDepartamento({
            nombre: data.nombre || '',
            descripcion: data.descripcion || '',
            tipo_dept_id: data.tipoDept ? data.tipoDept.id : '',
            empresa_id: data.empresa ? data.empresa.id : ''
          });
        })
        .catch(error => console.error('Error fetching department:', error));
    }
  }, [departamentoId, isUpdating, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartamento(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!departamento.nombre.trim()) newErrors.nombre = "El nombre no puede estar vacío.";
    if (departamento.nombre.length < 3 || departamento.nombre.length > 100) newErrors.nombre = "El nombre debe tener entre 3 y 100 caracteres.";
    if (departamento.descripcion.length > 250) newErrors.descripcion = "La descripción no puede superar los 250 caracteres.";
    if (!departamento.tipo_dept_id) newErrors.tipo_dept_id = "Debe seleccionar un tipo de departamento.";

    setErrores(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const apiUrl = isUpdating ? `${BACKEND_URL}/api/departamento/u/${departamentoId}` : `${BACKEND_URL}/api/departamento/c`;
      const method = isUpdating ? 'PUT' : 'POST';

      try {
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...departamento,
            empresa: { id: user.idEmpresa },
            tipoDept: { id: departamento.tipo_dept_id }
          })
        });

        if (response.ok) {
          console.log(`${isUpdating ? 'Updated' : 'Created'} successfully`);
          onSave();
          deshabilitarModulo();
        } else {
          throw new Error('Failed to save the department');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrores({ form: 'Error al enviar el formulario. Revise los datos introducidos.' });
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-fondo-200 border-borde-100 p-6 rounded-lg">
      <h1 className="text-2xl mb-4 text-brillante-100">{isUpdating ? 'Actualizar' : 'Crear'} Departamento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="nombre" className="mb-2 text-white">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={departamento.nombre} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required />
            {errores.nombre && <p className="text-red-500 text-xs">{errores.nombre}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="descripcion" className="mb-2 text-white">Descripción:</label>
            <textarea id="descripcion" name="descripcion" value={departamento.descripcion} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" maxLength="250" />
            {errores.descripcion && <p className="text-red-500 text-xs">{errores.descripcion}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="tipo_dept_id" className="mb-2 text-white">Tipo de Departamento:</label>
            <select id="tipo_dept_id" name="tipo_dept_id" value={departamento.tipo_dept_id} onChange={handleChange} className="border borde-100 p-2 rounded-md bg-fondo-300" required>
              <option value="">Seleccione un tipo de departamento</option>
              {tiposDept.map(tipo => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
            {errores.tipo_dept_id && <p className="text-red-500 text-xs">{errores.tipo_dept_id}</p>}
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <BotonAccion
            onclick={handleSubmit}
            contenido={isUpdating ? 'Actualizar Departamento' : 'Agregar Departamento'}
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

export default CrearDepartamento;
