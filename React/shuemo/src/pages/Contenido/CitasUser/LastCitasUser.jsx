import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { LastCitasUser } from '../../../component/ResumeWidget/CardWidget';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../utils/api/config';

function LastCitasUserComponent() {
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/cita/r`)
      .then(response => response.json())
      .then(data => {
        const filteredCitas = data.filter(cita => {
          const citaDate = new Date(cita.fecha);
          const today = new Date();
          const inFiveDays = new Date(today);
          inFiveDays.setDate(today.getDate() + 5);
          return citaDate >= today && citaDate <= inFiveDays;
        });
        setCitas(filteredCitas);
      })
      .catch(error => console.error('Error fetching citas:', error));
  }, []);

  const handleCardClick = (id) => {
    const newUrl = `/contenido#cita?id=${id}`;
    window.history.pushState({}, '', newUrl);
    navigate(newUrl);
    window.location.reload(); // Forzamos la recarga del componente
  };

  return (
    <Card
      className='bg-fondo-300 border border-borde-100 text-white'
      cover={
        <div className='text-center p-1 border-b-borde-100 border-b-2'>
          <h2>Últimas Citas</h2>
        </div>
      }
    >
      {citas.slice(0, 3).map(cita => (
        <div key={cita.id} style={{ marginBottom: '1em' }} onClick={() => handleCardClick(cita.id)}>
          <LastCitasUser
            id={cita.id}
            fecha={cita.fecha}
            nombre={cita.cliente.nombre}
            text={cita.descripcion}
          />
        </div>
      ))}
    </Card>
  );
}

export default LastCitasUserComponent;
