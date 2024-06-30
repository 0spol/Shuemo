import React, { useState, useEffect } from 'react';
import TablaPago from '../../pages/Contenido/TablaPagos/TablaPago';
import CrearPago from '../../pages/Contenido/TablaPagos/CrearPago';
import { useAuth } from '../../context/useAuth';
import { BACKEND_URL } from './config';

export function Pago() {
  const [pagos, setPagos] = useState([]);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const [currentPago, setCurrentPago] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchPagos();
  }, [token]);

  const fetchPagos = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/pago/r`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPagos(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleSave = () => {
    fetchPagos(); // Refetch los datos actualizados
    setModuloHabilitado(false); // Deshabilitar módulo para volver a la tabla
    setCurrentPago(null); // Limpiar el pago actual después de guardar o cancelar
  };

  const handleEditClick = (pago) => {
    setCurrentPago(pago);
    setModuloHabilitado(true); // Habilitar el módulo para mostrar el formulario de edición/creación
  };

  return (
    <div>
      {!moduloHabilitado ? (
        <TablaPago
          pagos={pagos}
          setPagos={setPagos}
          handleEditClick={handleEditClick}
          setModuloHabilitado={setModuloHabilitado}
        />
      ) : (
        <CrearPago
          pagoInicial={currentPago}
          deshabilitarModulo={() => {
            setModuloHabilitado(false);
            setCurrentPago(null); // Asegurarse de limpiar el pago actual al cerrar el módulo
          }}
          onSave={handleSave}
          isUpdating={currentPago !== null}
        />
      )}
    </div>
  );
}
