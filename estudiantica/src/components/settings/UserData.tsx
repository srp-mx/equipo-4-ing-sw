import { useState } from "react";
import { Button } from "../Button";
import { Input } from "../Inputs";
import userIcon from "@/assets/img/icono_user.svg";
import { PasswordInput } from "../Inputs";

const updateUserData = async (name: string, email: string,  newPassword: string, confirmPassword: string) => {
    try {
        if (newPassword !== confirmPassword) {
            throw new Error("Las contraseñas nuevas no coinciden");
        }

        const response = await fetch("http://localhost:3000/update_profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password : newPassword,
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("User data updated successfully:", data);
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}

export default function UserData() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    return (
        <div className="flex justify-center items-center ">
            <div className="shadow-lg rounded-lg p-5 w-11/12 md:w-5/6 text-white">
                <h1 className="text-2xl md:text-3xl text-white mb-3">Cambiar información personal</h1>
                <p>Use un correo donde pueda recibir notificaciones</p>
                <div className="flex items-center space-x-4 mb-6 mt-2">
                    <img
                        src={userIcon}
                        alt=""
                        className="w-15 h-15 md:w-30 md:h-30 p-2 rounded-lg bg-[#CBDA3D]"
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

                <div className="rounded-lg text-white ">
                    <h1 className="text-2xl md:text-3xltext-white mb-8">Cambiar contraseña</h1>
                    <div className="space-y-2">
                        <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} contentText={"Nueva contraseña"} />
                        <PasswordInput value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} contentText={"Confirmar contraseña"} />
                    </div>
                </div>

                <Button type="button" onClick={() => updateUserData(name, email, newPassword, confirmPassword)}>
                    Guardar Cambios
                </Button>
            </div>
        </div>
    );

}