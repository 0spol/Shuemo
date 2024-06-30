import { toast } from "react-toastify";
import React from 'react';
import { Link } from 'react-router-dom';

export function Error({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="text-center p-6 bg-fondo-300 rounded-lg shadow-lg">
        <img src='/assets/fineCustom.png' className="w-28 h-28 mx-auto mb-4" alt="Not Found" />
        <h1 className="text-2xl font-bold text-red-500 mb-2">{message}</h1>
        <p className="text-gray-300 mb-4">This is <span className="font-bold">NOT</span> fine</p>
      </div>
        <Link to='/' className="hover:underline pt-3">
          Volver a Home
        </Link>
    </div>
  );
}
