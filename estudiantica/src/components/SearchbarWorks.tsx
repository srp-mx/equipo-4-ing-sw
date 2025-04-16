import { useState, useRef, useEffect } from "react";
import Resultbar from "./ListAssigment/Resultbar";
import { Assigment } from "@/Object/Assigment";
import { RootState } from "@/constants/store";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "@/constants/assignmentSlice";

function DropdownMenu({ options, onSelect }: { options: { label: string, value: number | null }[], onSelect: (option: number | null) => void }){
    return (
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option, index) => (
                <li key={index}>
                    <button 
                        type="button" 
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-600 hover:text-white"
                        onClick={() => onSelect(option.value)}
                    >
                        {option.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

/**
 * Función que recupera los trabajos de un usuario
 * @param User - usuario
 * @return Work - trabajos del usuario
 */
async function getWorks(username : string) : Promise<Assigment[]>{
    // Ejemplo de salida
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

export default function SearchbarWorks(){
    const statusMap = [
        { label: "Todos", value: null},
        { label: "Completado", value: 1 },
        { label: "No completado", value: -1 },
        { label: "En progreso", value: 0 }
    ];

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<null | number>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.user);
    //Versión de prueba
    // let tasks = getWorks
    const tasks = useSelector((state: RootState) => state.assignments.assignments);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchTasks() {
            setLoading(true);
            const data = await getWorks(user.name); // Cambia por el usuario real
            dispatch(setAssignments(data));
            setLoading(false);
        }

        fetchTasks();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const dropdownProgreso = document.getElementById('dropdown')
            if (dropdownProgreso?.classList.contains('block') && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredTasks = tasks.filter(
        (task) => 
            (selectedStatus === null || task.progress === selectedStatus) &&
            task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="mx-auto w-full">
            <div className="flex relative">
                <button
                    id="dropdown-button"
                    className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 bg-gray-700 text-sm font-medium text-center border rounded-s-lg focus:ring-4 hover:bg-gray-600 focus:ring-gray-700 text-white border-gray-600"
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {statusMap.find((s) => s.value === selectedStatus)?.label || "Seleccionar"}
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>

                <div
                    ref={dropdownRef}
                    id="dropdown"
                    className={`absolute mt-10 w-44 bg-gray-700 rounded-lg shadow-sm divide-y divide-gray-100 transition-opacity ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    <DropdownMenu options={statusMap} onSelect={(value) => { setSelectedStatus(value); setIsOpen(false); }} />
                </div>
                <div className="relative w-full">
                    <input 
                        type="search" 
                        id="search-dropdown" 
                        className="block p-2.5 w-full z-20 text-sm rounded-e-lg border bg-gray-700 border-s-gray-700 border-gray-600 placeholder-gray-400 text-white" 
                        placeholder="Buscar Tareas..." 
                        required 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#cbda3d] rounded-e-lg hover:bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Interface-Essential-Search-1--Streamline-Pixel" height="24" width="24" fill="#000000">
                        <g>
                        <path d="m18.285 14.857499999999998 -1.1475 0 0 2.2874999999999996 -2.2800000000000002 0 0 1.1400000000000001 -2.2874999999999996 0 0 1.1400000000000001 3.4275 0 0 1.1475 1.1400000000000001 0 0 1.1400000000000001 1.1475 0 0 1.1475 1.1400000000000001 0 0 1.1400000000000001 1.1475 0 0 -1.1400000000000001 1.1400000000000001 0 0 -1.1475 1.1400000000000001 0 0 -1.1400000000000001 1.1475 0 0 -1.1475 -1.1475 0 0 -1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -1.1400000000000001 0 0 -1.1475 -1.1475 0 0 -3.4275 -1.1400000000000001 0 0 2.2874999999999996z" stroke-width="0.75"></path>
                        <path d="M19.424999999999997 8.0025h1.1475v4.5675H19.424999999999997Z" stroke-width="0.75"></path>
                        <path d="M18.285 5.715h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
                        <path d="M17.137500000000003 3.4275h1.1475v2.2874999999999996h-1.1475Z" stroke-width="0.75"></path>
                        <path d="M15.997499999999999 9.1425h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
                        <path d="M14.857499999999998 6.855h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" stroke-width="0.75"></path>
                        <path d="M14.857499999999998 2.2874999999999996h2.2800000000000002v1.1400000000000001h-2.2800000000000002Z" stroke-width="0.75"></path>
                        <path d="M12.57 5.715h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
                        <path d="M12.57 1.1400000000000001h2.2874999999999996v1.1475h-2.2874999999999996Z" stroke-width="0.75"></path>
                        <path d="M10.2825 4.574999999999999h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" stroke-width="0.75"></path>
                        <path d="M7.995 19.424999999999997h4.574999999999999v1.1475h-4.574999999999999Z" stroke-width="0.75"></path>
                        <path d="M7.995 0h4.574999999999999v1.1400000000000001h-4.574999999999999Z" stroke-width="0.75"></path>
                        <path d="M5.715 18.285h2.2800000000000002v1.1400000000000001H5.715Z" stroke-width="0.75"></path>
                        <path d="M5.715 1.1400000000000001h2.2800000000000002v1.1475H5.715Z" stroke-width="0.75"></path>
                        <path d="M3.4275 17.145h2.2874999999999996v1.1400000000000001H3.4275Z" stroke-width="0.75"></path>
                        <path d="M3.4275 2.2874999999999996h2.2874999999999996v1.1400000000000001H3.4275Z" stroke-width="0.75"></path>
                        <path d="M2.2874999999999996 14.857499999999998h1.1400000000000001v2.2874999999999996H2.2874999999999996Z" stroke-width="0.75"></path>
                        <path d="M2.2874999999999996 3.4275h1.1400000000000001v2.2874999999999996H2.2874999999999996Z" stroke-width="0.75"></path>
                        <path d="M1.1400000000000001 12.57h1.1475v2.2874999999999996H1.1400000000000001Z" stroke-width="0.75"></path>
                        <path d="M1.1400000000000001 5.715h1.1475v2.2874999999999996H1.1400000000000001Z" stroke-width="0.75"></path>
                        <path d="M0 8.0025h1.1400000000000001v4.5675H0Z" fill="#000000" stroke-width="0.75"></path>
                        </g>
                        </svg>
                        <span className="sr-only">Search</span>
                    </div>
                </div>
            </div>
            
            {loading ? (
                <div className="mt-2 mb-3 h-3/4 mt-8 overflow-y-auto">
                    <div id="loading-skeleton" className="space-y-4">
                        <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
                        <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
                        <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
                    </div>
                </div>
                ) : (
                <Resultbar assigment={filteredTasks} />
            )}
            </div>
        </div>
    );
}