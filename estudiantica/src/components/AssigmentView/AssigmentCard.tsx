import { Assigment } from '../../Object/Assigment';
import React from 'react'
import bandera from '@/assets/img/bandera.png'

const getProgressStatus = (progress: number) => {
    let progressStatus = { text : "En progreso", bgColor : "bg-gray-600"};

    if(progress < 0){
        progressStatus.text = "No completado";
        progressStatus.bgColor = "bg-yellow-600"
    } else if (progress > 0) {
        progressStatus.text = "Completado";
        progressStatus.bgColor = "bg-green-600"
    }

    return progressStatus;
}

type AssigmentCardProps = {
    assigment : Assigment;
    onOpen: () => void;
}

export default function AssigmentCard({ assigment, onOpen } : AssigmentCardProps) : React.ReactNode {
    const progressStatus = getProgressStatus(assigment.progress)

    return (
        <div 
            key={assigment.id}
            onClick = {onOpen}
            className="grid grid-cols-6 grid-rows-3 border-gray-400 rounded-lg w-7/8 md:w-3/4 bg-[#ffffe6] shadow-md "
        >
            <div className="row-span-3 flex w-15 h-15 sm:w-20 sm:h-20 md:w-23 md:h-23 lg:w-30 lg:h-30 items-center col-span-1">
                <img src={bandera}/>
            </div>
            <div className="ml-5 col-span-5 row-span-3">
                <div className="flex mb-2 mr-2 sm:mr-3 md:mr-4 space-x-2 mt-2 justify-end">
                    <div className="flex flex-col sm:flex-row space-x-2 space-y-1 sm:space-y-0">
                        {assigment.optional && (
                            <label className="flex items-center text-xs md:text-basic space-x-1 text-white bg-gray-600 px-2 py-1 rounded-full">
                                <span>Opcional</span>
                            </label>
                        )}
                        <label className={`flex items-center text-xs md:text-basic space-x-1 px-2 py-1 text-white ${progressStatus.bgColor} rounded-full`}>
                            <span>{progressStatus.text}</span>
                        </label>
                    </div>
                    
                </div>
                <p className="text-gray-900 font-semibold w-2/3 ml-2 text-sm sm:text-lg">{assigment.name}</p>
                <div className="text-gray-600 text-right text-sm md:text-lg mr-4 px-2 py-1 rounded-full">
                    <span>{new Date(assigment.due_date).toISOString().split('T')[0]}</span>
                </div>
            </div>
        </div>
    );
}