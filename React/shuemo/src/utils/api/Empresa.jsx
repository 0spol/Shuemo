import React, { useState, useEffect } from 'react';
import TablaEmpresa from '../../pages/Contenido/TablaEmpresa/TablaEmpresa';
import ModificarEmpresa from '../../pages/Contenido/TablaEmpresa/ModificarEmpresa';
import { useAuth } from '../../context/useAuth'; // Asegúrate de que el token esté disponible en el contexto de autenticación
import { BACKEND_URL, ID_ADMINISTRADOR } from './config';

export function Empresa() {
  const [empresas, setEmpresas] = useState([]);
  const [moduloHabilitado, setModuloHabilitado] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { token, user } = useAuth(); // Obtén el token y el usuario desde el contexto de autenticación
  const [userEmpresa, setUserEmpresa] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/empresa/r`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setEmpresas(data);
        } else {
          console.error('Error al obtener los datos:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    if (user?.roles.includes(ID_ADMINISTRADOR)) {
      fetchEmpresas();
    } else {
      const fetchUserEmpresa = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/empresa/${user.idEmpresa}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            setUserEmpresa(data);
          } else {
            console.error('Error al obtener la empresa del usuario:', response.statusText);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

      fetchUserEmpresa();
    }
  }, [moduloHabilitado, token, user]);

  const habilitarModulo = (id = null) => {
    setSelectedId(id);
    setModuloHabilitado(true);
  };

  const deshabilitarModulo = () => {
    setSelectedId(null);
    setModuloHabilitado(false);
  };

  const handleSave = () => {
    deshabilitarModulo();
    // You might also want to re-fetch the data here if needed
  };

  if (!user) {
    return <div>Loading...</div>; // Manejo de carga o redirección según sea necesario
  }

  return (
    <div>
      {user.roles.includes(ID_ADMINISTRADOR) ? (
        !moduloHabilitado ? (
          <div id='contenedorEmpresa' className="flex items-center">
            <TablaEmpresa
              empresas={empresas}
              setEmpresas={setEmpresas}
              selectedId={selectedId}
              onEdit={habilitarModulo}
            />
          </div>
        ) : (
          <ModificarEmpresa
            empresaId={selectedId}
            deshabilitarModulo={deshabilitarModulo}
            onSave={handleSave}
            isUpdating={true}
          />
        )
      ) : (
        userEmpresa && (
          <ModificarEmpresa
            empresaId={user.idEmpresa}
            empresaInicial={userEmpresa}
            deshabilitarModulo={deshabilitarModulo}
            isUpdating={true}
            onSave={handleSave}
          />
        )
      )}
    </div>
  );
}
