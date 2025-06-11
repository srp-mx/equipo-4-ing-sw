import { useState } from "react";
import { PasswordInput } from "../Inputs";
import { Button } from "../Button";

export default function PasswordData(){
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    return (
        <div className="flex justify-center items-center ">
            <div className="shadow-lg rounded-lg p-5 w-11/12 md:w-5/6 text-white ">
              <h1 className="text-2xl md:text-3xltext-white mb-8">Cambiar contraseña</h1>
              <div className="space-y-2">
                <PasswordInput value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} contentText={"Contraseña actual"} />
                <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} contentText={"Nueva contraseña"}/>
                <PasswordInput value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} contentText={"Confirmar contraseña"}/>
              </div>
      
              <Button type="button">
                  Guardar Cambios
              </Button>
            </div>
        </div>
    );

}