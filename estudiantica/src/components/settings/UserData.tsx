import { useRef,useState } from "react";
import { Button } from "../Button";
import { Input } from "../Inputs";
import { PasswordInput } from "../Inputs";
import iconouser from "@/assets/img/icono_user.svg";


const updateUserData = async (name: string, email: string, newPassword: string, confirmPassword: string) => {
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
                password: newPassword,
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
    const [iconoUser, setIconoUser] = useState<string>(iconouser);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const updateImg = () => {
        fileInputRef.current?.click(); // Dispara el input file oculto
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("Formato no válido. Usa JPG, PNG o GIF.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("La imagen no debe superar 1MB.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch("http://localhost:3000/user/avatar", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir la imagen");

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setIconoUser(imageUrl);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("No se pudo subir la imagen.");
    }
  };

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
                    <div>
                        <Button type="button" onClick={updateImg}>
                            Cambiar Avatar
                        </Button>
                        <p className="text-xs mt-2">JPG, GIF o PNG. 1MB max.</p>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/gif"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
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