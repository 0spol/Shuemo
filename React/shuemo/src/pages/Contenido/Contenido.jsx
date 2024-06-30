import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { Empleado } from '../../utils/api/Empleado';
import { Empresa } from '../../utils/api/Empresa';
import { Resume } from './Resume/Resume';
import { Pago } from '../../utils/api/Pago';
import { Cita } from '../../utils/api/Cita';
import { Cliente } from '../../utils/api/Cliente';
import LastCitasUserComponent from './CitasUser/LastCitasUser';
import CuentaDesplegable from './CuentaUser/cuentaDesplegable';
import CuentaAjustes from './CuentaUser/cuentaAjustes';
import { useAuth } from '../../context/useAuth';
import { ID_ADMINISTRADOR, ID_ADMINISTRADOR_EMPRESA } from '../../utils/api/config';
import { Departamento } from '../../utils/api/Departamento';

export const Contenido = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [isCitaPopupOpen, setIsCitaPopupOpen] = useState(false);
  const [isCuentaPopupOpen, setIsCuentaPopupOpen] = useState(false);
  const [isCuentaAjustesOpen, setIsCuentaAjustesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCitaPopup = () => {
    setIsCitaPopupOpen(!isCitaPopupOpen);
  };

  const toggleCuentaPopup = () => {
    setIsCuentaPopupOpen(!isCuentaPopupOpen);
  };

  const openCuentaAjustes = () => {
    setIsCuentaAjustesOpen(true);
    setIsCuentaPopupOpen(false);
  };

  const closeCuentaAjustes = () => {
    setIsCuentaAjustesOpen(false);
    navigate('/contenido');
  };

  useEffect(() => {
    setIsOpen(true);
    const hash = window.location.hash.substring(1);
    const [module, queryParams] = hash.split('?');
    const params = new URLSearchParams(queryParams);
    const id = params.get('id');

    if (module) {
      setActiveModule(module.toLowerCase());
    }
    if (id) {
      setSelectedId(id);
    }
  }, [location]);

  const menuItems = [
    ...(!!user ? [{ label: 'Home', link: "#home" }] : []),
    ...(user.roles.includes(ID_ADMINISTRADOR_EMPRESA) || user.roles.includes(ID_ADMINISTRADOR) ? [{ label: 'Empleado', link: "#empleado" }] : []),
    ...(user.roles.includes(ID_ADMINISTRADOR_EMPRESA) || user.roles.includes(ID_ADMINISTRADOR) ? [{ label: 'Empresa', link: "#empresa" }] : []),
    ...(!!user ? [{ label: 'Pago', link: "#pago" }] : []),
    ...(!!user ? [{ label: 'Cita', link: "#cita" }] : []),
    ...(!!user ? [{ label: 'Cliente', link: "#cliente" }] : []),
    ...(user.roles.includes(ID_ADMINISTRADOR_EMPRESA) || user.roles.includes(ID_ADMINISTRADOR) ? [{ label: 'Departamento', link: "#departamento" }] : []),
  ];

  const handleMenuItemClick = (label) => {
    setActiveModule(label.toLowerCase());
    setSelectedId(null);
  };

  return (
    <>
      <div className='bg-fondo-100 flex items-center justify-between border-b-2 border-borde-100 fixed top-0 left-0 right-0 z-50'>
        <button className='m-4' onClick={toggleMenu}>
          <i className="fa fa-bars" style={{ color: 'white', fontSize: '20px' }}></i>
        </button>
        <div className="flex items-center ml-auto">
          <button className='m-4' onClick={toggleCitaPopup}>
            <i className={`fa ${isCitaPopupOpen ? 'fa-times' : 'fa-clock'}`} style={{ color: 'white', fontSize: '20px' }}></i>
          </button>
          <button className='m-4' onClick={toggleCuentaPopup}>
            <i className={`fa ${isCuentaPopupOpen ? 'fa-times' : 'fa-user'}`} style={{ color: 'white', fontSize: '20px' }}></i>
          </button>
        </div>
      </div>
      <div className="relative flex min-h-screen pt-12">
        <nav
          className={`fixed border-r-2 border-borde-100 bg-fondo-200 h-full z-10 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-48`}
        >
          <ul className="mt-10">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <a href={item.link}
                  className={`text-white hover:text-brillante-100 block px-4 py-2 ${activeModule === item.label.toLowerCase() ? 'font-bold' : ''}`}
                  onClick={() => handleMenuItemClick(item.label)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`flex-grow p-8 bg-fondo-300 text-white transition-all duration-300 ${isOpen ? 'ml-48' : 'ml-0'}`}>
          {(activeModule === 'home' && !!user) && (
            <div>
              <Resume />
            </div>
          )}
          {(activeModule === 'empleado' && !!user && (user.roles.includes(ID_ADMINISTRADOR_EMPRESA) || user.roles.includes(ID_ADMINISTRADOR))) && (
            <Empleado selectedId={selectedId} />
          )}
          {(activeModule === 'empresa' && !!user && (user.roles.includes(ID_ADMINISTRADOR_EMPRESA) || user.roles.includes(ID_ADMINISTRADOR))) && (
            <Empresa />
          )}
          {(activeModule === 'pago' && !!user) && (
            <Pago selectedId={selectedId} />
          )}
          {(activeModule === 'cita' && !!user) && (
            <Cita selectedId={selectedId} />
          )}
          {(activeModule === 'cliente' && !!user) && (
            <Cliente selectedId={selectedId} />
          )}
          {(activeModule === 'departamento' && !!user && (user.roles.includes(2) || user.roles.includes(1))) && (
            <Departamento />
          )}
        </div>
      </div>
      {isCitaPopupOpen && (
        <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-20">
          <div className="bg-fondo-300 p-4 rounded-lg mt-16 mr-4">
            <LastCitasUserComponent />
          </div>
        </div>
      )}
      {isCuentaPopupOpen && (
        <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-20">
          <div className="bg-fondo-300 p-4 rounded-lg mt-16 mr-4">
            <CuentaDesplegable openCuentaAjustes={openCuentaAjustes} />
          </div>
        </div>
      )}
      {isCuentaAjustesOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-fondo-300 p-4 rounded-lg mt-16 w-full max-w-7xl">
            <CuentaAjustes onCancel={closeCuentaAjustes} />
          </div>
        </div>
      )}
    </>
  );
};
