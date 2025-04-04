export default function UserData(){
    return (
        <div className="flex justify-center items-center ">
        <div className="shadow-lg rounded-lg p-5 w-5/6 text-white ">
        <h1 className="text-3xl text-white mb-3">Eliminar cuenta</h1>
        <p>¿Insatisfecho de nuestro servicio? Puede eliminar su cuenta aqui. Esta acción es irreversible y toda su información
            personal sera eliminada de nuestros servidores.</p>
            {/* Avatar Section */}
            <button className="pixel-corner-button px-6 py-2 mt-6 bg-[#BF3939] text-black  py-2"
            style={{ "--pixel-bg": "#2D304F" , "--pixel-hover-bg" : "#FFFFFF","--size-pixel" : "10px"} as React.CSSProperties}
            >
            Eliminar cuenta 
            </button>
        </div>
        </div>
    );

}