import { useDispatch } from 'react-redux'; 
import React, { Children, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from '@/constants/userSlice'
import validator from 'validator';
import { useNotification } from '@/components/NotificationProvider';

type response = {
  message : string,
  type : "success" | "error" | "warning"
}

const Button = ({ onClick, children, icon }: { onClick?: () => void; children: React.ReactNode; icon?: string }) => (
  <button onClick={onClick} 
    className="pixel-corner-button mb-4 flex bg-[#cbda3d] text-[#0D0828] py-4 px-10 min-w-[300px] transition-all hover:bg-white"
    style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg" : "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
  >
    {icon && <img src={icon} className="w-6 h-6 mr-3" alt="Button Icon" />}
    {children}
  </button>
);

const ButtonReturn = ({ onClick }: { onClick?: () => void}) => (
  <button onClick={onClick} className="absolute -top-3 left-0 flex items-center text-[#cbda3d] hover:text-white transition-all focus:text-[#ffffff]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">  
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    <span className="ml-2 text-sm">Regresar</span>
  </button>
);

const PasswordInput = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={showPassword ? "text" : "password"}
        className="mb-6 peer block w-full px-3 py-2 text-sm text-white bg-transparent border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d] "
        placeholder=""
        value={value}
        onChange={onChange}
        required
      />
      <label className="absolute text-sm pointer-events-none text-transparent transform scale-50 top-1/3 left-3 -translate-y-1/6 transition-all duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#cbda3d] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#cbda3d]">Contraseña</label>
      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-[#cbda3d]">
        {showPassword ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M10.73 10.73a3.75 3.75 0 105.27 5.27M6.53 6.53A9.77 9.77 0 012.25 12a9.77 9.77 0 011.47-2.25m15.8 2.25a9.77 9.77 0 00-1.47-2.25" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c2.25-4.5 6.75-7.5 9.75-7.5s7.5 3 9.75 7.5c-2.25 4.5-6.75 7.5-9.75 7.5s-7.5-3-9.75-7.5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

const fetchAuthentication = async (email: string, password: string, dispatch:any) :  Promise<response> => {
  try {
    if(!validator.isEmail(email)){
        return { message : "El formato del correo no es valido" , type : "warning"};
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Credenciales inválidas");
    const data = await response.json();
    localStorage.setItem("token",data.token);
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

    return {message : "Error al hacer la petición" , type : "error"}
  }

  return {message : "", type : "success"}
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
      <div className="bg-[url(../../public/assets/img/login_bg.jpg)] w-screen h-screen bg-cover bg-center flex justify-center items-center font-[\'Pixelify Sans\']">
        <div className="relative w-full max-w-lg p-8 rounded-lg">
          <h2 className="text-4xl font-semibold text-center text-white mb-6">estudiantika</h2>
          
          {!showEmailForm ? (
            <div className="flex flex-col justify-center items-center mt-6">
              <p className="text-center text-xl text-white mb-6">Ingresa para comenzar tu aventura</p>
              <Button 
                icon="../assets/img/icono_google.png" 
                onClick={() => showNotification("No disponible por el momento","error")}>Continua con Google</Button>
              <Button onClick={() => setShowEmailForm(true)} icon="../assets/img/icono_correo.png">Continua con correo</Button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-6">
            <div className="relative mb-2">
              <form className="max-w-lg mx-auto mt-4 p-4 bg-[#2d314f] rounded-lg"
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                      e.preventDefault();
                      fetchAuthentication(email, password, dispatch).then(response => {
                        if(response.type === 'success'){
                          navigate('/home')
                        }

                        showNotification(response.message,response.type)
                      })
                    }
                  }}
                onSubmit={(e) => { e.preventDefault(); fetchAuthentication(email, password, dispatch).then(response => {
                  if(response.type === 'success'){
                    navigate('/home')
                  }
                  showNotification(response.message,response.type)
                }); }}>
                <ButtonReturn onClick={() => { setShowEmailForm(false); setEmail(""); setPassword("");}} />
                <div className="relative flex mb-4">
                  <input
                    type="email"
                    className="peer block w-full px-3 py-2 text-sm text-white bg-transparent border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className="absolute pointer-events-none text-sm text-transparent transform scale-50 top-1/6 left-3 -translate-y-1/6 transition-all duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#cbda3d] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#cbda3d]" htmlFor="email">Correo</label>
                </div>
  
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button>Ingresar</Button>
              </form>
            </div>
            </div>
          )}
        </div>
      </div>
    );
}
