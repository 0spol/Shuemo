import React from 'react';
import { BotonAccion } from './Botones/Botones';

const MensajeEnviado = ({ mensaje, onClose, imageUrl }) => {
  return (
    <div className="bg-fondo-300 p-8 rounded-lg mt-16 mx-auto w-full max-w-md text-center">
      {imageUrl && (
        <div className="mb-4">
          <img src={imageUrl} alt="Mensaje enviado" className="mx-auto" style={{ maxWidth: '100px' }} />
        </div>
      )}
      <h2 className="text-white text-2xl mb-4">{mensaje}</h2>
      <div className="flex justify-end gap-4">
        <BotonAccion 
          onclick={onClose} 
          contenido="Cerrar" 
          size="M" 
        />
      </div>
    </div>
  );
};

export default MensajeEnviado;
