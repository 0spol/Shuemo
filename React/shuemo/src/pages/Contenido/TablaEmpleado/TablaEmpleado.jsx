import React, { useState, useEffect } from 'react';
import CrearEmpleado from './CrearEmpleado';
import TablaModular from '../../../component/tablaModular';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function TablaEmpleado({ selectedId }) {
  const [empleados, setEmpleados] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentEmpleado, setCurrentEmpleado] = useState(null);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    if (selectedId) {
      setSelected([selectedId]);
      const empleado = empleados.find(emp => emp.id === selectedId);
      if (empleado) {
        setCurrentEmpleado(empleado);
        setModuloHabilitado(true);
      }
    }
  }, [selectedId, empleados]);

  useEffect(() => {
    if (user?.idEmpresa) {
      fetchEmpleadosEmpresa(user.idEmpresa);
    }
  }, [user]);

  const fetchEmpleadosEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/empresa/${idEmpresa}/empleados`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleUpdate = (empleado) => {
    setCurrentEmpleado(empleado);
    setModuloHabilitado(true);
  };

  const handleDelete = async () => {
    for (const id of selected) {
      const response = await fetch(`${BACKEND_URL}/api/empleado/d/${id}`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedEmpleados = empleados.filter(emp => emp.id !== id);
        setEmpleados(updatedEmpleados);
      } else {
        alert('Error al eliminar el empleado');
      }
    }
    setSelected([]);
  };

  const refreshEmpleados = () => {
    if (user?.idEmpresa) {
      fetchEmpleadosEmpresa(user.idEmpresa);
    }
  };

  const onSave = () => {
    refreshEmpleados();
    setCurrentEmpleado(null);
    setModuloHabilitado(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = empleados.map((n) => n.id);
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
    { header: 'DNI', field: 'dni' },
    { header: 'Nombre', field: 'nombre' },
    { header: 'Apellidos', field: 'apellidos' },
    { header: 'Email', field: 'email' },
    { header: 'Teléfono', field: 'telefonoUno' },
    { header: 'Móvil', field: 'movil' }
  ];

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
                Empleados
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
                onClick={() => { setCurrentEmpleado(null); setModuloHabilitado(true); }}
                style={{ backgroundColor: '#4862bd', color: 'white' }}
              >
                Nuevo empleado
              </Button>
            )}
          </Toolbar>
          <TablaModular
            data={empleados}
            columns={columns}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            onSelectRowClick={handleSelectRowClick}
            onRowClick={handleUpdate}
          />
        </>
      )}
      {moduloHabilitado && (
        <CrearEmpleado
          empleadoId={currentEmpleado ? currentEmpleado.id : null}
          empleadoInicial={currentEmpleado}
          deshabilitarModulo={() => { setCurrentEmpleado(null); setModuloHabilitado(false); refreshEmpleados(); }}
          onSave={onSave}
          isUpdating={currentEmpleado !== null}
        />
      )}
    </div>
  );
}

export default TablaEmpleado;
