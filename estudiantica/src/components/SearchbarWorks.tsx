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
function DropdownMenuSort({ options, onSelect }: { options: { label: string, value: string }[], onSelect: (option: string) => void }){
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

    const sortOptions = [
        { label: "Nombre (A-Z)", value: "name-asc"}, 
        { label: "Nombre (Z-A)", value: "name-desc"},
        { label: "Calificación (↑)", value: "grade-asc"},
        { label: "Calificación (↓)", value: "grade-desc"},
        { label: "Fecha más cercana", value: "dueDate-asc"},
        { label: "Fecha más lejana", value: "dueDate-desc"},
    ];
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownRef2 = useRef<HTMLDivElement>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<null | number>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortCriteria, setSortCriteria] = useState<"name" | "grade" | "dueDate">("dueDate");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [isOpen, setIsOpen] = useState(true);
    const user = useSelector((state: RootState) => state.user);
    const tasks = useSelector((state: RootState) => state.assignments.assignments);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchTasks() {
            setLoading(true);
            const data = await getWorks(user.name);
            dispatch(setAssignments(data));
            setLoading(false);
        }

        fetchTasks();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const dropdownProgreso = document.getElementById('dropdown')
            if (dropdownProgreso?.classList.contains('block') && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const dropdownProgreso = document.getElementById('dropSort')
            if (dropdownProgreso?.classList.contains('block') && dropdownRef2.current && !dropdownRef2.current.contains(event.target as Node)) {
                setIsOrderOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const sortTask = (tasks: Assigment[]) => {
        return [...tasks].sort( (a, b) => {
            if(sortCriteria === "name") {
                const nameA = a.name.toLowerCase(); 
                const nameB = b.name.toLowerCase();
                return sortDirection === "asc" 
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
            }else if (sortCriteria === "grade") {
                return sortDirection === "asc"
                ? a.grade - b.grade 
                : b.grade - a.grade;
            }else if (sortCriteria === "dueDate" && a.due_date && b.due_date) {
                const dateA = new Date(a.due_date).getTime();
                const dateB = new Date(b.due_date).getTime();
                return sortDirection === "asc" 
                ? dateA - dateB 
                : dateB - dateA;
            }
            return 0;
        });
    }

    const filteredTasks = sortTask(
        tasks.filter(
            (task) => 
                (selectedStatus === null || task.progress === selectedStatus) &&
                task.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="space-y-4 z-0">
            <div className="mx-auto w-full">
            {isOpen && (
            
            <div className="flex flex-col relative">
                <div
                    ref={dropdownRef2}
                    id="dropSort"
                    className={`absolute justify-end mt-30 sm:mt-24 md:mt-25 ml-33 md:ml-35 w-44 bg-gray-700 rounded-lg shadow-sm divide-y divide-gray-100 transition-opacity ${
                        isOrderOpen ? "block" : "hidden"
                    }`}
                    >
                        <DropdownMenuSort options={sortOptions} onSelect={(value) => {
                            const[criteria, direction] = value.split("-");
                            setSortCriteria(criteria as "name" | "grade" | "dueDate");
                            setSortDirection(direction as "asc" | "desc");
                            setIsOrderOpen(false);
                        }} />
                </div>
                <div
                    ref={dropdownRef}
                    id="dropdown"
                    className={`absolute mt-24 md:mt-25 w-44 bg-gray-700 rounded-lg shadow-sm divide-y divide-gray-100 transition-opacity ${
                        isFilterOpen ? "block" : "hidden"
                    }`}
                >
                    <DropdownMenu options={statusMap} onSelect={(value) => { setSelectedStatus(value); setIsFilterOpen(false); }} />
                </div>
                <div className="relative w-full">
                    <input 
                        type="search" 
                        id="search-dropdown" 
                        className="block p-2.5 w-full z-20 text-sm rounded-lg border bg-gray-700 border-s-gray-700 border-gray-600 placeholder-gray-400 text-white" 
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
                <div className="flex flex-row  items-center w-full sm:w-auto space-x-2 mt-2">
                    <button
                        id="filter-button"
                        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 bg-gray-700 text-xs md:text-sm font-medium text-center border rounded-lg focus:ring-4 hover:bg-gray-600 focus:ring-gray-700 text-white border-gray-600"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        {statusMap.find((s) => s.value === selectedStatus)?.label || "Seleccionar"}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <button
                        id="sort-button"
                        className="shrink-0 z-10 rounded-lg flex-col sm:flex-row inline-flex items-center py-2.5 px-4 bg-gray-700 text-xs md:text-sm font-medium text-center border focus:ring-4 hover:bg-gray-600 focus:ring-gray-700 text-white border-gray-600"
                        onClick={() => setIsOrderOpen(!isOrderOpen)}
                        >
                        Ordenar por: 
                        <p>{sortOptions.find((s) => s.value === `${sortCriteria}-${sortDirection}`)?.label || "Fecha más cercana"}</p>
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                </div>
            </div>
            )}

            {loading ? (
                <div className="mt-2 mb-3 h-3/4 mt-8 overflow-y-auto">
                    <div id="loading-skeleton" className="space-y-4">
                        <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
                        <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
                        <div className="animate-pulse bg-gray-700 rounded-lg h-30"></div>
                    </div>
                </div>
                ) : (
                <Resultbar assigment={filteredTasks} onClickCard = {(valor) => {
                    setIsOpen(valor)
                }} />
            )}
            </div>
        </div>
    );
}