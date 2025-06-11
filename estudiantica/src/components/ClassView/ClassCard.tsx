import { Class } from '../../Object/Class';
import React from 'react'
import bandera from '@/assets/img/bandera.png'

const getEndDateStatus = (endDate: Date) => {
    let endDateStatus = { text : "Activo", bgColor : "bg-green-600"};

    if(endDate < new Date()){
        endDateStatus.text = "Archivado";
        endDateStatus.bgColor = "bg-gray-600"
    } 

    return endDateStatus;
}

type ClassCardProps = {
    classData: Class,
    onOpen: () => void;
}

export default function ClassCard({ classData, onOpen } : ClassCardProps) : React.ReactNode {
    const activateClass = getEndDateStatus(new Date (classData.end_date))
    console.log(classData)
    if(classData.start_date == null) console.log("Fecha Inicio null");

    return (
        <div 
            key={classData.id}
            onClick = {onOpen}
            className="grid grid-cols-6 grid-rows-3 border-gray-400 rounded-lg w-7/8 md:w-3/4 bg-[#ffffe6] shadow-md"
        >
            <div className="row-span-3 flex w-15 h-15 sm:w-20 sm:h-20 md:w-23 md:h-23 lg:w-30 lg:h-30 items-center col-span-1">
                <img src={bandera}/>
            </div>
            <div className="ml-5 col-span-5 row-span-3">
                <div className="flex mb-2 mr-2 md:mr-4 space-x-2 mt-2 justify-end">
                    <div className="flex space-x-2">
                        <label className={`flex items-center space-x-1 px-2 py-1 text-white ${activateClass.bgColor} rounded-full`}>
                            <span>{activateClass.text}</span>
                        </label>
                    </div>
                    
                </div>
                <p className="text-gray-900 font-semibold  text-lg w-2/3">{classData.name}</p>
                <div className="text-gray-600 text-right text-sm md:text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Fecha de Inicio: {new Date (classData.start_date).toLocaleDateString()}</span>
                </div>
                <div className="text-gray-600 text-right text-xs md:text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Fecha de Fin: {new Date (classData.end_date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}