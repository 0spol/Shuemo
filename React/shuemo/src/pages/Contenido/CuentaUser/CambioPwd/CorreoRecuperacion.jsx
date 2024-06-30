import React, { useState } from 'react';
import { BotonAccion } from '../../../../component/Botones/Botones';

const CorreoRecuperacion = ({ onCancel, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar que el correo electrónico sea válido
    if (email) {
      onSubmit(email);
    }
  };

  return (
    <div className="bg-fondo-300 p-8 rounded-lg mt-16 mx-auto w-full max-w-md text-center">
      <h2 className="text-white text-2xl mb-4">Correo Recuperación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full p-4 rounded bg-fondo-200 text-white text-lg mb-4"
          required
        />
        <div className="flex justify-between gap-4">
          <BotonAccion 
            onclick={onCancel} 
            contenido="Cancelar" 
            size="M" 
          />
          <button
            type="submit"
            className="px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white text-lg"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CorreoRecuperacion;