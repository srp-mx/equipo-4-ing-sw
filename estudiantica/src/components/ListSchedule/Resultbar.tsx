import BottonResultBar from "./BottonResultBar";
import { useEffect, useState } from "react";
import { Class } from  "@/Object/Class";
import ClassCard from "../ClassView/ClassCard";
import ClassModal from "../ClassView/ClassModal";

export default function Resultbar({ classes, onClickCard } : { classes : Array<Class>, onClickCard:(valor:boolean) => void }) : React.ReactNode {
    const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    
    const handleOpenModal = (c: Class) => {
        setSelectedClassId(c.id);
    };

    const handleCloseModal = () => {
        setSelectedClassId(null);
    }

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

    useEffect(() => {
        setSelectedTasks(new Set());        
    },[classes]);

    return (
        <div className="rounded-lg mt-2 mx-auto w-full h-full">
            <div className={`${classes.length >= 0 ? "" : "hidden"} w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600`}>
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="w-3 h-3 md:w-5 md:h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                        onChange={handleSelectAll}
                        checked={selectedTasks.size === classes.length}
                    />
                    <span className="text-white text-sm md:text-lg font-semibold">Resultado</span>
                </div>

                <BottonResultBar selection={Array.from(selectedTasks)} onClickCard={onClickCard} />
            </div>

            <div className="mt-2 mb-3 h-[calc(100vh-350px)] w-full overflow-y-auto">
                {classes.length > 0 ? (
                    <ul id="results-list" className="space-y-4">
                        {classes.map((schedule) => (
                            <li key={schedule.id} className="p-1.5 md:p-3 rounded flex items-center transition space-x-3 cursor-pointer">
                                <input 
                                    key={schedule.id}
                                    type="checkbox" 
                                    className="w-3 h-3 md:w-5 md:h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                                    checked={selectedTasks.has(schedule.id)}
                                    onChange={() => handleCheckboxChange(schedule.id)}
                                />                        
                                <ClassCard classData={schedule} onOpen={() => {handleOpenModal(schedule); onClickCard(false);}} />
                                <ClassModal isOpen={selectedClassId === schedule.id} onClose={() => {handleCloseModal(); onClickCard(true);}} classData={schedule} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600">
                        <span className="text-white text-sm md:text-lg font-semibold">No hay clases</span>
                    </div>
                )}
            </div>
    </div>
    );
}