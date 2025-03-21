export default function Header(){
    return (
        <header className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-white ml-2">estudiantika</div>
        <div className="flex">
            <button className="flex rounded-full bg-[#cbda3d] px-3 py-2 mr-4 transition-all hover:bg-white">
                <div className="mr-3">
                    <img src="assets/img/icono_user.svg"/>
                </div>
                Usuario
            </button>
            <button className="-top-3 left-8 flex items-center text-[#cbda3d] hover:text-white transition-all focus:text-[#ffffff]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" id="Interface-Essential-Signout-Logout--Streamline-Pixel" height="24" width="24">
                    <g><path d="m18.85875 6.855 0 3.4275 -4.574999999999999 0 0 2.2874999999999996 4.574999999999999 0 0 3.4275 1.1400000000000001 0 0 -1.1400000000000001 1.1475 0 0 -1.1400000000000001 1.1400000000000001 0 0 -1.1475 1.1400000000000001 0 0 -2.2874999999999996 -1.1400000000000001 0 0 -1.1400000000000001 -1.1400000000000001 0 0 -1.1400000000000001 -1.1475 0 0 -1.1475 -1.1400000000000001 0z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M15.431249999999999 15.997499999999999h1.1400000000000001v4.574999999999999h-1.1400000000000001Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M15.431249999999999 1.1400000000000001h1.1400000000000001v5.715h-1.1400000000000001Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="m10.85625 22.86 0 -1.1475 4.574999999999999 0 0 -1.1400000000000001 -4.574999999999999 0 0 -14.857499999999998 -1.1400000000000001 0 0 17.145 1.1400000000000001 0z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M6.28875 22.86h3.4275V24h-3.4275Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M7.428749999999999 12.57h1.1400000000000001v2.2874999999999996h-1.1400000000000001Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M7.428749999999999 4.574999999999999h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M4.00125 21.7125h2.2874999999999996v1.1475h-2.2874999999999996Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M5.14125 3.4275h2.2874999999999996V4.574999999999999h-2.2874999999999996Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M1.71375 20.572499999999998h2.2874999999999996v1.1400000000000001h-2.2874999999999996Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="M2.86125 2.2874999999999996h2.2800000000000002v1.1400000000000001h-2.2800000000000002Z" fill="currentColor" stroke-width="0.75"></path>
                        <path d="m1.71375 0 0 1.1400000000000001 -1.1400000000000001 0 0 19.4325 1.1400000000000001 0 0 -18.285 1.1475 0 0 -1.1475 12.57 0 0 -1.1400000000000001 -13.7175 0z" fill="currentColor" stroke-width="0.75"></path>
                    </g>
                </svg>
                <span className="ml-2 text-sm">Cerrar Sesión</span>
            </button>
        </div>
    </header>
    );
}