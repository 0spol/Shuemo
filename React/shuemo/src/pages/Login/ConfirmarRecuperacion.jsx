import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../utils/api/config';

export default function ConfirmarRecuperacion() {
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    // Obtener el token de la URL
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,}$/;

        if (!passwordRegex.test(password)) {
            setError('La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch(BACKEND_URL + `/api/account/recuperar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            if (response.ok) {
                toast.success('Contraseña restablecida');
                navigate('/login');
            } else {
                setError('Error al restaurar la contraseña, prueba otra vez.');
                toast.warning('Error al restaurar la contraseña, prueba otra vez.');
            }
        } catch (err) {
            setError('Error al restaurar la contraseña, prueba otra vez.');
            toast.warning('Error al restaurar la contraseña, prueba otra vez.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 rounded-lg bg-fondo-300 shadow-md max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Cambia tu contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Nueva contraseña</label>
                        <input 
                            type="password"
                            className="inputsPersonalizados"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Confirma tu nueva contraseña</label>
                        <input 
                            type="password"
                            className="inputsPersonalizados"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white"
                    >
                        Cambiar contraseña
                    </button>
                </form>
            </div>
        </div>
    );
}
