import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';

const CuentaDesplegable = ({ openCuentaAjustes }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-fondo-300 p-4 rounded-lg mt-0 mr-4 w-60 flex flex-col items-end">
      <div className="flex items-center justify-end w-full mt-0 mb-2">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-8 h-8"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span className="text-white mr-2">{user.username}</span>
      </div>
      <ul className="w-full text-right">
        <li className="mb-2">
          <button
            onClick={openCuentaAjustes}
            className="text-white w-full text-right block px-4 py-2 hover:bg-boton-200 hover:text-fondo-300 rounded"
          >
            Mi cuenta
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-white w-full text-right block px-4 py-2 hover:bg-boton-200 hover:text-fondo-300 rounded"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CuentaDesplegable;
