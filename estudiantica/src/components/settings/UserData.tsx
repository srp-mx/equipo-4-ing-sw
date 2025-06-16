import { useRef,useState } from "react";
import { Button } from "../Button";
import { Input } from "../Inputs";
import { PasswordInput } from "../Inputs";
import iconouser from "@/assets/img/icono_user.svg";
import { useNotification } from "../NotificationProvider";


const updateUserData = async (name: string, email: string, newPassword: string, confirmPassword: string, showNotification) => {
    try {
        if (newPassword !== confirmPassword) {
            showNotification("Las contraseñas nuevas no coinciden", "error");
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
                password: newPassword,
            })
        });

        if (!response.ok) {
            showNotification("No se pudo actualizar la configuración", "error");
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("User data updated successfully:", data);
        showNotification("Datos de usuario actualizados con éxito", "success");
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}

export default function UserData() {
    const { showNotification } = useNotification();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [iconoUser, setIconoUser] = useState<string>(iconouser);

    return (
        <div className="flex justify-center items-center ">
            <div className="shadow-lg rounded-lg p-5 w-11/12 md:w-5/6 text-white">
                <h1 className="text-2xl md:text-3xl text-white mb-3">Cambiar información personal</h1>
                <p>Use un correo donde pueda recibir notificaciones</p>
                <div className="flex items-center space-x-4 mb-6 mt-2">
                    <img
                        src={iconoUser}
                        alt=""
                        className="w-15 h-15 md:w-30 md:h-30 p-2 rounded-lg bg-[#CBDA3D]"
                    />
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

                <Button type="button" onClick={() => updateUserData(name, email, newPassword, confirmPassword, showNotification)}>
                    Guardar Cambios
                </Button>
            </div>
        </div>
    );

}
