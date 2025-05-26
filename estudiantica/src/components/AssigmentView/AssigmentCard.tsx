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
            className="grid grid-cols-6 grid-rows-3 items-center border-gray-400 rounded-lg w-4/5 bg-[#ffffe6] shadow-md "
        >
            <div className="row-span-3 flex w-30 h-30 items-center justify-center">
                <img src={bandera}/>
            </div>
            <div className="ml-3 col-span-5 row-span-3">
                <div className="flex mb-2 mr-4 space-x-2 justify-end">
                    <div className="flex space-x-2">
                        {assigment.optional && (
                            <label className="flex items-center space-x-1 text-white bg-gray-600 px-2 py-1 rounded-full">
                                <span>Opcional</span>
                            </label>
                        )}
                        <label className={`flex items-center space-x-1 px-2 py-1 text-white ${progressStatus.bgColor} rounded-full`}>
                            <span>{progressStatus.text}</span>
                        </label>
                    </div>
                    
                </div>
                <p className="text-gray-900 font-semibold w-2/3">{assigment.name}</p>
                <div className="text-gray-600 text-right text-lg mr-4 px-2 py-1 rounded-full">
                    <span>{new Date(assigment.due_date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}