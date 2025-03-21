import BottonResultBar from "./BottonResultBar";
import { useState } from "react";
import AssigmentCard from "../AssigmentView/AssigmentCard";
import AssigmentModal from "../AssigmentView/AssigmentModal";
import { Assigment } from "@/Object/Assigment";

export default function Resultbar({ assigment }: { assigment: Array<Assigment> }): React.ReactNode {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Maneja el cambio del checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className="rounded-lg p-4 mx-auto w-full h-full">
            <div className={`${assigment.length > 0 ? "" : "hidden"} w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600`}>
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                    />
                    <span className="text-white text-lg font-semibold">Resultado</span>
                </div>

                <BottonResultBar selection={isChecked}/>
            </div>

            <div className="mt-2 mb-3 h-[calc(100vh-450px)] overflow-y-auto">
                {assigment.length > 0 ? (
                    <ul id="results-list" className="space-y-4">
                        {assigment.map((task) => (
                            <li key={task.id} className="p-3 rounded flex items-center transition space-x-5 cursor-pointer">
                                <input type="checkbox" className=" w-5 h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"/>                        
                                <AssigmentCard assigment={task} onOpen={() => setIsModalOpen(true)} />
                                <AssigmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} assigment={task} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600">
                        <span className="text-white text-lg font-semibold">No hay tareas</span>
                    </div>
                )}
            </div>
        </div>
    );  
}