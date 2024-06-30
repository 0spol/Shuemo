import React, { useState, useEffect } from 'react';
import DepartamentosTabla from '../../pages/Contenido/TablaDepartamento/TablaDepartamento';
import CrearDepartamento from '../../pages/Contenido/TablaDepartamento/CrearDepartamento';
import { useAuth } from '../../context/useAuth';
import { BACKEND_URL } from './config';

export function Departamento() {
  const [departamentos, setDepartamentos] = useState([]);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const [currentDepartamento, setCurrentDepartamento] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/departamento/r`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setDepartamentos(data);
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }, [moduloHabilitado, token]);

  const handleUpdateDepartamento = (departamento) => {
    setCurrentDepartamento(departamento);
    setModuloHabilitado(true);
  };

  const handleSave = () => {
    fetch(`${BACKEND_URL}/api/departamento/r`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setDepartamentos(data);
        setCurrentDepartamento(null);
        setModuloHabilitado(false);
      })
      .catch(error => console.error('Error refreshing data:', error));
  };

  return (
    <div>
      {!moduloHabilitado && (
        <DepartamentosTabla
          departamentos={departamentos}
          setDepartamentos={setDepartamentos}
          handleUpdateDepartamento={handleUpdateDepartamento}
          habilitarModulo={() => setModuloHabilitado(true)}
        />
      )}
      {moduloHabilitado && (
        <CrearDepartamento
          departamentoInicial={currentDepartamento}
          deshabilitarModulo={() => setModuloHabilitado(false)}
          onSave={handleSave}
          isUpdating={currentDepartamento !== null}
        />
      )}
    </div>
  );
}
