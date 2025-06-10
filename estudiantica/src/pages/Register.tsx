import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from 'validator';

import { useNotification } from '@/components/NotificationProvider';
import bgImage from '@/assets/img/background-default.jpg';
import { Button , ButtonReturn } from '@/components/Button'
import { Input, PasswordInput } from '@/components/Inputs';
import NavBar from '@/components/Navbar';

type response = {
  message : string,
  type : "success" | "error" | "warning"
}


const fetchRegister = async (email: string, password: string, username: string, name: string) : Promise<response>=> {
    try {
      if(!validator.isEmail(email)){
        return { message : "El formato del correo no es valido" , type : "warning"};
      }
        const response = await fetch("http://localhost:3000/register", {
            method: 'POST',
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({
                name,
                username, 
                email,
                password
            }),
        });
        
        if(!response.ok) return {message : "Error al crear el usuario" , type : "error"};
    } catch (error) {
        if( error instanceof Error) {
            console.error(error);
        }

        return {message : "Error al hacer la petición" , type : "error"};
    }

    return {message : "Usuario creado con exito", type : "success"};
};

export default function Register() {
    const { showNotification } = useNotification();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[userName, setUserName] = useState("");
    const[name, setName] = useState("");
    const navigate = useNavigate();
    const inputs = [
        {type: "email", value: email, onChange: (e: SyntheticEvent) => setEmail((e.target as HTMLInputElement).value), placeholder: "Correo"},
        {type: "userName", value: userName, onChange: (e: SyntheticEvent) => setUserName((e.target as HTMLInputElement).value), placeholder: "Nombre de Usuario"},
        {type: "name", value: name, onChange: (e: SyntheticEvent) => setName((e.target as HTMLInputElement).value), placeholder: "Nombre"},
    ]

    return (
        <div className="w-screen h-screen bg-cover bg-center"
        style={{backgroundImage : `url(${bgImage})`}}>
            <NavBar isLoggedIn={false} />
            <div className="w-full p-8 rounded-lg flex flex-col justify-center items-center mt-10">
                <div id="notification-container" className="hidden fixed top-[calc(50hv-270px)] left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md p-4"></div>
                <h2 className="text-4xl font-semibold text-center text-white mb-6">Estudiantica</h2>
                <div className="flex flex-col justify-center items-center mt-6">
                    <div className="relative mb-2">
                    <ButtonReturn onClick={() => navigate("/login")} />
                    <form className="max-w-lg mx-auto mt-4 p-4 rounded-lg"
                    onSubmit={async (e) => {
                      e.preventDefault(); 
                      const response = await fetchRegister(email, password, userName, name);
                      if(response.type === "success"){
                        navigate("/login");
                      }

                      showNotification(response.message, response.type);
                    }}>
                        {inputs.map((input, index) => (
                            <Input key={index} type={input.type} value={input.value} onChange={input.onChange} contentText={input.placeholder} />
                        ))}
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type='submit'> Registrarse </Button>
                    </form>
                    </div>
                </div>
            </div>

        </div>
    );
}
