import React, { useState, useEffect } from 'react';
import CrearDepartamento from './CrearDepartamento';
import TablaModular from '../../../component/tablaModular';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function TablaDepartamento({ selectedId }) {
  const [departamentos, setDepartamentos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentDepartamento, setCurrentDepartamento] = useState(null);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    if (selectedId) {
      setSelected([selectedId]);
      const departamento = departamentos.find(dept => dept.id === selectedId);
      if (departamento) {
        setCurrentDepartamento(departamento);
        setModuloHabilitado(true);
      }
    }
  }, [selectedId, departamentos]);

  useEffect(() => {
    if (user?.idEmpresa) {
      fetchDepartamentosEmpresa(user.idEmpresa);
    }
  }, [user]);

  const fetchDepartamentosEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/empresa/${idEmpresa}/departamentos`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDepartamentos(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleUpdate = (departamento) => {
    setCurrentDepartamento(departamento);
    setModuloHabilitado(true);
  };

  const handleDelete = async () => {
    for (const id of selected) {
      const response = await fetch(`${BACKEND_URL}/api/departamento/d/${id}`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedDepartamentos = departamentos.filter(dept => dept.id !== id);
        setDepartamentos(updatedDepartamentos);
      } else {
        alert('Error al eliminar el departamento');
      }
    }
    setSelected([]);
  };

  const refreshDepartamentos = () => {
    if (user?.idEmpresa) {
      fetchDepartamentosEmpresa(user.idEmpresa);
    }
  };

  const onSave = () => {
    refreshDepartamentos();
    setCurrentDepartamento(null);
    setModuloHabilitado(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = departamentos.map((n) => n.id);
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
    { header: 'Nombre', field: 'nombre' },
    { header: 'Descripción', field: 'descripcion' }
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
                Departamentos
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
                onClick={() => { setCurrentDepartamento(null); setModuloHabilitado(true); }}
                style={{ backgroundColor: '#4862bd', color: 'white' }}
              >
                Nuevo Departamento
              </Button>
            )}
          </Toolbar>
          <TablaModular
            data={departamentos}
            columns={columns}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            onSelectRowClick={handleSelectRowClick}
            onRowClick={handleUpdate}
          />
        </>
      )}
      {moduloHabilitado && (
        <CrearDepartamento
          departamentoId={currentDepartamento ? currentDepartamento.id : null}
          departamentoInicial={currentDepartamento}
          deshabilitarModulo={() => { setCurrentDepartamento(null); setModuloHabilitado(false); refreshDepartamentos(); }}
          onSave={onSave}
          isUpdating={currentDepartamento !== null}
        />
      )}
    </div>
  );
}

export default TablaDepartamento;
