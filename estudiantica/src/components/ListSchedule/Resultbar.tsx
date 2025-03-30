import BottonResultBar from "./BottonResultBar";
import { useState } from "react";
import { Class } from  "@/Object/Class";
import ClassCard from "../ClassView/ClassCard";
import ClassModal from "../ClassView/ClassModal";

export default function Resultbar({ classes } : { classes : Array<Class>}) : React.ReactNode {
    const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxChange = (scheduleId: number) => {
        setSelectedTasks((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(scheduleId)) {
                newSet.delete(scheduleId);
            } else {
                newSet.add(scheduleId);
            }
            return newSet;
        });
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedTasks(new Set(classes.map(schedule => schedule.id)));
        } else {
            setSelectedTasks(new Set());
        }
    };

    return (
        <div className="rounded-lg p-4 mx-auto w-full h-full">
            <div className={`${classes.length >= 0 ? "" : "hidden"} w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600`}>
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                        onChange={handleSelectAll}
                        checked={selectedTasks.size === classes.length}
                    />
                    <span className="text-white text-lg font-semibold">Resultado</span>
                </div>

                <BottonResultBar selection={Array.from(selectedTasks)}/>
            </div>

            <div className="mt-2 mb-3 h-[calc(100vh-450px)] overflow-y-auto">
                {classes.length > 0 ? (
                    <ul id="results-list" className="space-y-4">
                        {classes.map((schedule) => (
                            <li key={schedule.id} className="p-3 rounded flex items-center transition space-x-5 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className=" w-5 h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                                    checked={selectedTasks.has(schedule.id)}
                                    onChange={() => handleCheckboxChange(schedule.id)}
                                />                        
                                <ClassCard classData={schedule} onOpen={() => setIsModalOpen(true)} />
                                <ClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} classData={schedule} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600">
                        <span className="text-white text-lg font-semibold">No hay clases</span>
                    </div>
                )}
            </div>
    </div>
    );
}