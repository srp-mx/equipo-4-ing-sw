import { useState } from 'react'
import CreateAssignmentModal from "../AssigmentView/CreateAssigmentModal";
import { Assigment } from '@/Object/Assigment';
import { useDispatch, useSelector } from 'react-redux';
import { removeAssignment, updateAssignment } from '@/constants/assignmentSlice';
import { getCharacterDefaultInfo, getRefresh, getStats } from '../Character';
import { RootState } from '@/constants/store';
import { getPointSkill } from '../Character/Stats';
import { RachaCharacter } from '@/Object/Character';

const selectedfetch = async (option: string, selection: Array<Assigment>, dispatch: any, racha: RachaCharacter) => {
    for (const task of selection) {
        switch (option) {
            case "delete":
                try {
                    const response = await fetch("http://localhost:3000/delete_assignment", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ id: task.id })
                    });
                    if (!response.ok) {
                        const error = await response.json();
                        console.error("El error es ", error);
                        throw new Error(`Error ${response.status} ${response.statusText}`);
                    }
                    dispatch(removeAssignment(task));
                } catch (error) {
                    console.error(error);
                }
                break;
            case "complete":
                try {
                    const dataSend = {
                        "assignment": {
                            "id": task.id
                        },
                        "new_assignment": {
                            ...task,
                            progress: 1,
                        }
                    }

                    const response = await fetch("http://localhost:3000/patch_assignment", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataSend)
                    });
                    if (!response.ok) {
                        const error = await response.json();
                        console.error("El error es ", error);
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }

                    const t = {
                        ...task,
                        progress: 1,
                    }

                    dispatch(updateAssignment(t));
                    getRefresh(dispatch).then(() => {
                        if (racha.alive) {
                            Promise.allSettled([
                                getCharacterDefaultInfo(dispatch),
                                getStats(dispatch),
                                getPointSkill(dispatch),
                            ]).catch(error => console.error("Error en actualizacion background ", error));
                        }
                    }).catch(error => console.error("Error en refresh ", error));

                } catch (error) {
                    console.error(error);
                }
                break;
            case "incomplete":
                try {
                    const dataSend = {
                        "assignment": {
                            "id": task.id
                        },
                        "new_assignment": {
                            ...task,
                            progress: -1,
                        }
                    }

                    const response = await fetch("http://localhost:3000/patch_assignment", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataSend)
                    });
                    if (!response.ok) {
                        const error = await response.json();
                        console.error("El error es ", error);
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }

                    const t = {
                        ...task,
                        progress: -1,
                    }
                    dispatch(updateAssignment(t));
                } catch (error) {
                    console.error(error);
                }
                break;
        }
    }
    // Petición a la api para cambiar el progreso de una tarea o borrarlo
    // en delete si es necesario, cambiar el cuerpo de fetch

    // selection se vuelve un arreglpo vacio
}

export default function BottonResultBar({ selection, onClickCard }: { selection: Array<Assigment>, onClickCard: (valor: boolean) => void }): React.ReactNode {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const racha = useSelector((state: RootState) => state.racha);
    const dispatch = useDispatch()
    return (
        <div className="flex space-x-2 text-sm md:text-basic lg:text-lg">
            <div className={selection.length > 0 ? "flex flex-row space-y-2 sm:flex-row space-x-1 text-white " : "hidden"}>
                <button
                    className="flex px-3 py-2 bg-green-600 font-bold rounded-full hover:bg-green-500"
                    onClick={() => selectedfetch("complete", selection, dispatch, racha.racha)}
                >
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Social-Rewards-Certified-Ribbon--Streamline-Pixel" height="24" width="24"><desc>Social Rewards Certified Ribbon Streamline Icon: https://streamlinehq.com</desc><title>social-rewards-certified-ribbon</title><g><path d="M19.4325 1.1400000000000001h1.1400000000000001v21.7125h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M17.145 22.8525h2.2874999999999996V24h-2.2874999999999996Z" fill="#ffffff" stroke-width="0.75"></path><path d="M16.005 21.7125h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="m17.145 5.715 -1.1400000000000001 0 0 1.1400000000000001 -1.1475 0 0 1.1400000000000001 -1.1400000000000001 0 0 1.1475 -1.1475 0 0 1.1400000000000001 -1.1400000000000001 0 0 1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -1.1475 0 0 -1.1400000000000001 -1.1400000000000001 0 0 1.1400000000000001 -1.1400000000000001 0 0 1.1400000000000001 1.1400000000000001 0 0 1.1475 1.1400000000000001 0 0 1.1400000000000001 1.1475 0 0 1.1475 1.1400000000000001 0 0 -1.1475 1.1400000000000001 0 0 -1.1400000000000001 1.1475 0 0 -1.1475 1.1400000000000001 0 0 -1.1400000000000001 1.1475 0 0 -1.1400000000000001 1.1400000000000001 0 0 -1.1475 1.1400000000000001 0 0 -1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001z" fill="#ffffff" stroke-width="0.75"></path><path d="M14.857499999999998 20.572499999999998h1.1475v1.1400000000000001h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M13.7175 19.424999999999997h1.1400000000000001v1.1475h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M12.57 18.285h1.1475v1.1400000000000001h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M11.43 17.137500000000003h1.1400000000000001v1.1475h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M10.290000000000001 18.285h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M9.1425 19.424999999999997h1.1475v1.1475h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M8.0025 20.572499999999998h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M6.862500000000001 21.7125h1.1400000000000001v1.1400000000000001H6.862500000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.574999999999999 0h14.857499999999998v1.1400000000000001H4.574999999999999Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.574999999999999 22.8525h2.2874999999999996V24H4.574999999999999Z" fill="#ffffff" stroke-width="0.75"></path><path d="M3.4275 1.1400000000000001H4.574999999999999v21.7125H3.4275Z" fill="#ffffff" stroke-width="0.75"></path></g></svg>
                    <p className='hidden sm:block'>Completado</p>
                </button>
                <button
                    className="flex px-3 py-2 bg-yellow-600 font-bold rounded-full hover:bg-yellow-500"
                    onClick={() => selectedfetch("incomplete", selection, dispatch, racha.racha)}>
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Interface-Essential-Skull-1--Streamline-Pixel" height="24" width="24"><desc>Interface Essential Skull 1 Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-skull-1</title><g><path d="M21.71625 5.1450000000000005h1.1400000000000001v10.2825h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M20.576249999999998 15.4275h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M20.576249999999998 3.9975h1.1400000000000001v1.1475h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M19.42875 16.5675h1.1475v1.1475h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M19.42875 2.8575h1.1475v1.1400000000000001h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M18.28875 17.715h1.1400000000000001v4.5675h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="m18.28875 9.712499999999999 -2.2874999999999996 0 0 1.1400000000000001 -1.1400000000000001 0 0 2.2874999999999996 1.1400000000000001 0 0 1.1475 2.2874999999999996 0 0 -1.1475 1.1400000000000001 0 0 -2.2874999999999996 -1.1400000000000001 0 0 -1.1400000000000001z" fill="#ffffff" stroke-width="0.75"></path><path d="M17.14125 1.71h2.2874999999999996v1.1475h-2.2874999999999996Z" fill="#ffffff" stroke-width="0.75"></path><path d="M14.861250000000002 22.2825h3.4275v1.1475h-3.4275Z" fill="#ffffff" stroke-width="0.75"></path><path d="M13.713750000000001 18.855h1.1475v3.4275h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M10.286249999999999 22.2825h3.4275v1.1475h-3.4275Z" fill="#ffffff" stroke-width="0.75"></path><path d="M10.286249999999999 15.4275h3.4275v1.1400000000000001h-3.4275Z" fill="#ffffff" stroke-width="0.75"></path><path d="M9.14625 18.855h1.1400000000000001v3.4275h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M6.85875 0.5700000000000001h10.2825v1.1400000000000001H6.85875Z" fill="#ffffff" stroke-width="0.75"></path><path d="M5.71875 22.2825h3.4275v1.1475h-3.4275Z" fill="#ffffff" stroke-width="0.75"></path><path d="m7.998749999999999 9.712499999999999 -2.2800000000000002 0 0 1.1400000000000001 -1.1475 0 0 2.2874999999999996 1.1475 0 0 1.1475 2.2800000000000002 0 0 -1.1475 1.1475 0 0 -2.2874999999999996 -1.1475 0 0 -1.1400000000000001z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.57125 1.71h2.2874999999999996v1.1475h-2.2874999999999996Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.57125 17.715h1.1475v4.5675h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M3.4312500000000004 16.5675h1.1400000000000001v1.1475h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M3.4312500000000004 2.8575h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M2.2912500000000002 15.4275h1.1400000000000001v1.1400000000000001h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M2.2912500000000002 3.9975h1.1400000000000001v1.1475h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M1.1437499999999998 5.1450000000000005h1.1475v10.2825h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path></g></svg>
                    <p className='hidden sm:block'>No completado</p>
                </button>
                <button
                    className="flex px-3 py-2 bg-red-600 font-bold rounded-full hover:bg-red-500"
                    onClick={() => selectedfetch("delete", selection, dispatch, racha.racha)}>
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Interface-Essential-Bin--Streamline-Pixel" height="24" width="24">
                        <g>
                            <path d="m20.23828125 6.546875000000001 0 13.093750000000002 1.1953125 0 0 -13.093750000000002 2.375 0 0 -1.1875 -1.1875 0 0 -1.1953125 -4.765625 0 0 -2.3828125 -1.1875 0 0 2.3828125 -8.3359375 0 0 -2.3828125 -1.1875 0 0 2.3828125 -4.7578125 0 0 1.1953125 -1.1953125 0 0 1.1875 2.3828125 0 0 13.093750000000002 1.1875 0 0 -13.093750000000002 15.476562499999998 0z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M19.05078125 19.640625h1.1875v3.5703125h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M5.95703125 23.2109375h13.093750000000002v1.1953125H5.95703125Z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M16.66796875 8.9296875h1.1875v9.5234375h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M15.480468750000002 18.453125h1.1875v2.375h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M11.91015625 8.9296875h1.1875v11.8984375h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M8.33203125 0.59375h8.3359375v1.1875h-8.3359375Z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M8.33203125 18.453125h1.1953125v2.375h-1.1953125Z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M7.14453125 8.9296875h1.1875v9.5234375h-1.1875Z" fill="#ffffff" stroke-width="0.7813"></path>
                            <path d="M4.76171875 19.640625h1.1953125v3.5703125h-1.1953125Z" fill="#ffffff" stroke-width="0.7813"></path>
                        </g>
                    </svg>
                    <p className='hidden sm:block'>Borrar</p>
                </button>
            </div>
            <div className={selection.length > 0 ? "hidden" : "flex space-x-2"}>
                <button
                    className="flex px-3 py-2 bg-green-600 font-bold rounded-full hover:bg-green-500 text-white"
                    onClick={() => { setIsModalOpen(true); onClickCard(false); }}
                >
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Interface-Essential-Bookmark--Streamline-Pixel" height="24" width="24"><desc>Interface Essential Bookmark Streamline Icon: https://streamlinehq.com</desc><title>interface-essential-bookmark</title><g><path d="M22.86 3.4275H24v18.285h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M21.7125 21.7125h1.1475v1.1475h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M21.7125 2.2874999999999996h1.1475v1.1400000000000001h-1.1475Z" fill="#ffffff" stroke-width="0.75"></path><path d="M2.2874999999999996 22.86h19.424999999999997V24H2.2874999999999996Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.574999999999999 18.285h14.857499999999998v1.1475H4.574999999999999Z" fill="#ffffff" stroke-width="0.75"></path><path d="M4.574999999999999 13.7175h14.857499999999998v1.1400000000000001H4.574999999999999Z" fill="#ffffff" stroke-width="0.75"></path><path d="M13.7175 9.1425h5.715v1.1400000000000001h-5.715Z" fill="#ffffff" stroke-width="0.75"></path><path d="M13.7175 5.715h5.715v1.1400000000000001h-5.715Z" fill="#ffffff" stroke-width="0.75"></path><path d="M5.715 2.2874999999999996v7.995h1.1400000000000001v-1.1400000000000001h1.1475v-1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1400000000000001v1.1400000000000001h1.1475V2.2874999999999996h10.2825V1.1400000000000001H10.2825V0H3.4275v1.1400000000000001H1.1400000000000001v1.1475Zm2.2874999999999996 -1.1475h1.1400000000000001v1.1475h1.1400000000000001V4.574999999999999h-1.1400000000000001V2.2874999999999996h-1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M1.1400000000000001 21.7125h1.1475v1.1475H1.1400000000000001Z" fill="#ffffff" stroke-width="0.75"></path><path d="M0 2.2874999999999996h1.1400000000000001v19.424999999999997H0Z" fill="#ffffff" stroke-width="0.75"></path></g></svg>                    
                    <p>Agregar tarea</p>
                </button>
                <CreateAssignmentModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); onClickCard(true); }} />
            </div>
        </div>
    );
}