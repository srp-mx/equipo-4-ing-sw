import BottonResultBar from "./BottonResultBar";
import { useState } from "react";
import AssigmentCard from "../AssigmentView/AssigmentCard";
import AssigmentModal from "../AssigmentView/AssigmentModal";
import { Assigment } from "@/Object/Assigment";

export default function Resultbar({ assigment }: { assigment: Array<Assigment> }): React.ReactNode {
    const [selectedTasks, setSelectedTasks] = useState<Set<Assigment>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxChange = (task: Assigment) => {
        setSelectedTasks((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(task)) {
                newSet.delete(task);
            } else {
                newSet.add(task);
            }
            return newSet;});
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedTasks(new Set(assigment.map(task => task)));
        } else {
            setSelectedTasks(new Set());
        }
    };

    return (
        <div className="rounded-lg p-4 mx-auto w-full h-full">
            <div className={`${assigment.length >= 0 ? "" : "hidden"} w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600`}>
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                        onChange={handleSelectAll}
                        checked={selectedTasks.size === assigment.length}
                    />
                    <span className="text-white text-lg font-semibold">Resultado</span>
                </div>

                <BottonResultBar selection={Array.from(selectedTasks)}/>
            </div>

            <div className="mt-2 mb-3 h-[calc(100vh-450px)] overflow-y-auto">
                {assigment.length > 0 ? (
                    <ul id="results-list" className="space-y-4">
                        {assigment.map((task) => (
                            <li key={task.id} className="p-3 rounded flex items-center transition space-x-5 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className=" w-5 h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                                    checked={selectedTasks.has(task)}
                                    onChange={() => handleCheckboxChange(task)}
                                />                        
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