import { updateAssignment } from "@/constants/assignmentSlice";
import { Assigment } from "@/Object/Assigment";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { data } from "react-router-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    assigment: Assigment;
};

const getProgressStatus = (progress: number) => {
    let progressStatus = { text : "En progreso", bgColor : "bg-gray-600"};

    if(progress < 0){
        progressStatus.text = "No completado";
        progressStatus.bgColor = "bg-yellow-600"
    } else if (progress > 0) {
        progressStatus.text = "Completado";
        progressStatus.bgColor = "bg-green-600"
    }

    return progressStatus;
}

export default function AssigmentModal({ isOpen, onClose, assigment } : ModalProps) : React.ReactNode{
    if (!isOpen) return null;
    const progressStatus = getProgressStatus(assigment.progress);

    const dispatch = useDispatch();

    const [isEdit,setIsEdit] = useState(false);
    const [editedAssigment, setEditedAssigment] = useState({ ... assigment});
    const [className, setClassName] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);


    useEffect(() => {

        const getClass = async() => {
            try{
                const response = await fetch(`http://localhost:3000/get_class?id=${assigment.class_id}`,{
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                });
                if(!response.ok){
                    const error = await response.json();
                    console.error("El error es ", error);
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setClassName(data.name);
            }catch(error){
                console.error(error);
            }
        }
    
    
        getClass();    

    },[dispatch]);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedAssigment((prev) => ({ ...prev, [name]: value }));
    };



    const handleSave = async () => {
        try{
            if(!editedAssigment.name){
                alert("Por favor, completa al menos el nombre de la tarea");
                return;
            }
            const dataSend = {
                "assignment": {
                    "id": editedAssigment.id
                },
                "new_assignment": {
                    ...editedAssigment,
                    grade: editedAssigment.grade * 1,
                    progress: Math.trunc(editedAssigment.progress),
                    due_date: new Date (editedAssigment.due_date).toISOString(),
                }
            }
            const response = await fetch("http://localhost:3000/patch_assignment",{
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataSend),
            });
    
            const rawResponse = await response.text(); // Primero lee como texto
            console.log("Respuesta cruda:", rawResponse); // Inspecciona qué devuelve

            if(!response.ok){
                const error = await response.json();
                console.error("El error es ", error);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            dispatch(updateAssignment(dataSend.new_assignment));
            setIsEdit(false);
        }catch(error){
            console.error('Error: ', error);
            alert('Hubo un problema al actualizar la tarea')
        }
    };

    const handleCancel = () => {
        setEditedAssigment({ ...assigment });
        setIsEdit(false);
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
            <div ref={modalRef} 
            className="p-6 w-1/3 shadow-lg items-center border-gray-400 rounded-lg bg-[#ffffe6] shadow-md text-black">
                <div className="flex mb-2 mr-4 space-x-2 justify-end">
                    <div className="flex space-x-2">
                        {assigment.optional && (
                            <label className="flex items-center space-x-1 text-white bg-gray-600 px-2 py-1 rounded-full">
                                <span>Opcional</span>
                            </label>
                        )}
                        <label className={`flex items-center space-x-1 px-2 py-1 text-white ${progressStatus.bgColor} rounded-full`}>
                            <span>{progressStatus.text}</span>
                        </label>
                    </div>
                    
                </div>
                {isEdit ? (
                    <input
                        type="text"
                        name="name"
                        className="text-gray-900 text-2xl font-semibold w-full border rounded p-1"
                        value={editedAssigment.name}
                        onChange={handleChange}
                    />
                ) : (
                    <p className="text-gray-900 text-2xl font-semibold w-2/3">{assigment.name}</p>
                )}

                <div className="text-gray-600 text-right text-lg mr-4 px-2 py-1 rounded-full">
                    {isEdit ? (
                        <input
                            type="date"
                            name="due_date"
                            className="border rounded p-1"
                            value={editedAssigment.due_date}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{new Date(assigment.due_date).toLocaleDateString()}</span>
                    )}
                </div>

                <div className="text-left text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Materia: {className}</span>
                </div>

                <div className="text-left text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Tag: </span>
                    {isEdit ? (
                        <input
                            type="text"
                            name="tag"
                            className="border rounded p-1"
                            value={editedAssigment.tag}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{assigment.tag}</span>
                    )}
                </div>
                
                <div className="text-left text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Calificacion: </span>
                    {isEdit ? (
                        <input
                            type="number"
                            min="0"
                            step=".01"
                            max="20"
                            name="grade"
                            className="border rounded p-1"
                            value={editedAssigment.grade}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{assigment.grade}</span>
                    )}
                </div>

                <div className="text-left text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Notas: </span>
                    {isEdit ? (
                        <textarea
                            name="notes"
                            className="border rounded p-1 w-full"
                            value={editedAssigment.notes}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{assigment.notes}</span>
                    )}
                </div> 
                <div className="flex mb-2 mr-4 space-x-2 justify-end">
                    {isEdit ? (
                        <>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                                onClick={handleSave}
                            >
                                Guardar
                            </button>
                            <button
                                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                            onClick={() => setIsEdit(true)}
                        >
                            Editar
                        </button>
                    )}
                    <button
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}