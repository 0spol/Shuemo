import React, { useState, useEffect } from 'react';
import TablaCliente from '../../pages/Contenido/TablaCliente/TablaCliente';
import CrearCliente from '../../pages/Contenido/TablaCliente/CrearCliente';
import { useAuth } from '../../context/useAuth';
import { BACKEND_URL } from './config';

export function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/cliente/r`, {
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
        setClientes(data);
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }, [moduloHabilitado, token]);

  const handleUpdateCliente = (cliente) => {
    setCurrentCliente(cliente);
    setModuloHabilitado(true);
  };

  const handleSave = () => {
    fetch(`${BACKEND_URL}/api/cliente/r`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setClientes(data);
        setCurrentCliente(null);
        setModuloHabilitado(false);
      })
      .catch(error => console.error('Error refreshing data:', error));
  };

  return (
    <div>
      {!moduloHabilitado && (
        <TablaCliente
          clientes={clientes}
          setClientes={setClientes}
          handleUpdateCliente={handleUpdateCliente}
          habilitarModulo={() => setModuloHabilitado(true)}
        />
      )}
      {moduloHabilitado && (
        <CrearCliente
          clienteInicial={currentCliente}
          deshabilitarModulo={() => setModuloHabilitado(false)}
          onSave={handleSave}
          isUpdating={currentCliente !== null}
        />
      )}
    </div>
  );
}
