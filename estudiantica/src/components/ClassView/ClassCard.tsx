import { Class } from '../../Object/Class';
import React, { useEffect, useState } from 'react'
import bandera from '@/assets/img/bandera.png'

const getEndDateStatus = (endDate: Date) => {
    let endDateStatus = { text: "Activo", bgColor: "bg-green-600" };

    if (endDate < new Date()) {
        endDateStatus.text = "Archivado";
        endDateStatus.bgColor = "bg-gray-600"
    }

    return endDateStatus;
}

type ClassCardProps = {
    classData: Class,
    onOpen: () => void;
}

const Calcgrade = async(id:number) => {
    try {
            const response = await fetch(`http://localhost:3000/class_grade?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error(`Bad Request ${response.body}`)
                    case 401:
                        throw new Error(`Unauthorized: ${response.body}`)
                    case 500:
                        throw new Error(`Internal Server Error: ${response.body}`)
                }
            }
            const data = await response.json();
            return data.grade;
        } catch (error) {
            console.error("Error ", error);
            return null;
        }
}

export default function ClassCard({ classData, onOpen }: ClassCardProps): React.ReactNode {
    const [grade, setGrade] = useState<string | number | null>(null);
    const activateClass = getEndDateStatus(new Date(classData.end_date))
    const color = classData.color?.slice(0, 6) || "ffffff";

    useEffect(() => {
        const loadGrade = async () => {
            const result = await Calcgrade(classData.id);
            if (typeof result === 'number') {
                setGrade(result.toFixed(2));
            } else {
                setGrade(result);
            }
        };
        
        loadGrade();
    }, [classData.id]); // Solo se ejecuta cuando classData.id cambia

    if (classData.start_date == null) console.log("Fecha Inicio null");

    return (
        <div
            key={classData.id}
            onClick={onOpen}
            className="grid grid-cols-6 grid-rows-3 border-gray-400 rounded-lg w-7/8 md:w-3/4 bg-[#ffffe6] shadow-md"
        >
            <div className="row-span-3 flex w-15 h-15 sm:w-20 sm:h-20 md:w-23 md:h-23 lg:w-30 lg:h-30 items-center col-span-1">
                <img src={bandera} />
            </div>
            <div className="ml-5 col-span-5 row-span-3">
                <div className="flex mb-2 mr-2 md:mr-4 space-x-2 mt-2 justify-end">
                    <div className="flex space-x-2">
                        <label className={`flex items-center text-sm md:text-basic space-x-1 px-2 py-1 text-white ${activateClass.bgColor} rounded-full`}>
                            <span>{activateClass.text}</span>
                        </label>
                    </div>

                </div>
                <div className="flex-row flex items-center justify-between">
                    <p className="text-gray-900 text-xl sm:text-2xl font-semibold w-2/3">{classData.name}</p>
                    <div className={`aspect-square border-2 w-5 h-5 rounded-full mr-4`}
                        style={{ backgroundColor: `#${color}` }}
                    >
                    </div>
                </div>
                <div className="text-gray-600 text-right text-sm md:text-lg mr-4 px-2 py-1 rounded-full">
                    <span> Calificación:  {grade ?? "...Cargando"}</span>
                </div>
                <div className="text-gray-600 text-right text-sm md:text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Fecha de Inicio: {new Date(classData.start_date).toISOString().split('T')[0]}</span>
                </div>
                <div className="text-gray-600 text-right text-xs md:text-lg mr-4 px-2 py-1 rounded-full">
                    <span>Fecha de Fin: {new Date(classData.end_date).toISOString().split('T')[0]}</span>
                </div>
            </div>
        </div>
    );
}