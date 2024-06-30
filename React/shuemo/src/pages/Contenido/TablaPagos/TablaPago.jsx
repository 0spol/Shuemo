import React, { useState, useEffect, useCallback } from 'react';
import CrearPago from './CrearPago';
import TablaModular from '../../../component/tablaModular';
import { Button, Toolbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function TablaPago() {
  const [pagos, setPagos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentPago, setCurrentPago] = useState(null);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [tiposMoneda, setTiposMoneda] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        `${BACKEND_URL}/api/empresa/${user.idEmpresa}/clientes`,
        `${BACKEND_URL}/api/tipomoneda/r`,
        `${BACKEND_URL}/api/metodoPago/r`
      ];
      const results = await Promise.all(urls.map(url => fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => res.json())));
      setClientes(results[0]);
      setTiposMoneda(results[1]);
      setMetodosPago(results[2]);
    };
    fetchData();
    refreshPagos();
  }, [token, user]);

  const refreshPagos = async () => {
    const response = await fetch(`${BACKEND_URL}/api/empresa/${user.idEmpresa}/pagos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    const data = await response.json();
    setPagos(data);
  };

  const handleUpdate = useCallback((pago) => {
    setCurrentPago(pago);
    setModuloHabilitado(true);
  }, []);

  const handleDelete = async () => {
    for (const id of selected) {
      const response = await fetch(`${BACKEND_URL}/api/pago/d/${id}`, { 
        method: 'DELETE', 
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (response.ok) {
        const updatedPagos = pagos.filter(p => p.id !== id);
        setPagos(updatedPagos);
        alert('Pago eliminado con éxito');
      } else {
        alert('Error al eliminar el pago');
      }
    }
    setSelected([]);
  };

  const onSave = () => {
    refreshPagos();
    setCurrentPago(null);
    setModuloHabilitado(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = pagos.map((n) => n.id);
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
    { header: 'Tipo de Moneda', field: 'tipoMoneda.nombre', render: (_, row) => row.tipoMoneda ? row.tipoMoneda.nombre : 'Tipo de Moneda no definido' },
    { header: 'Método de Pago', field: 'metodoPago.nombre', render: (_, row) => row.metodoPago ? row.metodoPago.nombre : 'Método de Pago no definido' },
    { header: 'Monto', field: 'monto', render: (_, row) => row.monto },
    { header: 'Fecha de Pago', field: 'fechaPago', render: (_, row) => new Date(row.fechaPago).toLocaleString() },
    { header: 'Detalles', field: 'detalles', render: (_, row) => row.detalles || 'Descripción no definida' },
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
                Pagos
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
                onClick={() => { setCurrentPago(null); setModuloHabilitado(true); }}
                style={{ backgroundColor: '#4862bd', color: 'white' }}
              >
                Nuevo Pago
              </Button>
            )}
          </Toolbar>
          <TablaModular
            data={pagos}
            columns={columns}
            selected={selected}
            onSelectAllClick={handleSelectAllClick}
            onSelectRowClick={handleSelectRowClick}
            onRowClick={handleUpdate}
          />
        </>
      )}
      {moduloHabilitado && (
        <CrearPago
          pagoInicial={currentPago}
          deshabilitarModulo={() => { setCurrentPago(null); setModuloHabilitado(false); refreshPagos(); }}
          onSave={onSave}
          isUpdating={currentPago !== null}
          clientes={clientes}
          tiposMoneda={tiposMoneda}
          metodosPago={metodosPago}
        />
      )}
    </div>
  );
}

export default TablaPago;
