import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Contenido } from './pages/Contenido/Contenido';
import Cartas from './pages/Registro/Cartas';
import FormularioFreelance from './pages/Registro/FormularioFreelance';
import FormularioEmpresa from './pages/Registro/FormularioEmpresa';
import { LoginPage } from './pages/Login/Login';
import { Error } from './helpers/ErrorHandler';
import { UserProvider, useAuth } from './context/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confirmacion from './pages/Registro/Confirmacion';
import Recuperar from './pages/Login/Recuperar';
import ConfirmarRecuperacion from './pages/Login/ConfirmarRecuperacion';

export function App() {
    return (
        <Router>
            <UserProvider>
                <AuthRoutes />
                <ToastContainer />
            </UserProvider>
        </Router>
    );
}

function AuthRoutes() {
    const { isLoggedIn } = useAuth();

    return (
        <Routes>
            <Route
                path="*"
                element={<Error message="404 - Página no encontrada" />} />
            <Route
                path="/"
                element={isLoggedIn() ? <Navigate to="/contenido" /> : <Home />} />
            <Route
                path="/login"
                element={isLoggedIn() ? <Navigate to="/contenido" /> : <LoginPage />} />
            <Route
                path="/card"
                element={isLoggedIn() ? <Navigate to="/contenido" /> : <Cartas />} />
            <Route
                path="/formularioFreelance"
                element={isLoggedIn() ? <Navigate to="/contenido" /> : <FormularioFreelance />} />
            <Route
                path="/formularioEmpresa"
                element={isLoggedIn() ? <Navigate to="/contenido" /> : <FormularioEmpresa />} />
            <Route
                path="/contenido"
                element={isLoggedIn() ? <Contenido /> : <Navigate to="/login" />} />
            <Route
                path="/confirm"
                element={isLoggedIn() ? <Navigate to="/contenido" /> : <Confirmacion />} />
            <Route
                path="/recuperar"
                element={isLoggedIn() ? <Navigate to="/contenido" /> : <Recuperar />} />
            <Route
                path="/cambiarContrasena"
                element={isLoggedIn() ? <Navigate to="/contenido" /> : <ConfirmarRecuperacion />} />
        </Routes>
    );
}
