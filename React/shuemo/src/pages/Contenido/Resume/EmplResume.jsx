import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { EmplResume } from '../../../component/ResumeWidget/CardWidget';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function EmplResumeComponent() {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    if (user?.idEmpresa) {
      fetchEmpleadosEmpresa(user.idEmpresa);
    }
  }, [user, token]);

  const fetchEmpleadosEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/empresa/${idEmpresa}/empleados`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handleCardClick = (id) => {
    navigate(`/contenido#empleado?id=${id}`, { state: { reload: true } });
  };

  return (
      <Card
        className='bg-fondo-300 border border-borde-100 text-white'
        cover={
          <div className='text-center p-1 border-b-borde-100 border-b-2'>
            <h2>Resumen Empleados</h2>
          </div>
        }
      >
        {empleados.length === 0 ? (
          <div className='text-center p-1'>
            <h3>No hay empleados dados de alta</h3>
          </div>
        ) : (
          empleados.slice(0, 3).map(empleado => (
            <div key={empleado.id} style={{ marginBottom: '1em' }} onClick={() => handleCardClick(empleado.id)}>
              <EmplResume
                id={empleado.id}
                rol={empleado.rol}
                nombre={empleado.nombre}
                email={empleado.email}
                telefono={empleado.telefono}
                deshabilitado={empleado.deshabilitado}
              />
            </div>
          ))
        )}
      </Card>
  );
}

export default EmplResumeComponent;
