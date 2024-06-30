import React from 'react';
import { Link } from 'react-router-dom';

const sizeStyles = {
  L: {
    fontSize: '16px',
  },
  M: {
    fontSize: '14px',
  },
  S: {
    fontSize: '12px',
  },
  XS: {
    fontSize: '7px',
  },
};

//Boton que empleamos en el Home
export const BotonPrincipal = ({ link = "/", contenido, size, disabled = false }) => {
  const fontSize = sizeStyles[size] ? sizeStyles[size].fontSize : 'inherit';

  return (
    <Link to={ link }>
      <button
        className="border-2 border-borde-100 text-white hover:bg-gray-900 p-1 rounded-md text-sm mr-4"
        disabled={disabled}
      >
        <span style={{ fontSize }}>{contenido}</span>
      </button>
    </Link>

  );
};

//Boton que empleamos en links como por ejemplo en el Login
export const BotonLink = ({ link = "/", contenido, size, disabled = false }) => {
  const fontSize = sizeStyles[size] ? sizeStyles[size].fontSize : 'inherit';
  
  return (
    <Link to={ link }>
      <button className="px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white"
        disabled={disabled}
      >
        <span style={{ fontSize }}>{contenido}</span>
      </button>
    </Link>
  );
};

//Boton que no redirije a ningun lado sino que realiza una accion conj un onclick se puede utilizar en los formularios como en el de empleado 
export const BotonAccion = ({ onclick, contenido, size, disabled = false }) => {
  const fontSize = sizeStyles[size] ? sizeStyles[size].fontSize : 'inherit';
  
  return (
      <button onClick={onclick} className="px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white"
        disabled={disabled}
      >
        <span style={{ fontSize }}>{contenido}</span>
      </button>
  );
};
