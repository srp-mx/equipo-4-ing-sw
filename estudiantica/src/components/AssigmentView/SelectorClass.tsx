import React from "react";
import { BiChevronDown } from 'react-icons/bi'
import { Assigment } from "@/Object/Assigment";

async function getWorks() : Promise<Assigment[]> {
    try{
        const response = await fetch("http://localhost:3000/all_assignment",{
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
        const assignments : Assigment[] = data; 
        return assignments; 
        
    }catch(error){
        console.error("Error ", error);
        return [];
    }
}


const Selector = () => {
    return (
        <div className="relative w-full border rounded p-1 mt-2 justify-between">
            <div> Select Country </div>
            <BiChevronDown size={10}/>
        </div>
        <ul className="bg-[#ffffe6] text-black">
            
        </ul>
    );
}