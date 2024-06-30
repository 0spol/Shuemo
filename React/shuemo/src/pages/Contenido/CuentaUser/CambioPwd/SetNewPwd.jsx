import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/useAuth';
import { BACKEND_URL } from '../../../../utils/api/config';

const SetNewPwd = ({ onCancel, onSubmit, userId }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user, logout } = useAuth();

  const validatePassword = (password) => {
    const reg = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,}$/;
    return (
      password.length >= 6 &&
      reg.test(password)
    );
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    if (!validatePassword(newPassword)) {
      alert('La contraseña debe tener al menos 6 caracteres, 1 número y 1 letra.');
      return;
    }

    if (!user) {
      toast.error('No se pudo cargar la información del usuario.');
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const updatedEmpleado = {
        ...user,
        passwd: newPassword,
        departamento: user.departamento ? { id: user.departamento.id } : null,
      };

      const updateResponse = await fetch(`${BACKEND_URL}/api/account/updatePassword/${userId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEmpleado)
      });

      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }

      toast.success('Contraseña actualizada con éxito');
      onSubmit(newPassword);
      logout();  // Desloguear al usuario después de actualizar la contraseña
    } catch (error) {
      toast.error('Error al actualizar la contraseña');
      console.error(error);
    }
  };

  return (
    <div className="bg-fondo-300 p-8 rounded-lg mt-16 mx-auto w-full max-w-md">
      <h2 className="text-white text-2xl mb-4">Cambiar contraseña</h2>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Nueva contraseña</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded bg-fondo-100 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Confirmar nueva contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border rounded bg-fondo-100 text-white"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default SetNewPwd;
