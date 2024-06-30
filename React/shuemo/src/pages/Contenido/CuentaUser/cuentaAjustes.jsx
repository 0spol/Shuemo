import React, { useState, useEffect } from 'react';
import { BotonAccion } from '../../../component/Botones/Botones';
import ResetPwd from './CambioPwd/ResetPwd';
import SetNewPwd from './CambioPwd/SetNewPwd';
import CorreoRecuperacion from './CambioPwd/CorreoRecuperacion';
import MensajeEnviado from '../../../component/MensajeEnviado';
import { BACKEND_URL } from '../../../utils/api/config';
import { useAuth } from '../../../context/useAuth';
import { toast } from 'react-toastify';

const CuentaAjustes = ({ onCancel }) => {
  const { user, token, logout } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [timeZones, setTimeZones] = useState([]);
  const [empleado, setEmpleado] = useState({
    email: '',
    departamento: '',
    rol: '',
    timeZone: '',
    nombre: '',
    apellidos: '',
    roles: [],
    passwd: '',
    dni: '',
    telefonoUno: '',
    telefonoDos: '',
    movil: '',
    detalles: '',
    tieneCuentaUsuario: false,
    deshabilitado: false
  });
  const [showResetPwd, setShowResetPwd] = useState(false);
  const [showSetNewPwd, setShowSetNewPwd] = useState(false);
  const [showCorreoRecuperacion, setShowCorreoRecuperacion] = useState(false);
  const [showMensajeEnviado, setShowMensajeEnviado] = useState(false);
  const [mensajeEnviado, setMensajeEnviado] = useState({ mensaje: '', imageUrl: '' });

  const apiKey = '22X2WQERJVYZ';

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resDepartamentos = await fetch(`${BACKEND_URL}/api/departamento/r`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!resDepartamentos.ok) {
          throw new Error('Error al cargar departamentos');
        }
        const dataDepartamentos = await resDepartamentos.json();
        setDepartamentos(dataDepartamentos);

        const resRoles = await fetch(`${BACKEND_URL}/api/roles/r`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!resRoles.ok) {
          throw new Error('Error al cargar roles');
        }
        const dataRoles = await resRoles.json();
        setRoles(dataRoles.filter(role => ['admin_empresa', 'empleado'].includes(role.nombre)));

        const resTimeZones = await fetch(`http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`);
        if (!resTimeZones.ok) {
          throw new Error('Error al cargar zonas horarias');
        }
        const dataTimeZones = await resTimeZones.json();
        const zones = dataTimeZones.zones
          .map(zone => zone.zoneName)
          .filter(zoneName => zoneName.startsWith('Europe/'));
        setTimeZones(zones);

        // Obtener los datos del usuario
        const resEmpleado = await fetch(`${BACKEND_URL}/api/empleado/${user.idUsuario}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!resEmpleado.ok) {
          throw new Error('Error al cargar datos del empleado');
        }
        const dataEmpleado = await resEmpleado.json();
        setEmpleado({
          email: dataEmpleado.email,
          departamento: dataEmpleado.departamentos?.[0]?.id || '',
          rol: dataEmpleado.roles?.[0]?.id || '',
          nombre: dataEmpleado.nombre,
          apellidos: dataEmpleado.apellidos,
          roles: dataEmpleado.roles || [],
          passwd: dataEmpleado.passwd || '',
          dni: dataEmpleado.dni || '',
          telefonoUno: dataEmpleado.telefonoUno || '',
          telefonoDos: dataEmpleado.telefonoDos || '',
          movil: dataEmpleado.movil || '',
          detalles: dataEmpleado.detalles || '',
          tieneCuentaUsuario: dataEmpleado.tieneCuentaUsuario,
          deshabilitado: dataEmpleado.deshabilitado,
          fotoPerfil: dataEmpleado.fotoPerfil ? `data:image/jpeg;base64,${dataEmpleado.fotoPerfil}` : null
        });

        if (dataEmpleado.fotoPerfil) {
          setProfileImage(`data:image/jpeg;base64,${dataEmpleado.fotoPerfil}`);
        }

      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    if (token) {
      cargarDatos();
    } else {
      console.error('Token is not available');
    }
  }, [apiKey, token, user.idUsuario]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);

      // Subir la imagen al backend
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${BACKEND_URL}/api/empleado/${user.idUsuario}/foto`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error('Error al subir la foto de perfil');
        }

        toast.success('Foto de perfil actualizada con éxito');
      } catch (error) {
        console.error('Error al subir la foto de perfil:', error);
        toast.error('Error al subir la foto de perfil');
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpleado(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedEmpleado = {
        ...empleado,
        roles: empleado.roles.map(rol => rol.id) // Asegúrate de enviar solo los IDs de los roles
      };

      if (user?.idUsuario && token) {
        const response = await fetch(`${BACKEND_URL}/api/empleado/u/${user.idUsuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedEmpleado)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Usuario actualizado:', data);
          setMensajeEnviado({
            mensaje: 'Datos actualizados con éxito. Cerrando sesión...',
            imageUrl: '/assets/Logo.png',
          });
          setShowMensajeEnviado(true);

          // Esperar unos segundos antes de cerrar sesión para mostrar el mensaje
          setTimeout(() => {
            logout();
          }, 3000);
        } else {
          throw new Error(`Error updating user: ${response.statusText}`);
        }
      } else {
        console.error('User ID or token is null');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCorreoRecuperacionSubmit = (email) => {
    console.log(`Correo de recuperación enviado a: ${email}`);
    setShowCorreoRecuperacion(false);
    setMensajeEnviado({
      mensaje: `Correo de recuperación enviado a: ${email}`,
      imageUrl: '/assets/Logo.png',
    });
    setShowMensajeEnviado(true);
  };

  const handleSetNewPwdSubmit = () => {
    setShowSetNewPwd(false);
    setMensajeEnviado({
      mensaje: 'Contraseña Cambiada!',
      imageUrl: '/assets/Logo.png',
    });
    setShowMensajeEnviado(true);
  };

  const closeMensajeEnviado = () => {
    setShowMensajeEnviado(false);
    setShowCorreoRecuperacion(false);
    setShowResetPwd(false);
  };

  return (
    <div className="bg-fondo-300 p-8 rounded-lg mt-16 mx-auto w-full max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-3xl">{user.username}</h2>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <i className="fa fa-user" style={{ color: 'white', fontSize: '96px' }}></i>
          )}
        </div>
      </div>
      <div className="flex mb-6">
        <button className="text-white px-6 py-3 border-b-2 border-white text-lg">Datos</button>
      </div>
      <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <label className="text-white block mb-3 text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={empleado.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-4 rounded bg-fondo-200 text-white text-lg"
          />
        </div>
        {user.roles.includes(2) && (
          <>
            <div>
              <label className="text-white block mb-3 text-lg">Departamento</label>
              <select
                name="departamento"
                value={empleado.departamento}
                onChange={handleChange}
                className="w-full p-4 rounded bg-fondo-200 text-white text-lg"
                disabled
              >
                {departamentos.map((depto) => (
                  <option key={depto.id} value={depto.id}>{depto.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white block mb-3 text-lg">Rol</label>
              <select
                name="rol"
                value={empleado.rol}
                onChange={handleChange}
                className="w-full p-4 rounded bg-fondo-200 text-white text-lg"
                disabled
              >
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>{rol.nombre === 'admin_empresa' ? 'Jefe' : 'Empleado'}</option>
                ))}
              </select>
            </div>
          </>
        )}
        <div>
          <label className="text-white block mb-3 text-lg">Zona Horaria</label>
          <select
            name="timeZone"
            value={empleado.timeZone}
            onChange={handleChange}
            className="w-full p-4 rounded bg-fondo-200 text-white text-lg"
          >
            <option value="" disabled>Seleccione una zona horaria</option>
            {timeZones.map((tz, index) => (
              <option key={index} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </form>
      <div className="flex justify-end gap-6">
        <BotonAccion 
          contenido="Guardar" 
          size="L" 
          type="submit" 
        />
        <button 
          onClick={handleCancel} 
          className="px-6 py-3 bg-boton-200 text-white rounded-md hover:bg-boton-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-boton-100"
        >
          Cancelar
        </button>
        <button 
          onClick={() => setShowResetPwd(true)} 
          className="px-6 py-3 bg-boton-200 text-white rounded-md hover:bg-boton-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-boton-100"
        >
          Cambiar Contraseña
        </button>
      </div>

      {showResetPwd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ResetPwd 
            onCancel={() => setShowResetPwd(false)}
            onSubmit={() => {
              setShowResetPwd(false);
              setShowSetNewPwd(true);
            }}
            onForgot={() => {
              setShowResetPwd(false);
              setShowCorreoRecuperacion(true);
            }}
          />
        </div>
      )}
      {showSetNewPwd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SetNewPwd 
            onCancel={() => setShowSetNewPwd(false)}
            onSubmit={handleSetNewPwdSubmit}
          />
        </div>
      )}
      {showCorreoRecuperacion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CorreoRecuperacion 
            onCancel={() => setShowCorreoRecuperacion(false)}
            onSubmit={handleCorreoRecuperacionSubmit}
          />
        </div>
      )}
      {showMensajeEnviado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <MensajeEnviado 
            mensaje={mensajeEnviado.mensaje}
            imageUrl={mensajeEnviado.imageUrl}
            onClose={closeMensajeEnviado} 
          />
        </div>
      )}
    </div>
  );
};

export default CuentaAjustes;
