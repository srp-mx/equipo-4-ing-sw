import { Button } from "../Button";

export default function UserData(){
    return (
        <div className="flex justify-center items-center ">
            <div className="shadow-lg rounded-lg p-5 w-11/12 md:w-5/6 text-white ">
            <h1 className="text-2xl md:text-3xl text-white mb-3">Eliminar cuenta</h1>
            <p className="mb-2">¿Insatisfecho de nuestro servicio? Puede eliminar su cuenta aqui. Esta acción es irreversible y toda su información
                personal sera eliminada de nuestros servidores.</p>
                <Button 
                    type="button"
                    style={{ "--pixel-bg": "#2D304F" , "--pixel-hover-bg" : "#FFFFFF","--size-pixel" : "10px"} as React.CSSProperties}
                >
                    Eliminar Cuenta
                </Button>
            </div>
        </div>
    );

}