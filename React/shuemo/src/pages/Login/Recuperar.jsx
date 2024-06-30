import React, { useState } from 'react';
import { BACKEND_URL } from '../../utils/api/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Recuperar = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setMessage(null); // Resetear el mensaje antes de una nueva solicitud
        try {
            const response = await fetch(`${BACKEND_URL}/api/account/emailRecuperar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }) // Corrección aquí
            });

            if (response.ok) {
                toast.success('Correo enviado');
                navigate('/login');
            } else {
                setMessage('Error al enviar el correo.');
                toast.warning('Error al enviar el correo.');
            }
        } catch (err) {
            setMessage('Error al enviar el correo.');
            toast.warning('Error al enviar el correo.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-fondo-300 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-white">Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="inputsPersonalizados"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white"
                    >
                        Enviar
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
            </div>
        </div>
    );
};

export default Recuperar;
