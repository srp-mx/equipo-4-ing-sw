import { Class } from "@/Object/Class";
import { useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    classData: Class;
};

const getEndDateStatus = (endDate: Date) => {
    let endDateStatus = { text : "Activo", bgColor : "bg-green-600"};

    if(endDate < new Date()){
        endDateStatus.text = "Archivado";
        endDateStatus.bgColor = "bg-gray-600"
    } 

    return endDateStatus;
}

export default function ClassModal({ isOpen, onClose, classData } : ModalProps) : React.ReactNode{
    if (!isOpen) return null;
    const activateClass = getEndDateStatus(classData.endDate)

    const [isEdit,setIsEdit] = useState(false);
    const [editedClass, setEditedClass] = useState({ ... classData});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedClass((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            if (!editedClass.name) {
                alert("por favor completa al menos el nombre de la clase");
                return;
            }
            
            const response = await fetch('/classes', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedClass),
            });
            
            if (!response.ok) {
                throw new Error('error al actualizar la clase');
            }
            
            const updatedAssignment = await response.json();
            
            console.log('clase actualizada con exito:', updatedAssignment);
            
            setIsEdit(false);

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al actualizar la clase');
        }
    };

    const handleCancel = () => {
        setEditedClass({ ... classData });
        setIsEdit(false);
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
            <div className="p-6 w-1/3 shadow-lg items-center border-gray-400 rounded-lg bg-[#ffffe6] shadow-md text-black">
                <div className="flex mb-2 mr-4 space-x-2 justify-end">
                    <div className="flex space-x-2">
                        <label className={`flex items-center space-x-1 px-2 py-1 text-white ${activateClass.bgColor} rounded-full`}>
                            <span>{activateClass.text}</span>
                        </label>
                    </div>
                    
                </div>
                {isEdit ? (
                    <input
                        type="text"
                        name="name"
                        className="text-gray-900 text-2xl font-semibold w-full border rounded p-1"
                        value={editedClass.name}
                        onChange={handleChange}
                    />
                ) : (
                    <p className="text-gray-900 text-2xl font-semibold w-2/3">{editedClass.name}</p>
                )}

                <div className="text-gray-600 text-right text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Fecha de Inicio: </span>
                    {isEdit ? (
                        <input
                            type="date"
                            name="startDate"
                            className="border rounded p-1"
                            value={new Date(editedClass.startDate).toISOString().split('T')[0]}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{editedClass.startDate.toLocaleDateString()}</span>
                    )}     
                </div>
                <div className="text-gray-600 text-right text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Fecha de Fin: </span>
                    {isEdit ? (
                        <input
                            type="date"
                            name="endDate"
                            className="border rounded p-1"
                            value={new Date(editedClass.endDate).toISOString().split('T')[0]}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{editedClass.endDate.toLocaleDateString()}</span>
                    )}      
                </div>

                <div className="text-left text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Grade formula: </span>
                    {isEdit ? (
                        <input
                            type="text"
                            name="gradeFormula"
                            className="border rounded p-1"
                            value={editedClass.gradeFormula}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{editedClass.gradeFormula}</span>
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