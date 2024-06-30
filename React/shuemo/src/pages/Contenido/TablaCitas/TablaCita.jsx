import React, { useState, useEffect, useCallback } from 'react';
import CrearCita from './CrearCita';
import TablaModular from '../../../component/tablaModular';
import { Button, Toolbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function TablaCita({ selectedId }) {
  const [citas, setCitas] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentCita, setCurrentCita] = useState(null);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesData, citasData] = await Promise.all([
          fetch(`${BACKEND_URL}/api/empresa/${user.idEmpresa}/clientes`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }).then(res => res.json()),
          fetch(`${BACKEND_URL}/api/empresa/${user.idEmpresa}/citas`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }).then(res => res.json())
        ]);
        setClientes(clientesData);
        setCitas(citasData);
      } catch (error) {
        setError(error);
      }
    };
    if (user?.idEmpresa) {
      fetchData();
    }
  }, [token, user]);

  useEffect(() => {
    if (selectedId) {
      setSelected([selectedId]);
      const selectedCita = citas.find(cita => cita.id === selectedId);
      if (selectedCita) {
        setCurrentCita(selectedCita);
        setModuloHabilitado(true);
      }
    }
  }, [selectedId, citas]);

  const handleUpdate = useCallback((cita) => {
    setCurrentCita(cita);
    setModuloHabilitado(true);
  }, []);

  const handleDelete = async () => {
    try {
      for (const id of selected) {
        const response = await fetch(`${BACKEND_URL}/api/cita/d/${id}`, { 
          method: 'DELETE', 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const updatedCitas = citas.filter(c => c.id !== id);
          setCitas(updatedCitas);
        } else {
          throw new Error('Error al eliminar la cita');
        }
      }
      setSelected([]);
    } catch (err) {
      setError(err);
    }
  };

  const refreshCitas = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/empresa/${user.idEmpresa}/citas`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      setError(error);
    }
  };

  const onSave = () => {
    refreshCitas();
    setCurrentCita(null);
    setModuloHabilitado(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = citas.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const columns = [
    { header: 'Cliente', field: 'cliente.nombre', render: (_, row) => row.cliente ? row.cliente.nombre : 'Cliente no definido' },
    { header: 'Fecha', field: 'fecha', render: (_, row) => new Date(row.fecha).toLocaleDateString() },
    { header: 'Fecha y Hora de Inicio', field: 'fechaHoraInicio', render: (_, row) => new Date(row.fechaHoraInicio).toLocaleString() },
    { header: 'Fecha y Hora de Fin', field: 'fechaHoraFin', render: (_, row) => new Date(row.fechaHoraFin).toLocaleString() },
    { header: 'Ubicación', field: 'ubicacion', render: (_, row) => row.ubicacion || 'Ubicación no definida' },
    { header: 'Descripción', field: 'descripcion', render: (_, row) => row.descripcion || 'Descripción no definida' },
  ];

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-10 bg-fondo-200 border-borde-100 p-4 rounded-lg">
      {!moduloHabilitado && (
        <>
          <Toolbar style={{ backgroundColor: '#161b22', marginBottom: '1rem' }}>
            {selected.length > 0 ? (
              <Typography className="flex-grow" variant="subtitle1" component="div" style={{ color: '#f0f6fc' }}>
                {selected.length} seleccionados
              </Typography>
            ) : (
              <Typography className="flex-grow" variant="h6" id="tableTitle" component="div" style={{ color: '#f0f6fc' }}>
                Citas
              </Typography>
            )}

            {selected.length > 0 ? (
              <Button
                variant="contained"
                style={{ backgroundColor: '#d73a49', color: 'white' }}
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            ) : (
              <Button
                onClick={() => { setCurrentCita(null); setModuloHabilitado(true); }}
                style={{ backgroundColor: '#4862bd', color: 'white' }}
              >
                Nueva Cita
              </Button>
            )}
          </Toolbar>
          <TablaModular
            data={citas}
            columns={columns}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            onSelectRowClick={handleSelectRowClick}
            onRowClick={handleUpdate}
          />
        </>
      )}
      {moduloHabilitado && (
        <CrearCita
          citaInicial={currentCita}
          deshabilitarModulo={() => { setCurrentCita(null); setModuloHabilitado(false); refreshCitas(); }}
          onSave={onSave}
          isUpdating={currentCita !== null}
          clientes={clientes}
        />
      )}
    </div>
  );
}

export default TablaCita;
