import { ErrorResponse } from "@/constants";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { json } from "stream/consumers";

const crearPersornaje = async(nombre : string) => {
    try{
        const dataSend = {
            name: nombre
        }
        const response = await fetch("http://localhost:3000/post_character",{
            method: "POST", 
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"), 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataSend),

        });
        if(!response.ok){

            switch(response.status) {
                case 400:
                    throw new Error(`Error 400 (Bad Request): ${response.body}`);
                case 409: 
                    alert("El nombre ya ha sido tomado, elige otro");
                    throw new Error(`Error 409 (Conflict): ${response.body}`);
                case 500: 
                    throw new Error(`Error 500 (Internal Server Error): ${response.body}`);
                default:
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        }
        const data = await response.json();
        console.log("Personaje creado: ", data.character_name);
        window.location.reload();
    }catch(error){
        console.error("Error: ", error)
    }
}

type ModalProps = {
    onClose: () => void
}

export default function ModalCharacterCreation({onClose} : ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();
    const closeModal = (e:React.MouseEvent<HTMLDivElement>) => {
        if(modalRef.current === e.target){
            onClose();
            setNombre("");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value); 
      };

    return (
        <div ref={modalRef} onClick={closeModal} 
            className="h-screen fixed inset-0 z-2 flex justify-center items-center bg-black/30 backdrop-blur-sm">
            <div className="flex text-center items-center flex-col p-6 w-2/3 md:w-1/3 border-gray-400 rounded-lg bg-[#ffffe6] text-black">
                <h1 className="text-lg md:text-xl font-semibold"> Ingresa el nombre del personaje</h1>
                <form className="flex flex-col items-center "action="">
                    <input 
                    type="text" 
                    placeholder="Ingresa el Nombre"
                    className="text-center text-sm md:text-base border rounded p-1 text-gray-600"
                    name="nombre"
                    onChange={handleChange}
                    />
                    <div className="flex flex-row">
                        <button
                        className="mt-5 text-sm md:text-base flex px-1 py-2 bg-green-600 font-bold rounded-full hover:bg-green-500 text-white items-center"
                        onClick={(e) => {e.preventDefault(); crearPersornaje(nombre); onClose(); }}
                        > 
                            Crear Personaje
                        </button>
                        <button
                        className="ml-7 text-sm md:text-base mt-5 flex px-1 py-2 bg-red-600 font-bold rounded-full hover:bg-red-500 text-white items-center"
                        onClick={(e) => {e.preventDefault();setNombre("");onClose();}}
                        > 
                            Cancelar
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}