import BottonResultBar from "./BottonResultBar";
import { useEffect, useState } from "react";
import AssigmentCard from "../AssigmentView/AssigmentCard";
import AssigmentModal from "../AssigmentView/AssigmentModal";
import { Assigment } from "@/Object/Assigment";
import { useSelector } from "react-redux";
import { RootState } from "@/constants/store";
import { useNavigate } from "react-router-dom";

export default function Resultbar({ assigment, onClickCard }: { assigment: Array<Assigment>, onClickCard : (valor:boolean) => void}): React.ReactNode {
    const [selectedTasks, setSelectedTasks] = useState<Set<Assigment>>(new Set());
    const [selectedTaskId, setSelectedTaskId] = useState<number | null> (null);
    const clases = useSelector((state: RootState) => state.clases.clases);
    const navigate = useNavigate();

    const handleOpenModal = (task : Assigment) => {
        setSelectedTaskId(task.id);
    };

    const handleCloseModal = () => {
        setSelectedTaskId(null);
    }

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

    useEffect(() => {
            setSelectedTasks(new Set());        
        },[assigment]);

    return (
        <div className="rounded-lg mt-2 mx-auto w-full h-full">
            <div className={`${assigment.length >= 0 ? "" : "hidden"} sm:flex-row w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600`}>
                <div className="flex items-center space-x-2 mr-2">
                    <input 
                        type="checkbox" 
                        className="w-3 h-3 md:w-5 md:h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                        onChange={handleSelectAll}
                        checked={selectedTasks.size === assigment.length}
                    />
                    <span className="text-white text-sm md:text-lg font-semibold">Resultado</span>
                </div>

                <BottonResultBar selection={Array.from(selectedTasks)} onClickCard={onClickCard}/>
            </div>

            <div className="mt-2 mb-3 h-[calc(100vh-450px)] overflow-y-auto">
                {assigment.length > 0 ? (
                    <ul id="results-list" className="space-y-4">
                        {assigment.map((task) => (
                            <li key={task.id} className="p-3 rounded flex items-center transition space-x-5 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="w-3 h-3 md:w-5 md:h-5 text-blue-500 bg-gray-800 border-gray-500 rounded focus:ring-0"
                                    checked={selectedTasks.has(task)}
                                    onChange={() => handleCheckboxChange(task)}
                                />                        
                                <AssigmentCard assigment={task} onOpen={() => {handleOpenModal(task); onClickCard(false)}} />
                                <AssigmentModal isOpen={selectedTaskId === task.id} onClose={() => {handleCloseModal(); onClickCard(true);}} assigment={task} />
                            </li>
                        ))}
                    </ul>
                ) : clases.length === 0 ? (
                    <div className="w-full text-basic md:text-lg rounded-lg bg-gray-700 rounded flex flex-col text-center justify-between items-center p-3 border border-gray-600">
                        No hay Clases 
                        <button 
                        className="flex px-3 py-2 bg-green-600 font-bold rounded-full hover:bg-green-500 text-white items-center"
                        onClick={() => navigate("/class")}
                    >
                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Interface-Essential-Bookmark--Streamline-Pixel" height="24" width="24"><desc>Interface Essential Bookmark Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-bookmark</title><g><path d="M22.86 3.4275H24v18.285h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M21.7125 21.7125h1.1475v1.1475h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M21.7125 2.2874999999999996h1.1475v1.1400000000000001h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M2.2874999999999996 22.86h19.424999999999997V24H2.2874999999999996Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.574999999999999 18.285h14.857499999999998v1.1475H4.574999999999999Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.574999999999999 13.7175h14.857499999999998v1.1400000000000001H4.574999999999999Z" fill="#ffffff" stroke-width="0.75"></path><path d="M13.7175 9.1425h5.715v1.1400000000000001h-5.715Z" fill="#ffffff" stroke-width="0.75"></path><path d="M13.7175 5.715h5.715v1.1400000000000001h-5.715Z" fill="#ffffff" stroke-width="0.75"></path><path d="M5.715 2.2874999999999996v7.995h1.1400000000000001v-1.1400000000000001h1.1475v-1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1475V2.2874999999999996h10.2825V1.1400000000000001H10.2825V0H3.4275v1.1400000000000001H1.1400000000000001v1.1475Zm2.2874999999999996 -1.1475h1.1400000000000001v1.1475h1.1400000000000001V4.574999999999999h-1.1400000000000001V2.2874999999999996h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M1.1400000000000001 21.7125h1.1475v1.1475H1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M0 2.2874999999999996h1.1400000000000001v19.424999999999997H0Z" fill="#ffffff" stroke-width="0.75"></path></g></svg>
                        Agregar Clase
                    </button>
                    </div>
                ) : (
                    <div className="w-full rounded-lg bg-gray-700 rounded flex justify-between items-center p-3 border border-gray-600">
                        <span className="text-white text-basic md:text-lg font-semibold">No hay tareas</span>
                    </div>
                )}
            </div>
        </div>
    );  
}