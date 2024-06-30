import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';
import { BotonPrincipal } from '../../component/Botones/Botones';
import { MainHome } from './MainHome';
import { TerminosServicio } from './TerminosServicio';
import { PoliticaPrivacidad } from './PoliticaPrivacidad';
import { useState } from 'react';

export const Home = () => {

    const [activeComponent, setActiveComponent] = useState('home');

    const handleFooterLinkClick = (componentName) => {
        setActiveComponent(componentName);
    };

    let mainComponent;
    switch (activeComponent) {
        case 'home':
            mainComponent = <MainHome />;
            break;
        case 'politicaPrivacidad':
            mainComponent = <PoliticaPrivacidad />;
            break;
        case 'terminosServicio':
            mainComponent = <TerminosServicio />;
            break;
        default:
            mainComponent = <MainHome />;
    }

    return (
        <>
            {/* Menú superior */}
            <nav className="bg-fondo-100 flex items-center border-b-2 border-borde-100 p-4">
                <Link to="/">
                    <img src="/assets/Logo.png" className="ml-8" style={{ width: '30px', height: '30px' }} alt="Logo" />
                </Link>
                <div className="ml-auto flex space-x-4">
                    <BotonPrincipal link="/card" contenido="Registrarse" size="L" />
                    <BotonPrincipal link="/login" contenido="Iniciar sesión" size="L" />
                </div>
            </nav>

            {/* Main */}
            <main className="bg-black p-8 flex flex-col items-center justify-center min-h-screen text-white">
                {mainComponent}
            </main>


            {/* Footer */}
            <footer className="bg-fondo-100 p-4 text-center text-white border-t-2 border-borde-100">
                <div className="text-center">
                    <p>&copy; 2024 <a href="#" className="hover:underline" onClick={() => handleFooterLinkClick('home')}>Shuemo</a>
                        | <a href="#" className="hover:underline" onClick={() => handleFooterLinkClick('politicaPrivacidad')}>Política de Privacidad</a>
                        | <a href="#" className="hover:underline" onClick={() => handleFooterLinkClick('terminosServicio')}>Términos de Servicio</a>
                    </p>
                </div>
            </footer>
        </>
    );
};
