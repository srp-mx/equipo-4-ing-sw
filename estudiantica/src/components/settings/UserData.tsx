import { useState } from "react";
const userIcon = "/assets/img/user.png"; // Replace with your user icon path

export default function UserData(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    return (
        <div className="flex justify-center items-center ">
            <div className="shadow-lg rounded-lg p-5 w-5/6 text-white ">
            <h1 className="text-3xl text-white mb-3">Cambiar información personal</h1>
            <p>Use un correo donde pueda recibir notificaciones</p>
                {/* Avatar Section */}
                <div className="flex items-center space-x-4 mb-6 mt-2">
                <img
                    src={userIcon}
                    alt=""
                    className="w-30 h-30 rounded-lg bg-white"
                />
                <div>
                    <button 
                    className="pixel-corner-button px-6 py-2 mt-6 bg-[#cbda3d] text-black  py-2"
                    style={{ "--pixel-bg": "#2D304F" , "--pixel-hover-bg" : "#FFFFFF","--size-pixel" : "10px"} as React.CSSProperties}
                    >
                    Change avatar
                    </button>
                    <p className="text-xs mt-2">JPG, GIF o PNG. 1MB max.</p>
                </div>
                </div>
        
                {/* Form Section */}
                <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative flex mb-4">
                    <input
                        type="text"
                        className="peer block w-full px-3 py-2 text-sm text-white bg-transparennt border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder=""
                    />
                    <label className="absolute text-transparent transform scale-50 top-1/6 left-3 -translate-y-1/6 transition-all duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#cbda3d] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#cbda3d] pointer-events-none">
                        Nombre(s)
                    </label>
                    </div>
                    <div className="relative flex mb-4">
                    <input
                        type="text"
                        className="peer block w-full px-3 py-2 text-sm text-white bg-transparennt border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder=""
                    />
                    <label className="absolute text-transparent transform scale-50 top-1/6 left-3 -translate-y-1/6 transition-all duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#cbda3d] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#cbda3d] pointer-events-none">
                        Apellido(s)
                    </label>
                    </div>
                </div>

                <div className="block relative flex mb-8">
                    <input
                    type="email"
                    className="peer block w-full px-3 py-2 text-sm text-white bg-transparennt border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    />
                    <label className="absolute text-transparent transform scale-50 top-1/6 left-3 -translate-y-1/6 transition-all duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#cbda3d] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#cbda3d] pointer-events-none">
                        Correo electronico
                    </label>
                </div>
        
                <div className="block relative flex mb-4">
                    <input
                        type="text"
                        className="peer block w-full px-3 py-2 text-sm text-white bg-transparennt border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=""
                    />
                    <label className="absolute text-transparent transform scale-50 top-1/6 left-3 -translate-y-1/6 transition-all duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#cbda3d] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#cbda3d] pointer-events-none">
                        Nombre de usuario
                    </label>
                </div>
                </div>
        
                {/* Save Button */}
                <button className="pixel-corner-button px-6 py-2 mt-6 bg-[#cbda3d] text-black  py-2"
                style={{ "--pixel-bg": "#2D304F" , "--pixel-hover-bg" : "#FFFFFF","--size-pixel" : "10px"} as React.CSSProperties}
                >
                Guardar cambios 
                </button>
            </div>
        </div>
    );

}