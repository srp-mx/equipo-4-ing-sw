import { useState } from "react";
import { Button } from "../Button";
import { Input } from "../Inputs";
const userIcon = "/assets/img/user.png";

export default function UserData(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="flex justify-center items-center ">
            <div className="shadow-lg rounded-lg p-5 w-11/12 md:w-5/6 text-white">
                <h1 className="text-2xl md:text-3xl text-white mb-3">Cambiar información personal</h1>
                <p>Use un correo donde pueda recibir notificaciones</p>
                <div className="flex items-center space-x-4 mb-6 mt-2">
                    <img
                        src={userIcon}
                        alt=""
                        className="w-15 h-15 md:w-30 md:h-30 rounded-lg bg-white"
                    />
                    <div>
                        <Button type="button">
                            Cambiar Avatar
                        </Button>
                        <p className="text-xs mt-2">JPG, GIF o PNG. 1MB max.</p>
                    </div>
                </div>
        
                <div className="space-y-2">
                    <Input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        contentText="Nombre de usuario"
                    />

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        contentText="Correo electrónico"
                    />
                </div>
        
                <Button type="button">
                    Guardar Cambios
                </Button>
            </div>
        </div>
    );

}