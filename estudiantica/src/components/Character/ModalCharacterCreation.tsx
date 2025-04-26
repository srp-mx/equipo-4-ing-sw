import React, { useRef, useState } from "react";

const crearPersornaje = async(nombre : string) => {
    try{

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

    const closeModal = (e:React.MouseEvent<HTMLDivElement>) => {
        if(modalRef.current === e.target){
            onClose();
            setNombre("");
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} 
            className="h-screen fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm">
            <div className="flex text-center items-center flex-col p-6 w-1/3 border-gray-400 rounded-lg bg-[#ffffe6] text-black">
                <h1> Ingresa el nombre del personaje</h1>
                <form className="flex flex-col items-center "action="">
                    <input 
                    type="text" 
                    placeholder="Ingresa el Nombre"
                    className="text-center border rounded p-1 text-gray-600"
                    />
                    <div className="flex flex-row">
                        <button
                        className="mt-5 flex px-1 py-2 bg-green-600 font-bold rounded-full hover:bg-green-500 text-white items-center"
                        onClick={() => {crearPersornaje(nombre); onClose();}}
                        > 
                            Crear Personaje
                        </button>
                        <button
                        className="ml-7 mt-5 flex px-1 py-2 bg-red-600 font-bold rounded-full hover:bg-red-500 text-white items-center"
                        onClick={() => {setNombre("");onClose();}}
                        > 
                            Cancelar
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}