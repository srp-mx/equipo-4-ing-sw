import { addClass } from "@/constants/classSlice";
import { RootState } from "@/constants/store";
import { Class } from "@/Object/Class";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CreateClassModal({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);

    const [newClass, setNewClass] = useState({
        id : 0,
        name: "",
        start_date : "",
        end_date : "",
        grade_formula : "",
        color: "ffffffff", 
        owner_username: user.name
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewClass((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async () => {
        try{
            const dataSend = {
                ...newClass,
                start_date: new Date(newClass.start_date).toISOString(), 
                end_date: new Date(newClass.end_date).toISOString(),
            }

            const response = await fetch("http://localhost:3000/post_class",{
                method: "POST", 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"

                },
                body: JSON.stringify(dataSend)
            });

            const rawText = await response.text()
            if (rawText === "") {
                console.error("Respuesta vacía del servidor");
                throw new Error("Respuesta vacía del servidor");
            }
            let json: any;
            try {
                json = JSON.parse(rawText)
            } catch (error) {
                console.error('No se pudo parsear JSON:', rawText)
                throw error
            }

            if(!response.ok) {
                const error = json.error || json.message || "Error desconocido";
                console.error("El error es ", JSON.stringify(error,null,2));
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = json;
            newClass.id = data.class_id;
            dispatch(addClass(newClass)); 
            onClose();        
        }catch( error ){
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
              }
            }
        
            if (isOpen) {
              document.addEventListener("mousedown", handleClickOutside);
            }
        
            return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, [isOpen, onClose]);

    return (
        <div className="fixed inset-0 z-2 bg-opacity-30 backdrop-blur-md flex items-center justify-center">
            <div ref={modalRef}
            className="p-6 w-4/6 md:w-1/3 shadow-lg border-gray-400 rounded-lg bg-[#ffffe6] shadow-md text-black">
                <h2 className="text-xl md:text-2xl font-semibold">Nueva Clase</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="w-full border rounded p-1 mt-2"
                    value={newClass.name}
                    onChange={handleChange}
                />
                Fecha de inicio:
                <input
                    type="date"
                    name="start_date"
                    className="w-full border rounded p-1 mt-2"
                    value={newClass.start_date}
                    onChange={handleChange}
                />
                Fecha de fin:
                <input
                    type="date"
                    name="end_date"
                    className="w-full border rounded p-1 mt-2"
                    value={newClass.end_date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="grade_formula"
                    placeholder="Formula Calificación"
                    className="w-full border rounded p-1 mt-2"
                    value={newClass.grade_formula}
                    onChange={handleChange}
                />
                <div className="flex justify-end space-x-2 mt-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleCreate}>
                        Crear
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
