import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CardWidget.css';

const truncate = (text = '', maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
};

export const ClientResume = ({ id, direccion, nombre, email, telefono, citas = [] }) => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('rojo'); // Default to red if no citas

  useEffect(() => {
    const today = new Date();
    const futureCitas = citas.filter(cita => new Date(cita.fechaHoraInicio) > today);

    if (futureCitas.length > 0) {
      setSelectedState('verde');
    } else {
      setSelectedState('rojo');
    }
  }, [citas]);

  const handleClick = () => {
    navigate(`/contenido#cliente?id=${id}`);
  };

  return (
    <div className="contenedor" onClick={handleClick}>
      <div className="barra-vertical" style={{ backgroundColor: '#4862bd' }}></div>
      <div className="parte-uno-cli">
        <div className="text-uno-cli">{direccion}</div>
        <div className="text-dos-cli">{nombre}</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#4862bd' }}></div>
      <div className="parte-dos-cli">
        <div className="text-uno-cli">{email}</div>
        <div className="text-dos-cli">{telefono}</div>
      </div>

      <div className="parte-tres-cli">
        <div className="texto-estado-cli">Cita</div>
        <div className="barra-horizontal-cli"></div>
        <div className="semaforo-cli">
          <div className={`rojo${selectedState === 'rojo' ? '-a' : ''}`}></div>
          <div className={`verde${selectedState === 'verde' ? '-a' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export const EmplResume = ({ id, rol, nombre, email, telefono, deshabilitado }) => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(deshabilitado ? 'rojo' : 'verde');

  useEffect(() => {
    setSelectedState(deshabilitado ? 'rojo' : 'verde');
  }, [deshabilitado]);

  const handleClick = () => {
    navigate(`/contenido#empleado?id=${id}`);
  };

  return (
    <div className="contenedor" onClick={handleClick}>
      <div className="barra-vertical" style={{ backgroundColor: '#d18227' }}></div>
      <div className="parte-uno-cli">
        <div className="text-uno-cli">{rol}</div>
        <div className="text-dos-cli">{nombre}</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#d18227' }}></div>
      <div className="parte-dos-cli">
        <div className="text-uno-cli">{email}</div>
        <div className="text-dos-cli">{telefono}</div>
      </div>

      <div className="parte-tres-cli">
        <div className="texto-estado-cli">Estado</div>
        <div className="barra-horizontal-emp"></div>
        <div className="semaforo-cli">
          <div className={`rojo${selectedState === 'rojo' ? '-a' : ''}`}></div>
          <div className={`verde${selectedState === 'verde' ? '-a' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export const CitaResume = ({ id, fechaInicio, fechaFin, nombre, text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/contenido#cita?id=${id}`);
  };

  return (
    <div className="contenedor" onClick={handleClick}>
      <div className="barra-vertical" style={{ backgroundColor: '#844700' }}></div>
      <div className="parte-uno-cit">
        <div className="text-uno-cit">{fechaFin}</div>
        <div className="text-dos-cit">{fechaInicio}</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#844700' }}></div>
      
      <div className="parte-dos-cit">
        <div className="text-uno-cit">{truncate(nombre, 18)}</div>
        <div className="text-dos-cit">{truncate(text, 18)}</div>
      </div>
    </div>
  );
};

export const PagoResume = ({ id, nombre, service, cost, state, fechaPago, fechaProxPago }) => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(state);

  useEffect(() => {
    const today = new Date();
    const paymentDate = new Date(fechaPago);

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const paymentYear = paymentDate.getFullYear();
    const paymentMonth = paymentDate.getMonth();
    const paymentDay = paymentDate.getDate();

    if (!fechaPago) {
      setSelectedState('rojo');
    } else if (paymentYear === todayYear && paymentMonth === todayMonth && paymentDay === todayDate) {
      setSelectedState('ambar');
    } else if (paymentYear < todayYear || (paymentYear === todayYear && paymentMonth < todayMonth) || (paymentYear === todayYear && paymentMonth === todayMonth && paymentDay < todayDate)) {
      setSelectedState('verde');
    } else {
      setSelectedState('rojo');
    }
  }, [fechaPago]);

  const handleClick = () => {
    navigate(`/contenido#pago?id=${id}`);
  };

  return (
    <div className="contenedor" onClick={handleClick}>
      <div className="barra-vertical" style={{ backgroundColor: '#3d7c67' }}></div>
      <div className="parte-uno-pay">
        <div className="text-uno-pay">{truncate(nombre, 17)}</div>
        <div className="text-dos-pay">{truncate(service, 13)}</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#3d7c67' }}></div>
      <div className="parte-dos-pay">
        <div className="text-uno-pay">Cuantía</div>
        <div className="text-dos-pay">{truncate(cost.toString(), 9)}€</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#3d7c67' }}></div>
      <div className="parte-tres-pay">
        <div className="text-uno-pay">{fechaPago}</div>
        <div className="text-dos-pay">{fechaProxPago}</div>
      </div>

      <div className="parte-cuatro-pay">
        <div className="texto-estado-pay">Estado</div>
        <div className="barra-horizontal-pay"></div>
        <div className="semaforo-pay">
          <div className={`rojo${selectedState === 'rojo' ? '-a' : ''}`}></div>
          <div className={`ambar${selectedState === 'ambar' ? '-a' : ''}`}></div>
          <div className={`verde${selectedState === 'verde' ? '-a' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export const PagoResumeLong = ({ id, nombre, service, cost, state, email, telefono, fechaPago, fechaProxPago }) => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(state);

  useEffect(() => {
    const today = new Date();
    const paymentDate = new Date(fechaPago);

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const paymentYear = paymentDate.getFullYear();
    const paymentMonth = paymentDate.getMonth();
    const paymentDay = paymentDate.getDate();

    if (!fechaPago) {
      setSelectedState('rojo');
    } else if (paymentYear === todayYear && paymentMonth === todayMonth && paymentDay === todayDate) {
      setSelectedState('ambar');
    } else if (paymentYear < todayYear || (paymentYear === todayYear && paymentMonth < todayMonth) || (paymentYear === todayYear && paymentMonth === todayMonth && paymentDay < todayDate)) {
      setSelectedState('verde');
    } else {
      setSelectedState('rojo');
    }
  }, [fechaPago]);

  const handleClick = () => {
    navigate(`/contenido#pago?id=${id}`);
  };

  return (
    <div className="resumen-pay-long" onClick={handleClick}>
      <div className="barra-vertical" style={{ backgroundColor: '#3d7c67' }}></div>
      <div className="parte-uno-pay-long">
        <div className="text-uno-pay-long">{truncate(nombre, 17)}</div>
        <div className="text-dos-pay-long">{truncate(service, 13)}</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#3d7c67' }}></div>
      <div className="parte-dos-pay-long">
        <div className="text-uno-pay-long">Cuantía</div>
        <div className="text-dos-pay-long">{truncate(cost.toString(), 9)}€</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#3d7c67' }}></div>
      <div className="parte-tres-pay-long">
        <div className="text-uno-pay-long">{fechaPago}</div>
        <div className="text-dos-pay-long">{fechaProxPago}</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#3d7c67' }}></div>
      <div className="parte-cuatro-pay-long">
        <div className="text-uno-pay-long">{truncate(email, 17)}</div>
        <div className="text-dos-pay-long">{truncate(telefono, 10)}</div>
      </div>

      <div className="parte-cinco-pay-long">
        <div className="texto-estado-pay-long">Estado</div>
        <div className="barra-horizontal-pay-long"></div>
        <div className="semaforo-pay-long">
          <div className={`rojo${selectedState === 'rojo' ? '-a' : ''}`}></div>
          <div className={`ambar${selectedState === 'ambar' ? '-a' : ''}`}></div>
          <div className={`verde${selectedState === 'verde' ? '-a' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export const LastCitasUser = ({ id, fecha, nombre, text, onClick }) => {
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="contenedor" onClick={onClick}>
      <div className="barra-vertical" style={{ backgroundColor: '#844700' }}></div>
      <div className="parte-uno-cit">
        <div className="text-uno-cit">{truncate(fecha, 18)}</div>
        <div className="text-dos-cit">{truncate(nombre, 18)}</div>
      </div>

      <div className="barra-vertical" style={{ backgroundColor: '#844700' }}></div>
      <div className="parte-dos-cit">
        <div className="text-uno-cit">{truncate(text, 18)}</div>
      </div>
    </div>
  );
};