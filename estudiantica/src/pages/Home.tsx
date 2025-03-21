import NavBar from "../components/Navbar";
import Character from "../components/Character";

export default function Home(){
    return (
        <>
            <NavBar />
            <div className="flex mt-10 justify-center max-w-7xl mx-auto pt-20 px-6">
                <div className="w-4/5 rounded-lg space-x-6 px-4 py-4">
                    <Character />
                </div>
                <div className=" w-1/5 items-center text-center text-4xl text-gray-100 rounded-lg space-y-3">
                    
                    <a href="#" className="flex items-center text-center w-full h-1/4 px-4 py-4 bg-gradient-to-r bg-red-500 to-red-600 hover:bg-red-800 " >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>
                    Tareas
                    </a>
                    <a href="button" className="flex items-center text-center w-full h-1/4 px-4 py-4 bg-gradient-to-r bg-blue-500 to-blue-600 hover:bg-blue-800 " >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
                    Horario
                    </a>

                    <a href="button" className="flex items-center text-center w-full h-1/4 px-4 py-4 bg-gradient-to-r bg-green-500 to-green-600 hover:bg-green-800 " >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>                    
                    
                    Materias
                    </a>
                    
                    <a href="button" className="flex items-center text-center w-full h-1/4 px-4 py-4 bg-gradient-to-r bg-amber-500 to-amber-600 hover:bg-amber-800 " >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>                    
                    Calendario
                    </a>
                </div>
            </div>
        </>
    );    
}