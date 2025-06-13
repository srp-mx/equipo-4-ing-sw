import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "@/constants/userSlice";
import { clearClases } from "@/constants/classSlice";
import { clearAssignments } from "@/constants/assignmentSlice";
import { clearDataCharacter } from "@/constants/dataCharacterSlice";
import { clearStats } from "@/constants/StatsSlice";
import { clearRacha, setRacha } from "@/constants/rachaSlice";


export default function UserData() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteAccount = async () => {
        try {
            const response = await fetch("http://localhost:3000/remove_account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body : JSON.stringify({})
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            console.log("Cuenta eliminada");
            dispatch(clearUser());
            dispatch(clearClases());
            dispatch(clearAssignments());
            dispatch(clearStats());
            dispatch(clearDataCharacter());
            dispatch(clearRacha());
            localStorage.removeItem("token");

            navigate("/");
        } catch (error) {
            console.error("Error al eliminar la cuenta:", error);
        }
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="shadow-lg rounded-lg p-5 w-11/12 md:w-5/6 text-white ">
                <h1 className="text-2xl md:text-3xl text-white mb-3">Eliminar cuenta</h1>
                <p className="mb-2">¿Insatisfecho de nuestro servicio? Puede eliminar su cuenta aqui. Esta acción es irreversible y toda su información
                    personal sera eliminada de nuestros servidores.</p>
                <Button
                    type="button"
                    style={{ "--pixel-bg": "#2D304F", "--pixel-hover-bg": "#FFFFFF", "--size-pixel": "10px" } as React.CSSProperties}
                    onClick={deleteAccount}
                >
                    Eliminar Cuenta
                </Button>
            </div>
        </div>
    );

}