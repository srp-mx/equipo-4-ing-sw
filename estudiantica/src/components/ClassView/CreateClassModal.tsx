import { useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CreateClassModal({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    const [newClass, setNewClass] = useState({
        name: "",
        startDate : "",
        endDate : "",
        gradeFormula : ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewClass((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async () => {
        onClose();        
        /* Manejo de la petición
        
        try {
            const response = await fetch("/api/assignments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAssignment)
            });

            if (!response.ok) throw new Error("Error al crear la tarea");
            const data = await response.json();
            onCreate(data);
            onClose();
        } catch (error) {
            console.error(error);
        }*/
    };

    //fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center ${isOpen ? 'visible' : 'invisible'">
            <div className="p-6 w-1/3 shadow-lg border-gray-400 rounded-lg bg-[#ffffe6] shadow-md">
                <h2 className="text-2xl font-semibold">Nueva Tarea</h2>
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
                    name="startDate"
                    className="w-full border rounded p-1 mt-2"
                    value={newClass.startDate}
                    onChange={handleChange}
                />
                Fecha de fin:
                <input
                    type="date"
                    name="endDate"
                    className="w-full border rounded p-1 mt-2"
                    value={newClass.endDate}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="className"
                    placeholder="Calificación"
                    className="w-full border rounded p-1 mt-2"
                    value={newClass.gradeFormula}
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
