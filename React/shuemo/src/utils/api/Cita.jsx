import React, { useState, useEffect } from 'react';
import TablaCita from '../../pages/Contenido/TablaCitas/TablaCita';
import CrearCita from '../../pages/Contenido/TablaCitas/CrearCita';
import { useAuth } from '../../context/useAuth';
import { BACKEND_URL } from './config';

export function Cita() {
  const [citas, setCitas] = useState([]);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const [currentCita, setCurrentCita] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchCitas();
  }, [token]);

  const fetchCitas = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cita/r`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleSave = () => {
    fetchCitas();
    setModuloHabilitado(false);
    setCurrentCita(null);
  };

  const handleEditClick = (cita) => {
    setCurrentCita(cita);
    setModuloHabilitado(true);
  };

  return (
    <div>
      {!moduloHabilitado ? (
        <TablaCita
          citas={citas}
          setCitas={setCitas}
          handleEditClick={handleEditClick}
          setModuloHabilitado={setModuloHabilitado}
        />
      ) : (
        <CrearCita
          citaInicial={currentCita}
          deshabilitarModulo={() => {
            setModuloHabilitado(false);
            setCurrentCita(null);
          }}
          onSave={handleSave}
          isUpdating={currentCita !== null}
        />
      )}
    </div>
  );
}
