import { RootState } from "@/constants/store";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectorClass from "@/components/AssigmentView/SelectorClass"
import { Assigment } from "@/Object/Assigment";
import { addAssignment } from "@/constants/assignmentSlice";
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CreateAssignmentModal({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);
    const [newAssignment, setNewAssignment] = useState({
        name: "",
        due_date: "",
        tag: "",
        notes: "",
        optional: false,
        grade: 0.00, 
        progress: 0
    });
    const [idN, setIdN] = useState(0);

    const user = useSelector((state: RootState) => state.user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewAssignment((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async () => {
        try{
            const dataSend = {
                ...newAssignment, 
                class_id: idN,
                grade: 0.0,
                due_date: new Date(newAssignment.due_date).toISOString()
            }

            const response = await fetch("http://localhost:3000/post_assignment", {
                method: "POST", 
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataSend)
            });

            if(!response.ok) {
                const error = await response.json();
                console.error("El error es ",error);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            const assig : Assigment = {
                ...dataSend,
                id: data.assignment_id,
            }
            dispatch(addAssignment(assig));

            onClose();

        }catch(error){
            console.error("Error", error);
            alert("Ha ocurrido un error");
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
                <h2 className="text-xl md:text-2xl font-semibold">Nueva Tarea</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="w-full border rounded p-1 mt-2"
                    value={newAssignment.name}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="due_date"
                    className="w-full border rounded p-1 mt-2"
                    value={newAssignment.due_date}
                    onChange={handleChange}
                />

                <SelectorClass id={idN} changeId={setIdN} />

                <input
                    type="text"
                    name="tag"
                    placeholder="Tag"
                    className="w-full border rounded p-1 mt-2"
                    value={newAssignment.tag}
                    onChange={handleChange}
                />
                <textarea
                    name="notes"
                    placeholder="Notas"
                    className="w-full border rounded p-1 mt-2"
                    value={newAssignment.notes}
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
