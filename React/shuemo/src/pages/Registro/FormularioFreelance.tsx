import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { BotonAccion, BotonLink } from "../../component/Botones/Botones";
import './registro.css';
import "../../styles/estilos.css";
import { toast } from "react-toastify";
import { useAuth } from "../../context/useAuth";
import { BACKEND_URL } from "../../utils/api/config";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ConfirmationModal from "./Modal";

type Props = {};

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  cuantos: string;
  accion: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Debe ser un correo electrónico válido")
    .required("Email es requerido"),
  userName: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres")
    .required("Nombre es requerido"),
    password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{6,}$/, "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial")
    .required("Contraseña es requerida"),
  direccion: Yup.string()
    .max(200, "La dirección no puede tener más de 200 caracteres")
    .required("Necesita escribir una dirección"),
  telefono: Yup.string()
    .matches(/^\d+$/, "El teléfono debe contener solo números")
    .min(9, "El teléfono debe tener al menos 9 caracteres")
    .max(15, "El teléfono no puede tener más de 15 caracteres")
    .required("Teléfono es requerido"),
  ciudad: Yup.string().required("La ciudad es necesaria"),
  cuantos: Yup.string().required("Debe especificar la cantidad de trabajadores"),
  accion: Yup.string()
    .max(250, "La descripción no puede superar los 250 caracteres")
    .required("Descripción de la acción es requerida"),
});

const FormularioFreelance = (props: Props) => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validationSchema) });

  const [loading, setLoading] = useState(false); // Pantalla carga

  const onSubmit: SubmitHandler<RegisterFormsInputs> = async (data) => {
    try {
      setLoading(true);
      const registroExitoso = await registerUser(data.email, data.userName, data.password, data.ciudad, data.direccion, data.telefono, "13", "1", data.cuantos, data.accion, "Freelance " + data.userName, "Administración");
      if (registroExitoso) {
        setVisible(true);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Parte modal
  const [visible, setVisible] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const handleConfirm = () => {
    setConfirmation(true);
    setVisible(false);
    navigate("/")
  };

  //Mostrar errores
  const onError = (errors: any) => {
    for (const key in errors) {
      if (errors[key]) {
        toast.warning(errors[key].message);
      }
    }
  };

  //Control de formulario
  const [mostrarSegundaParte, setMostrarSegundaParte] = useState(false);

  const handleSiguienteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setMostrarSegundaParte(!mostrarSegundaParte);
  };

  //Cargar datos necesarios
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resCiudades = await fetch(`${BACKEND_URL}/api/ciudad/r`);
        if (!resCiudades.ok) {
          throw new Error(`HTTP error! status: ${resCiudades.status}`);
        }
        const dataCiudades = await resCiudades.json();
        setCiudades(dataCiudades);
      } catch (error) {
        console.error('Error al cargar las ciudades:', error.message);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading &&
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black">
          <div className="flex items-center justify-center min-h-screen">
            <video className="w-1/12 h-1/12" autoPlay loop muted>
              <source src="assets/cargando.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      }
      {/* Video sacado de https://es.vecteezy.com/video/9261197-animacion-cargando-circulo-icono-cargando-gif-cargando-pantalla-gif-cargando-video-spinner-gif-video-cargando-animacion-video-cargando-sobre-fondo-negro */}
      
      {/* Formulario segunda parte */}

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={"flex flex-col shadow-md bg-fondo-300 rounded-3xl px-8 pt-6 pb-8 mb-4 border border-borde-100" + (mostrarSegundaParte ? '' : ' hidden')}>
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4 mb-4 text-xl font-medium text-center">
              Cuentanos más sobre tu negocio
            </div>
            <div className="w-1/2 px-4 mb-4 text-xl font-medium text-center">
              ¿Vas a trabajar solo?
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4 mb-4">
              <label className="flex justify-between items-center text-sm font-bold mb-2" htmlFor="accion">
                <span>¿A qué se dedica su negocio?</span>
                <abbr title="Breve descripción de lo que hace la empresa">
                  <div className="border hover:border-white hover:text-white text-gray-400 border-gray-400 h-5 w-5 rounded-full text-center items-center font-mono">i</div>
                </abbr>
              </label>
              <input
                className="inputsPersonalizados"
                id="accion"
                type="text"
                placeholder="Planto pistachos y los vend..."
                {...register("accion")}
              />
              {errors.accion && <p className="text-red-500 text-xs italic">{errors.accion.message}</p>}
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="cuantos">
                ¿Cuántos trabajores vas a tener?
              </label>
              <select
                className="inputsPersonalizados"
                id="cuantos"
                defaultValue=""
                {...register("cuantos")}
              >
                <option value="" disabled>¿Cuántos trabajadores?</option>
                <option value="1">Solo yo</option>
                <option value="4">Yo y 3 personas más</option>
              </select>
              {errors.cuantos && <p className="text-red-500 text-xs italic">{errors.cuantos.message}</p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4 mb-4 flex justify-end">
              <BotonAccion onclick={handleSiguienteClick} contenido={"Volver"} size={"L"}></BotonAccion>
            </div>
            <div className="w-1/2 px-4 mb-4">
              <button type="submit" className="px-4 py-2 bg-boton-100 hover:bg-boton-200 border border-transparent rounded text-white">Registrar</button>
            </div>
          </div>
        </div>

        {/* Formulario primera parte */}

        <div className={"flex flex-col shadow-md bg-fondo-300 rounded-3xl px-8 pt-6 pb-8 mb-4 border border-borde-100" + (mostrarSegundaParte ? ' hidden' : '')}>
          <div className="mb-10 text-2xl font-bold self-center">Creación de Freelance</div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4 mb-4">
              <label className="flex justify-between items-center text-sm font-bold mb-2" htmlFor="userName">
                <span>¿Cual es tu nombre?</span>
                <abbr title="Nombre del usuario administrador">
                  <div className="border hover:border-white hover:text-white text-gray-400 border-gray-400 h-5 w-5 rounded-full text-center items-center font-mono">i</div>
                </abbr>
              </label>
              <input
                className="inputsPersonalizados"
                id="userName"
                type="text"
                placeholder="Nombre usuario"
                {...register("userName")}
              />
              {errors.userName && <p className="text-red-500 text-xs italic">{errors.userName.message}</p>}
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label className="flex justify-between items-center text-sm font-bold mb-2" htmlFor="ciudad">
                <span>Ciudad</span>
                <abbr title="La ciudad en la que se ubica la empresa">
                  <div className="border hover:border-white hover:text-white text-gray-400 border-gray-400 h-5 w-5 rounded-full text-center items-center font-mono">i</div>
                </abbr>
              </label>
              <select
                className="inputsPersonalizados"
                id="ciudad"
                defaultValue=""
                {...register("ciudad")}
              >
                <option value="" disabled>Seleccione una ciudad</option>
                {ciudades.map(ciudad => (
                  <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                ))}
              </select>
              {errors.ciudad && <p className="text-red-500 text-xs italic">{errors.ciudad.message}</p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4 mb-4">
              <label className="flex justify-between items-center text-sm font-bold mb-2" htmlFor="email">
                <span>Email</span>
                <abbr title="Correo electrónico del usuario administrador">
                  <div className="border hover:border-white hover:text-white text-gray-400 border-gray-400 h-5 w-5 rounded-full text-center items-center font-mono">i</div>
                </abbr>
              </label>
              <input
                className="inputsPersonalizados"
                id="email"
                type="text"
                placeholder="email@gmail.com"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label className="flex justify-between items-center text-sm font-bold mb-2" htmlFor="direccion">
                <span>Dirección</span>
                <abbr title="Dirección de la empresa">
                  <div className="border hover:border-white hover:text-white text-gray-400 border-gray-400 h-5 w-5 rounded-full text-center items-center font-mono">i</div>
                </abbr>
              </label>
              <input
                className="inputsPersonalizados"
                id="direccion"
                type="text"
                placeholder="Dirección"
                {...register("direccion")}
              />
              {errors.direccion && <p className="text-red-500 text-xs italic">{errors.direccion.message}</p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4 mb-4">
              <label className="flex justify-between items-center text-sm font-bold mb-2" htmlFor="password">
                <span>Contraseña</span>
                <abbr title="Esta contraseña será la contraseña del administrador">
                  <div className="border hover:border-white hover:text-white text-gray-400 border-gray-400 h-5 w-5 rounded-full text-center items-center font-mono">i</div>
                </abbr>
              </label>
              <input
                className="inputsPersonalizados"
                id="password"
                type="password"
                placeholder="************"
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>
            <div className="w-1/2 px-4 mb-4">
              <label className="flex justify-between items-center text-sm font-bold mb-2" htmlFor="telefono">
                <span>Teléfono</span>
                <abbr title="Teléfono que se registrará como el teléfono de la empresa y del administrador">
                  <div className="border hover:border-white hover:text-white text-gray-400 border-gray-400 h-5 w-5 rounded-full text-center items-center font-mono">i</div>
                </abbr>
              </label>
              <input
                className="inputsPersonalizados"
                id="telefono"
                type="text"
                placeholder="Teléfono"
                {...register("telefono")}
              />
              {errors.telefono && <p className="text-red-500 text-xs italic">{errors.telefono.message}</p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4 mb-4 flex justify-end">
              <BotonLink link="/Card" contenido={"Volver"} size={"L"}></BotonLink>
            </div>
            <div className="w-1/2 px-4 mb-4">
              <BotonAccion onclick={handleSiguienteClick} contenido={"Siguiente"} size={"L"}></BotonAccion>
            </div>
          </div>
        </div>
      </form>
      <Modal isVisible={visible} onConfirm={handleConfirm} />

    </div>
  );
}

export default FormularioFreelance;
