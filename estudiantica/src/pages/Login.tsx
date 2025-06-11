import { useDispatch } from 'react-redux';
import React, { Children, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from '@/constants/userSlice'
import validator from 'validator';
import { useNotification } from '@/components/NotificationProvider';

import iconoRegister from '@/assets/img/icono_register.png'
import iconoCorreo from '@/assets/img/icono_correo.png'
import bgImage from '@/assets/img/background-default.jpg';
import { Button, ButtonReturn } from '@/components/Button';
import { Input, PasswordInput } from '@/components/Inputs';
import NavBar from '@/components/Navbar';


type response = {
  message: string,
  type: "success" | "error" | "warning"
}


const fetchAuthentication = async (email: string, password: string, dispatch: any): Promise<response> => {
  try {
    if (!validator.isEmail(email)) {
      return { message: "El formato del correo no es valido", type: "warning" };
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return { message: "Credenciales inválidas", type: "error" };
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    dispatch(setUser({
      name: data.user.name,
      email: data.user.email,
      token: data.token,
      username: data.username,
    }))
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
    }

    return { message: "Error al hacer la petición", type: "error" }
  }

  return { message: "Inicio de sesión exitoso", type: "success" }
};


export default function Login() {
  const { showNotification } = useNotification();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <NavBar isLoggedIn={false} />
      <div className="w-full p-8 rounded-lg flex flex-col justify-center items-center mt-10 md:mt-20">
        <h2 className="text-4xl font-semibold text-center text-white mb-6">estudiantica</h2>

        {!showEmailForm ? (
          <div className="flex flex-col justify-center items-center mt-6 space-x-2 space-y-2">
            <p className="text-center text-xl text-white mb-6">Ingresa para comenzar tu aventura</p>
            <Button
              onClick={() => setShowEmailForm(true)}
              icon={iconoCorreo}>
              Continua con Correo
            </Button>
            <Button
              icon={iconoRegister}
              onClick={() => navigate('/register')}>
              Registrarse
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-6">
            <div className="relative mb-2">
              <ButtonReturn onClick={() => { setShowEmailForm(false); setEmail(""); setPassword(""); }} />
              <form
                className="max-w-lg mx-auto mt-4 p-4 bg-[#2d314f] rounded-lg"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const response = await fetchAuthentication(email, password, dispatch);
                  if (response.type === 'success') {
                    navigate('/home')
                  }
                  showNotification(response.message, response.type);
                }}>


                <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' contentText='Correo' />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit'>Ingresar</Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
