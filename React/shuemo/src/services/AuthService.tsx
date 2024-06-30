import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/api/config";

const api = `${BACKEND_URL}/api/`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };
};

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await fetch(api + "account/login", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Captura el cuerpo de la respuesta
      throw new Error(errorData.message); // Lanza un Error con el mensaje del backend
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    const errorMessage = error.message || "An unexpected error occurred";
    console.log(errorMessage)
    toast.warning(errorMessage);
    throw error;
  }
};

export const registerAPI = async (
  email: string, username: string, password: string, ciudad: string, direccion: string, telefono: string, tipoDepartamento: string, tipoEmpresa: string, cuantos: string, accion: string,
  nombreEmpresa: string, nombreDepartamento: string
) => {
  try {
    const response = await fetch(api + "account/register", {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email, username, password, ciudad, direccion, telefono, tipoDepartamento, tipoEmpresa, cuantos, accion, nombreEmpresa, nombreDepartamento
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json(); // Captura el cuerpo de la respuesta
      throw new Error(errorData.message); // Lanza un Error con el mensaje del backend
    }
    return "Correo enviado";
  } catch (error) {
    toast.warning(error.message); // Muestra el mensaje de error capturado del backend
    throw error;
  }
};

