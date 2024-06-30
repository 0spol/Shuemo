import React, { useState } from 'react';
import { Card } from 'antd';
import { BotonAccion, BotonLink } from '../../component/Botones/Botones';

const { Meta } = Card;

export default function Cartas() {
  const [cartaFrelance, setCartaFrelance] = useState(false);
  const [cartaPeque, setCartaPeque] = useState(false);
  const [cartaGran, setCartaGran] = useState(false);

  const handleCartaFrelance = () => {
    setCartaFrelance(!cartaFrelance);
  };
  const handleCartaPeque = () => {
    setCartaPeque(!cartaPeque);
  };
  const handleCartaGran = () => {
    setCartaGran(!cartaGran);
  };

  return (
    <div className='flex space-x-32 h-screen items-center justify-center m-auto'>
      <div className={`flip-card ${cartaFrelance ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card
              hoverable
              className='bg-fondo-300 border-2 border-borde-100 text-white w-300 h-tarjeta overflow-hidden'
              cover={
                <div className="h-200 m-auto justify-center items-center rounded-es-xl rounded-ee-xl overflow-hidden border-b-2 border-b-borde-100">
                  <img alt="Imagen Freelance" src="assets/freelance.jpg" className="max-h-full min-h-full w-auto" />
                </div>
              }
              onClick={handleCartaFrelance}
            >
              <Meta
                title={<span className='text-white'>Freelance</span>}
                description={
                  <>
                    <span className='text-white'>Destinado a trabajadores por cuenta propia que quieran dar un toque más profesional a su negocio,
                    con la posibilidad de administrar de uno a cuatro empleados </span>
                    <div className="fixed bottom-0 left-0 w-full p-4">
                      <div className='space-x-2 flex justify-between'>
                        <BotonAccion onClick={handleCartaFrelance} contenido={"Información"} size={"M"} />
                        <BotonLink link='/formularioFreelance' contenido={"Seleccionar"} size={"M"} />
                      </div>
                    </div>
                  </>
                }
              />
            </Card>
          </div>
          <div className="flip-card-back">
            <Card
              hoverable
              className='bg-fondo-300 border-2 border-borde-100 text-white w-300 h-tarjeta overflow-hidden'
              cover={
                <div className="h-200 m-auto justify-center items-center rounded-es-xl rounded-ee-xl overflow-hidden border-b-2 border-b-borde-100">
                  <img alt="example" src="assets/freelanceAtras.jpg" className="max-h-full min-h-full w-auto" />
                </div>
              }
              onClick={handleCartaFrelance}
            >
              <Meta
                title={<span className='text-white'>Más información</span>}
                description={
                  <>
                    <span className='text-white'>
                      Por ejemplo si eres un fotógrafo o un diseñador esta sería tu opción a elegir, ya que podrás administrar tu negocio de forma más ágil y profesional
                    </span>
                    <div className="fixed bottom-0 left-0 w-full p-4 text-center">
                      <BotonAccion onClick={handleCartaFrelance} contenido={"Volver"} size={"M"} />
                    </div>
                  </>
                }
              />
            </Card>
          </div>
        </div>
      </div>

      <div className={`flip-card ${cartaPeque ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card
              hoverable
              className='bg-fondo-300 border-2 border-borde-100 text-white w-300 h-tarjeta overflow-hidden'
              cover={
                <div className="h-200 m-auto justify-center items-center rounded-es-xl rounded-ee-xl overflow-hidden border-b-2 border-b-borde-100">
                  <img alt="Imagen Frelance" src="assets/peque.jpg" className="max-h-full min-h-full w-auto" />
                </div>
              }
              onClick={handleCartaPeque}
            >
              <Meta
                title={<span className='text-white'>Empresa pequeña</span>}
                description={
                  <>
                    <span className='text-white'>Destinado a pequeñas empresas que quieran administrar su negocio de una forma más profesional, con la opcionabilidad de administrar de cinco a quince</span>
                    <div className="fixed bottom-0 left-0 w-full p-4">
                      <div className='space-x-2 flex justify-between'>
                        <BotonAccion onClick={handleCartaPeque} contenido={"Información"} size={"M"} />
                        <BotonLink link='/formularioEmpresa' contenido={"Seleccionar"} size={"M"} />
                      </div>
                    </div>
                  </>
                }
              />
            </Card>
          </div>
          <div className="flip-card-back">
            <Card
              hoverable
              className='bg-fondo-300 border-2 border-borde-100 text-white w-300 h-tarjeta overflow-hidden'
              cover={
                <div className="h-200 m-auto justify-center items-center rounded-es-xl rounded-ee-xl overflow-hidden border-b-2 border-b-borde-100">
                  <img alt="example" src="assets/pequeAtras.jpg" className="max-h-full min-h-full w-auto" />
                </div>
              }
              onClick={handleCartaPeque}
            >
              <Meta
                title={<span className='text-white'>Más información</span>}
                description={
                  <>
                    <span className='text-white'>
                      Por ejemplo si eres propietario de un taller, un salón de manicura esta sería tu opción
                    </span>
                    <div className="fixed bottom-0 left-0 w-full p-4 text-center">
                      <BotonAccion onClick={handleCartaPeque} contenido={"Volver"} size={"M"} />
                    </div>
                  </>
                }
              />
            </Card>
          </div>
        </div>
      </div>

      <div className={`flip-card ${cartaGran ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card
              hoverable
              className='bg-fondo-300 border-2 border-borde-100 text-white w-300 h-tarjeta overflow-hidden'
              cover={
                <div className="h-200 m-auto justify-center items-center rounded-es-xl rounded-ee-xl overflow-hidden border-b-2 border-b-borde-100">
                  <img alt="Imagen Frelance" src="assets/gran.jpg" className="max-h-full min-h-full w-auto" />
                </div>
              }
              onClick={handleCartaGran}
            >
              <Meta
                title={<span className='text-white'>Empresa grande</span>}
                description={
                  <>
                    <span className='text-white'>Destinado a grandes empresas que desean gestionar sus datos en nuestro CRM remoto, que tengan entre treinta y cien empleados</span>
                    <div className="fixed bottom-0 left-0 w-full p-4">
                      <div className='space-x-2 flex justify-between'>
                        <BotonAccion onClick={handleCartaGran} contenido={"Información"} size={"M"} />
                        <BotonLink link='/formularioEmpresa' contenido={"Seleccionar"} size={"M"} />
                      </div>
                    </div>
                  </>
                }
              />
            </Card>
          </div>
          <div className="flip-card-back">
            <Card
              hoverable
              className='bg-fondo-300 border-2 border-borde-100 text-white w-300 h-tarjeta overflow-hidden'
              cover={
                <div className="h-200 m-auto justify-center items-center rounded-es-xl rounded-ee-xl overflow-hidden border-b-2 border-b-borde-100">
                  <img alt="example" src="assets/granAtras.png" className="max-h-full min-h-full w-auto" />
                </div>
              }
              onClick={handleCartaGran}
            >
              <Meta
                title={<span className='text-white'>Más información</span>}
                description={
                  <>
                    <span className='text-white'>
                      Por ejemplo si eres una empresa con varios empleados, departamentos y tengas desde treinta hasta cien empleados esta es tu opción
                    </span>
                    <div className="fixed bottom-0 left-0 w-full p-4 text-center">
                      <BotonAccion onClick={handleCartaGran} contenido={"Volver"} size={"M"} />
                    </div>
                  </>
                }
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
