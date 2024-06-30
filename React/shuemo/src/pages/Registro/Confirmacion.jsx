import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../utils/api/config';

export default function Confirmacion() {
    const location = useLocation();
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useState(false);
    const [error, setError] = useState(null);

    // Obtener el token de la URL
    const token = new URLSearchParams(location.search).get('token');

    // Manejar la confirmación
    const handleConfirm = async () => {
        setError(null); // Resetear el error antes de una nueva solicitud
        try {
            const response = await fetch(BACKEND_URL+`/api/account/confirm?token=${token}`);
            if (response.ok) {
                toast.success('Cuenta confirmada con exito');
                navigate('/login');
            } else {
                setError('Error al confirmar la cuenta, prueba otra vez.');
                toast.warning('Error al confirmar la cuenta, prueba otra vez.');
            }
        } catch (err) {
            setError('Error al confirmar la cuenta, prueba otra vez.');
            toast.warning('Error al confirmar la cuenta, prueba otra vez.');
        }
    };

    // Renderizar la confirmación
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 rounded-lg bg-fondo-300 shadow-md max-w-md w-full">
                {confirmation ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Confirma tu cuenta</h2>
                        <p className="mb-4">¿Seguro que desea confirmar la creación de la cuenta?</p>
                        <button 
                            onClick={handleConfirm} 
                            className="px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white"
                        >
                            Si, quiero crear mi cuenta
                        </button>
                        <button 
                            onClick={() => setConfirmation(false)} 
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-4 hover:bg-gray-600 transition duration-300"
                        >
                            No, gracias
                        </button>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Confirma tu cuenta</h2>
                        <p className="mb-4">Por favor crea tu cuenta, haciendo clic en el botón.</p>
                        <button 
                            onClick={() => setConfirmation(true)} 
                            className="px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white"
                        >
                            Confirmar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
