import React, { useState, useEffect } from 'react';
import CrearCliente from './CrearCliente';
import TablaModular from '../../../component/tablaModular';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function TablaCliente({ selectedId }) {
  const [clientes, setClientes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    if (selectedId) {
      setSelected([selectedId]);
      const cliente = clientes.find(cli => cli.id === selectedId);
      if (cliente) {
        setCurrentCliente(cliente);
        setModuloHabilitado(true);
      }
    }
  }, [selectedId, clientes]);

  useEffect(() => {
    if (user?.idEmpresa) {
      fetchClientesEmpresa(user.idEmpresa);
    }
  }, [user]);

  const fetchClientesEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/empresa/${idEmpresa}/clientes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleUpdate = (cliente) => {
    setCurrentCliente(cliente);
    setModuloHabilitado(true);
  };

  const handleDelete = async () => {
    for (const id of selected) {
      const response = await fetch(`${BACKEND_URL}/api/cliente/d/${id}`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedClientes = clientes.filter(cli => cli.id !== id);
        setClientes(updatedClientes);
      } else {
        alert('Error al eliminar el cliente');
      }
    }
    setSelected([]);
  };

  const refreshClientes = () => {
    if (user?.idEmpresa) {
      fetchClientesEmpresa(user.idEmpresa);
    }
  };

  const onSave = () => {
    refreshClientes();
    setCurrentCliente(null);
    setModuloHabilitado(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = clientes.map((n) => n.id);
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
    { header: 'Apellido', field: 'apellidoUno' },
    { header: 'Email', field: 'email' },
    { header: 'Teléfono Uno', field: 'telefonoUno' },
    { header: 'Teléfono Dos', field: 'telefonoDos' },
    { header: 'Dirección', field: 'direccion' },
    { header: 'Código Postal', field: 'codigoPostal' },
    { header: 'Detalles', field: 'detalles' }
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
                Clientes
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
                onClick={() => { setCurrentCliente(null); setModuloHabilitado(true); }}
                style={{ backgroundColor: '#4862bd', color: 'white' }}
              >
                Nuevo Cliente
              </Button>
            )}
          </Toolbar>
          <TablaModular
            data={clientes}
            columns={columns}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            onSelectRowClick={handleSelectRowClick}
            onRowClick={handleUpdate}
          />
        </>
      )}
      {moduloHabilitado && (
        <CrearCliente
          clienteId={currentCliente ? currentCliente.id : null}
          clienteInicial={currentCliente}
          deshabilitarModulo={() => { setCurrentCliente(null); setModuloHabilitado(false); refreshClientes(); }}
          onSave={onSave}
          isUpdating={currentCliente !== null}
        />
      )}
    </div>
  );
}

export default TablaCliente;
