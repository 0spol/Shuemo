import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { CitaResume } from '../../../component/ResumeWidget/CardWidget';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function CitaResumeComponent() {
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    if (user?.idEmpresa) {
      fetchCitasEmpresa(user.idEmpresa);
    }
  }, [token, user]);

  const fetchCitasEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/empresa/${idEmpresa}/citas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      console.error('Error fetching citas:', error);
    }
  };

  const handleCardClick = (id) => {
    const newUrl = `/contenido#cita?id=${id}`;
    window.history.pushState({}, '', newUrl);
    navigate(newUrl);
    window.location.reload(); // Forzamos la recarga del componente
  };

  const formatFecha = (fecha) => {
    return format(new Date(fecha), 'dd/MM/yyyy HH:mm', { locale: es });
  };

  return (
    <Card
      className='bg-fondo-300 border border-borde-100 text-white'
      cover={
        <div className='text-center p-1 border-b-borde-100 border-b-2'>
          <h2>Resumen Citas</h2>
        </div>
      }
    >
      {citas.length === 0 ? (
        <div className='text-center p-1'>
          <h3>No hay citas arregladas</h3>
        </div>
      ) : (
        citas.slice(0, 3).map(cita => (
          <div key={cita.id} style={{ marginBottom: '1em' }} onClick={() => handleCardClick(cita.id)}>
            <CitaResume
              id={cita.id}
              fechaInicio={formatFecha(cita.fechaHoraInicio)}
              fechaFin={formatFecha(cita.fechaHoraFin)}
              nombre={cita.cliente.nombre}
              text={cita.descripcion}
            />
          </div>
        ))
      )}
    </Card>
  );
}

export default CitaResumeComponent;
