import { Assigment } from "@/Object/Assigment";
import { useState } from "react";

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
    const progressStatus = getProgressStatus(assigment.progress)
    const [isEdit,setIsEdit] = useState(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
            <div className="p-6 w-1/3 shadow-lg items-center border-gray-400 rounded-lg bg-[#ffffe6] shadow-md">
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
                <p className="text-gray-900 text-2xl font-semibold w-2/3">{assigment.name}</p>
                <div className="text-gray-600 text-right text-lg mr-4 px-2 py-1 rounded-full">
                    <span>{assigment.dueDate.toLocaleDateString()}</span>
                </div>

                <div className="text-left text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Materia: {assigment.class.className}</span>
                </div>

                <div className="text-left text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Tag: {assigment.tag}</span>
                </div>
                <div className="text-left text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Notas: {assigment.notes}</span>
                </div> 
                <div className="flex mb-2 mr-4 space-x-2 justify-end">
                    <button
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                        onClick={onClose}
                    >
                        Editar
                    </button>
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