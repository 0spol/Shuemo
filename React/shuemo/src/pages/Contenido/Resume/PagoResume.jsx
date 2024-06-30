import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { PagoResume } from '../../../component/ResumeWidget/CardWidget';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function PagoResumeComponent() {
  const [pagos, setPagos] = useState([]);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    if (user?.idEmpresa) {
      fetchPagosEmpresa(user.idEmpresa);
    }
  }, [token, user]);

  const fetchPagosEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/empresa/${idEmpresa}/pagos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPagos(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/contenido#pago?id=${id}`, { state: { reload: true } });
  };

  const formatFecha = (fecha) => {
    return format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es });
  };

  return (
      <Card
        className='bg-fondo-300 border border-borde-100 text-white'
        cover={
          <div className='text-center p-1 border-b-borde-100 border-b-2'>
            <h2>Resumen Pagos</h2>
          </div>
        }
      >
        {pagos.length === 0 ? (
          <div className='text-center p-1'>
            <h3>No hay instancias de pagos</h3>
          </div>
        ) : (
          pagos.slice(0, 3).map(pago => (
            <div key={pago.id} style={{ marginBottom: '1em' }} onClick={() => handleCardClick(pago.id)}>
              <PagoResume
                id={pago.id}
                nombre={pago.cliente.nombre}
                service={pago.detalles}
                cost={pago.monto}
                state={pago.estado}
                fechaPago={formatFecha(pago.fechaProxPago)}
                fechaProxPago={formatFecha(pago.fechaPago)}
              />
            </div>
          ))
        )}
      </Card>
  );
}

export default PagoResumeComponent;
