import React, { useState, useEffect } from 'react';
import ModificarEmpresa from './ModificarEmpresa';
import TablaModular from '../../../component/tablaModular';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function TablaEmpresa({ empresas, setEmpresas, selectedId }) {
  const [selected, setSelected] = useState([]);
  const [currentEmpresa, setCurrentEmpresa] = useState(null);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (selectedId) {
      setSelected([selectedId]);
      const empresa = empresas.find(emp => emp.id === selectedId);
      if (empresa) {
        setCurrentEmpresa(empresa);
        setModuloHabilitado(true);
      }
    }
  }, [selectedId, empresas]);

  const handleUpdate = (empresa) => {
    setCurrentEmpresa(empresa);
    setModuloHabilitado(true);
  };

  const handleDelete = async () => {
    for (const id of selected) {
      const response = await fetch(`${BACKEND_URL}/api/empresa/d/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedEmpresas = empresas.filter(emp => emp.id !== id);
        setEmpresas(updatedEmpresas);
      } else {
        alert('Error al eliminar la empresa');
      }
    }
    setSelected([]);
  };

  const refreshEmpresas = () => {
    fetch(`${BACKEND_URL}/api/empresa/r`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => setEmpresas(data))
      .catch(error => console.error('Error fetching empresas:', error));
  };

  const onSave = () => {
    refreshEmpresas();
    setCurrentEmpresa(null);
    setModuloHabilitado(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = empresas.map((n) => n.id);
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
    { header: 'CIF', field: 'cif' },
    { header: 'Dirección', field: 'direccion' },
    { header: 'Teléfono 1', field: 'telefonoUno' },
    { header: 'Teléfono 2', field: 'telefonoDos' },
    { header: 'Fax', field: 'fax' },
    { header: 'Email', field: 'email' },
    { header: 'Ciudad', field: 'ciudad' },
    { header: 'Tipo de Empresa', field: 'tipoEmpresa' },
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
                Empresas
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
                onClick={() => { setCurrentEmpresa(null); setModuloHabilitado(true); }}
                style={{ backgroundColor: '#4862bd', color: 'white' }}
              >
                Nueva empresa
              </Button>
            )}
          </Toolbar>
          <TablaModular
            data={empresas}
            columns={columns}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            onSelectRowClick={handleSelectRowClick}
            onRowClick={handleUpdate}
          />
        </>
      )}
      {moduloHabilitado && (
        <ModificarEmpresa
          empresaId={currentEmpresa ? currentEmpresa.id : null}
          empresaInicial={currentEmpresa}
          deshabilitarModulo={() => { setCurrentEmpresa(null); setModuloHabilitado(false); refreshEmpresas(); }}
          onSave={onSave}
          isUpdating={currentEmpresa !== null}
        />
      )}
    </div>
  );
}

export default TablaEmpresa;
