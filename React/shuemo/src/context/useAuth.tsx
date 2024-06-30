import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/AuthService";
import { toast } from "react-toastify";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    email: string,
    username: string,
    password: string,
    ciudad: string,
    direccion: string,
    telefono: string,
    tipoDepartamento: string,
    tipoEmpresa: string,
    cuantos: string,
    accion: string,
    nombreEmpresa: string,
    nombreDepartamento: string
  ) => Promise<boolean>;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string,
    ciudad: string,
    direccion: string,
    telefono: string,
    tipoDepartamento: string,
    tipoEmpresa: string,
    cuantos: string,
    accion: string,
    nombreEmpresa: string,
    nombreDepartamento: string
  ): Promise<boolean> => {
    try {
      await registerAPI(email, username, password, ciudad, direccion, telefono, tipoDepartamento, tipoEmpresa, cuantos, accion, nombreEmpresa, nombreDepartamento);
      return true; // Si el registro es exitoso, retornamos true
    } catch (e) {
      return false; // Si ocurre algún error, retornamos false
    }
};

  const loginUser = async (email: string, password: string) => {
    try {
      const res = await loginAPI(email, password);
      if (res) {
        const userObj = {
          idUsuario: res.idUsuario,
          username: res.username,
          email: res.email,
          roles: Array.isArray(res.roles) ? res.roles : [res.roles],
          idEmpresa: res.idEmpresa,
          idTipoEmpresa: res.idTipoEmpresa,
        };
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res.token);
        setUser(userObj);
        toast.success("Bienvenido " + res.username);
        navigate("/contenido");
      }
    } catch (e) {
    }
  };
  

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/");
    toast.success("Se ha cerrado sesión")
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
