import React, { useState, useEffect } from 'react';
import EmpleadosTabla from '../../pages/Contenido/TablaEmpleado/TablaEmpleado';
import CrearEmpleado from '../../pages/Contenido/TablaEmpleado/CrearEmpleado';
import { useAuth } from '../../context/useAuth';
import { BACKEND_URL } from './config';

export function Empleado() {
  const [empleados, setEmpleados] = useState([]);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const [currentEmpleado, setCurrentEmpleado] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/empleado/r`, {
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
        setEmpleados(data);
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }, [moduloHabilitado, token]);

  const handleUpdateEmpleado = (empleado) => {
    setCurrentEmpleado(empleado);
    setModuloHabilitado(true);
  };

  const handleSave = () => {
    fetch(`${BACKEND_URL}/api/empleado/r`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setEmpleados(data);
        setCurrentEmpleado(null);
        setModuloHabilitado(false);
      })
      .catch(error => console.error('Error refreshing data:', error));
  };

  return (
    <div>
      {!moduloHabilitado && (
        <EmpleadosTabla
          empleados={empleados}
          setEmpleados={setEmpleados}
          handleUpdateEmpleado={handleUpdateEmpleado}
          habilitarModulo={() => setModuloHabilitado(true)}
        />
      )}
      {moduloHabilitado && (
        <CrearEmpleado
          empleadoInicial={currentEmpleado}
          deshabilitarModulo={() => setModuloHabilitado(false)}
          onSave={handleSave}
          isUpdating={currentEmpleado !== null}
        />
      )}
    </div>
  );
}
