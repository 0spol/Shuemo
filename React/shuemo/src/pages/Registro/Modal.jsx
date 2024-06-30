import React, { useState } from 'react';

const Modal = ({ isVisible, onConfirm }) => {
  const [confirmation, setConfirmation] = useState(false);

  const handleConfirm = () => {
    setConfirmation(true);
    onConfirm(true);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 opacity-50" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="relative bg-fondo-300 w-3/12 rounded-lg p-4">
              <div className="mb-4">
                <h1 className="text-lg font-bold">Información</h1>
                <p>Se le ha enviado un correo de confirmación, confirme la creación de su cuenta</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white"
                  onClick={handleConfirm}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
