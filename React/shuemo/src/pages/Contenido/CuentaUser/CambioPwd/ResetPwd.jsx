import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/useAuth';
import SetNewPwd from './SetNewPwd';
import { BACKEND_URL } from '../../../../utils/api/config';

const ResetPwd = ({ onCancel, onSubmit, onForgot }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const [showSetNewPwd, setShowSetNewPwd] = useState(false);
  const [hashedPassword, setHashedPassword] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPasswordHash = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BACKEND_URL}/api/empleado/${user?.idUsuario}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHashedPassword(data.passwd);
      } catch (error) {
        toast.error('Error al obtener la contraseña del usuario');
        console.error(error);
      }
    };

    if (user?.idUsuario) {
      fetchPasswordHash();
    }
  }, [user]);

  const handleSubmit = () => {
    if (!hashedPassword) {
      setError('No se pudo encontrar la contraseña del usuario.');
      return;
    }

    // Validar la contraseña anterior usando bcrypt
    bcrypt.compare(oldPassword, hashedPassword, (err, isMatch) => {
      if (err) {
        setError('Error al validar la contraseña');
        toast.error('Error al validar la contraseña');
      } else if (isMatch) {
        setShowSetNewPwd(true);
        toast.success('Contraseña validada con éxito');
      } else {
        setError('Contraseña incorrecta');
        toast.error('Contraseña incorrecta');
      }
    });
  };

  if (showSetNewPwd) {
    return <SetNewPwd onCancel={onCancel} onSubmit={onSubmit} userId={user?.idUsuario} />;
  }

  return (
    <div className="bg-fondo-300 p-8 rounded-lg mt-16 mx-auto w-full max-w-md">
      <h2 className="text-white text-2xl mb-4">Control de seguridad</h2>
      <div className="mb-4">
        <label className="text-white block mb-2">Contraseña anterior</label>
        <input 
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="**********" 
          className="w-full p-4 rounded bg-fondo-200 text-white text-lg" 
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="flex justify-between gap-4">
        <button 
          onClick={onCancel} 
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSubmit} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ResetPwd;
