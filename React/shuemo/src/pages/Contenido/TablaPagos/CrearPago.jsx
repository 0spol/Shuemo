import React, { useState, useEffect } from 'react';
import { BotonAccion } from '../../../component/Botones/Botones';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function CrearPago({ pagoInicial = null, deshabilitarModulo, onSave, isUpdating = false }) {
  const { token, user } = useAuth(); // Obtener el token y el usuario del contexto de autenticación
  const [pago, setPago] = useState({
    id: '',
    fechaPago: '',
    fechaProxPago: '',
    monto: '',
    detalles: '',
    cliente: '',
    tipoMoneda: '',
    metodoPago: ''
  });

  const [clientes, setClientes] = useState([]);
  const [tiposMoneda, setTiposMoneda] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resClientes = await fetch(`${BACKEND_URL}/api/empresa/${user.idEmpresa}/clientes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const dataClientes = await resClientes.json();
        setClientes(dataClientes);

        const resTiposMoneda = await fetch(`${BACKEND_URL}/api/tipomoneda/r`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const dataTiposMoneda = await resTiposMoneda.json();
        setTiposMoneda(dataTiposMoneda);

        const resMetodosPago = await fetch(`${BACKEND_URL}/api/metodoPago/r`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const dataMetodosPago = await resMetodosPago.json();
        setMetodosPago(dataMetodosPago);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    if (user?.idEmpresa) {
      cargarDatos();
    }

    if (pagoInicial) {
      setPago({
        id: pagoInicial.id || '',
        fechaPago: pagoInicial.fechaPago || '',
        fechaProxPago: pagoInicial.fechaProxPago || '',
        monto: pagoInicial.monto || '',
        detalles: pagoInicial.detalles || '',
        cliente: pagoInicial.cliente?.id || '',
        tipoMoneda: pagoInicial.tipoMoneda?.id || '',
        metodoPago: pagoInicial.metodoPago?.id || ''
      });
    }
  }, [pagoInicial, token, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPago(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!pago.fechaPago) errors.push("La fecha de pago no puede estar vacía.");
    if (!pago.fechaProxPago) errors.push("La fecha del próximo pago no puede estar vacía.");
    if (!pago.monto || isNaN(parseFloat(pago.monto)) || parseFloat(pago.monto) <= 0) errors.push("El monto del pago debe ser un número positivo.");
    if (!pago.cliente) errors.push("Debe seleccionar un cliente.");
    if (!pago.tipoMoneda) errors.push("Debe seleccionar un tipo de moneda.");
    if (!pago.metodoPago) errors.push("Debe seleccionar un método de pago.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (formErrors.length > 0) {
      alert(formErrors.join("\n"));
      return;
    }

    const apiUrl = isUpdating ? `${BACKEND_URL}/api/pago/u/${pago.id}` : `${BACKEND_URL}/api/pago/c`;
    const method = isUpdating ? 'PUT' : 'POST';

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...pago,
          cliente: { id: pago.cliente },
          tipoMoneda: { id: pago.tipoMoneda },
          metodoPago: { id: pago.metodoPago },
          monto: pago.monto.toString() // Convertir a string para manejar BigDecimal
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      console.log(`${isUpdating ? 'Updated' : 'Created'} successfully`);
      onSave();
      deshabilitarModulo(); // Cierra el módulo de creación/edición
    } catch (error) {
      console.error('Error in submission:', error);
      alert('Error in submission: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 bg-fondo-200 border-borde-100 p-6 rounded-lg">
      <h1 className="text-2xl mb-4 text-brillante-100">{isUpdating ? 'Actualizar Pago' : 'Crear Pago'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fecha de Pago */}
          <div className="flex flex-col">
            <label htmlFor="fechaPago" className="mb-2 text-white">Fecha de Pago:</label>
            <input
              type="datetime-local"
              id="fechaPago"
              name="fechaPago"
              value={pago.fechaPago}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            />
          </div>
          {/* Fecha del Próximo Pago */}
          <div className="flex flex-col">
            <label htmlFor="fechaProxPago" className="mb-2 text-white">Fecha del Próximo Pago:</label>
            <input
              type="datetime-local"
              id="fechaProxPago"
              name="fechaProxPago"
              value={pago.fechaProxPago}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            />
          </div>
          {/* Monto */}
          <div className="flex flex-col">
            <label htmlFor="monto" className="mb-2 text-white">Monto:</label>
            <input
              type="number"
              id="monto"
              name="monto"
              value={pago.monto}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            />
          </div>
          {/* Detalles */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="detalles" className="mb-2 text-white">Detalles:</label>
            <textarea
              id="detalles"
              name="detalles"
              value={pago.detalles}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
            />
          </div>
          {/* Cliente */}
          <div className="flex flex-col">
            <label htmlFor="cliente" className="mb-2 text-white">Cliente:</label>
            <select
              name="cliente"
              value={pago.cliente}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
              ))}
            </select>
          </div>
          {/* Tipo de Moneda */}
          <div className="flex flex-col">
            <label htmlFor="tipoMoneda" className="mb-2 text-white">Tipo de Moneda:</label>
            <select
              name="tipoMoneda"
              value={pago.tipoMoneda}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            >
              <option value="">Seleccione un tipo de moneda</option>
              {tiposMoneda.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
              ))}
            </select>
          </div>
          {/* Método de Pago */}
          <div className="flex flex-col">
            <label htmlFor="metodoPago" className="mb-2 text-white">Método de Pago:</label>
            <select
              name="metodoPago"
              value={pago.metodoPago}
              onChange={handleChange}
              className="border borde-100 p-2 rounded-md bg-fondo-300"
              required
            >
              <option value="">Seleccione un método de pago</option>
              {metodosPago.map(metodo => (
                <option key={metodo.id} value={metodo.id}>{metodo.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {isUpdating ? 'Actualizar Pago' : 'Crear Pago'}
          </button>
          <button
            type="button"
            onClick={deshabilitarModulo}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearPago;
