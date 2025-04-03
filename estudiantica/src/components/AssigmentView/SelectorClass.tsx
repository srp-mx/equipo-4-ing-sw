import React, { useEffect, useState } from "react";
import { BiChevronDown } from 'react-icons/bi';
import { Class } from "@/Object/Class";
import { AiOutlineSearch } from 'react-icons/ai';

interface idProps {
    id: number, 
    changeId: (id: number) => void
}

async function getClass() : Promise<Class[]> {
    try{
        const response = await fetch("http://localhost:3000/user_classes",{
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
        const assignments : Class[] = data; 
        return assignments; 
        
    }catch(error){
        console.error("Error ", error);
        return [];
    }
}


export default function Selection({id, changeId} : idProps) {
    const[clases, setClase] = useState<Class[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected ] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchTasks(){
            const data = await getClass();
            setClase(data);    
        }
        fetchTasks();    
    },[]);
    
    // Recordar escribir el subString por si es demasiado largo 

    return (
        <><div 
        onClick={() => setOpen(!open)}
        className={`relative w-full border rounded p-1 mt-2 flex justify-between
         ${!selected && "text-gray-700"}`}>
            <div> {selected ? selected : "Selecciona Clase"} </div> 
            <BiChevronDown size={20} className={`${open && 'rotate-180'}`}/>
        </div>
        <ul className={`bg-[#ffffe6] text-black overflow-y-auto
            ${open ? "max-h-50" : "max-h-0" }
        `}>
            <div className="flex items-center px-2 sticky top-0 bg-[#ffffe6]">
                <AiOutlineSearch size={20} className="text-gray-700"/>
                <input 
                type="text"
                value={inputValue} 
                onChange={(e)=> setInputValue(e.target.value.toLowerCase())}
                placeholder="Ingresa la clase" 
                className="placeholder:text-gray-700 p-2 outline-none"/>
            </div>
            {clases.map((clase) => (
                <li
                key ={clase.id} 
                className={`p-2 text-sm hover:bg-[#fafaa7] 
                ${clase.name.toLowerCase() === selected.toLowerCase() && 'bg-[#fafaa7]'}
                ${clase.name.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'} `}
                onClick={() => {
                    if(clase.name.toLowerCase() !== selected.toLowerCase()){
                        setSelected(clase.name);
                        setOpen(false);
                        changeId(clase.id);
                        setInputValue("");
                    }
                }}
                >
                {clase.name}
                </li>
            ))}
        </ul>
        </>
    );
}