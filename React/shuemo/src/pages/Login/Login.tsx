import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../styles/estilos.css";
import { useAuth } from "../../context/useAuth";

type LoginFormsInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginPage = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.email, form.password);
  };

  return (
    <section className="bg-fondo-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border sm:max-w-md xl:p-0 bg-fondo-300 border-borde-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl text-white">
              Iniciar sesión
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="inputsPersonalizados"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="inputsPersonalizados"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
                <Link to={"/recuperar"} className="text-xs  text-gray-500 font-medium text-primary-600 hover:underline" >
                  ¿Has olvidado la contraseña?
                </Link>
              <button
                type="submit"
                className="w-full bg-boton-100 hover:bg-boton-200 border border-transparent  text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-light text-gray-500">
                ¿Aún no tienes una cuenta?{" "}
                <Link to={"/card"} className="font-medium text-primary-600 hover:underline" >
                  Registrarse
                </Link>
              </p>
              
            </form>
          </div>
        </div>
        <div className="w-full rounded-lg sm:max-w-md pl-3">
          <Link to={"/"} className="text-sm font-light text-gray-500 hover:underline" >
            Volver
          </Link>
        </div>

        <img src='/assets/Logo.png' className='md:mt-20 w-20 h-20' />
      </div>
    </section>
  );
};
