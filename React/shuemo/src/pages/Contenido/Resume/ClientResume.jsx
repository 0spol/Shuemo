import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { ClientResume } from '../../../component/ResumeWidget/CardWidget';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import { BACKEND_URL } from '../../../utils/api/config';

function ClienteResumeComponent() {
  const [clientes, setClientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    if (user?.idEmpresa) {
      fetchClientesEmpresa(user.idEmpresa);
      fetchCitasEmpresa(user.idEmpresa);
    }
  }, [token, user]);

  const fetchClientesEmpresa = async (idEmpresa) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/empresa/${idEmpresa}/clientes`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    navigate(`/contenido#cliente?id=${id}`, { state: { reload: true } });
  };

  return (
      <Card
        className='bg-fondo-300 border border-borde-100 text-white'
        cover={
          <div className='text-center p-1 border-b-borde-100 border-b-2'>
            <h2>Resumen Clientes</h2>
          </div>
        }
      >
        {citas.length === 0 ? (
          <div className='text-center p-1'>
            <h3>No hay clientes dados de alta</h3>
          </div>
        ) : (
          clientes.slice(0, 3).map(cliente => (
            <div key={cliente.id} style={{ marginBottom: '1em' }} onClick={() => handleCardClick(cliente.id)}>
              <ClientResume
                id={cliente.id}
                direccion={cliente.direccion}
                nombre={cliente.nombre}
                email={cliente.email}
                telefono={cliente.telefonoUno} // assuming telefonoUno is the primary phone number
                citas={citas.filter(cita => cita.cliente.id === cliente.id)} // filter citas for the current client
              />
            </div>
          ))
        )}
      </Card>
  );
}

export default ClienteResumeComponent;
