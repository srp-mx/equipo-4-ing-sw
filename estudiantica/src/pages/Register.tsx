import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ onClick, children, icon }: { onClick?: () => void; children: React.ReactNode; icon?: string }) => (
  <button onClick={onClick} className="pixel-corner-button mb-4 flex bg-[#cbda3d] py-4 px-10 min-w-[300px] transition-all hover:bg-white">
    {icon && <img src={icon} className="w-6 h-6 mr-3" alt="Button Icon" />}
    {children}
  </button>
);

const ButtonReturn = ({ onClick }: { onClick?: () => void}) => (
  <button onClick={onClick} className="absolute -top-3 left-0 flex items-center text-[#cbda3d] hover:text-white transition-all focus:text-[#ffffff]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">  
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    <span className="ml-2 text-sm">Regresar</span>
  </button>
);

const PasswordInput = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={showPassword ? "text" : "password"}
        className="mb-6 peer block w-full px-3 py-2 text-sm text-white bg-transparent border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d] "
        placeholder="Contraseña"
        value={value}
        onChange={onChange}
        required
      />
      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-[#cbda3d]">
        {showPassword ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M10.73 10.73a3.75 3.75 0 105.27 5.27M6.53 6.53A9.77 9.77 0 012.25 12a9.77 9.77 0 011.47-2.25m15.8 2.25a9.77 9.77 0 00-1.47-2.25" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c2.25-4.5 6.75-7.5 9.75-7.5s7.5 3 9.75 7.5c-2.25 4.5-6.75 7.5-9.75 7.5s-7.5-3-9.75-7.5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

const submit = async (email: string, password: string, username: string, name: string, navigate : (path:string) => void) => {
    try {
        const response = await fetch("http://localhost:3000/register", {
            method: 'POST',
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({
                name,
                username, 
                email,
                password
            }),
        });
        
        if(!response.ok) throw Error("Fallo al crear Usuario 20");

        navigate("/login");       

    } catch (error) {
        if( error instanceof Error) {
            showNotification("Error al crear usuario", "error");
            console.error(error);
        }else {
            showNotification("Error al crear usuario", "error");
        }
    }
};

const showNotification = (message: string, type: "success" | "error" | "warning") => {
    const notificationContainer = document.getElementById("notification-container");
    if (!notificationContainer) return;
  
    notificationContainer.classList.remove("hidden");
  
    const notification = document.createElement("div");
    notification.className = `pixel-corner-notification flex items-center justify-between px-4 py-2 text-white rounded-md shadow-lg
      ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-yellow-500"}`;
  
    notification.innerHTML = `<span>${message}</span>`;
    
    const closeButton = document.createElement("button");
    closeButton.className = "ml-4 text-xl";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => notification.remove());
  
    notification.appendChild(closeButton);
    notificationContainer.appendChild(notification);
  
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    }, 100);
  
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(20px)";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

export default function Register() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[userName, setUserName] = useState("");
    const[name, setName] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-[url(../../public/assets/img/login_bg.jpg)] h-screen  bg-cover bg-center flex justify-center items-center ">
            <div className="relative w-full max-w-lg p-8 rounded-lg">
                <div id="notification-container" className="hidden fixed top-[calc(50hv-270px)] left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md p-4"></div>
                <h2 className="text-4xl font-semibold text-center text-white mb-6">Estudiantica</h2>

                <div className="flex flex-col justify-center items-center mt-6">
                    <div className="relative mb-2">
                    <form className="max-w-lg mx-auto mt-4 p-4 bg-[#2d314f] rounded-lg"
                    onKeyDown={(e) => {
                      if(e.key === 'Enter'){
                        e.preventDefault();
                        submit(email, password, userName, name, navigate);
                      }
                    }}
                    onSubmit={(e) => {e.preventDefault(); submit(email, password, userName, name, navigate)}}>
                        <ButtonReturn onClick={() => navigate("/")} />
                        <div className="relative flex flex-col mb-4">
                            <input 
                                type="email"
                                className="peer block w-full px-3 py-2 text-sm text-white bg-transparent border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]" 
                                placeholder="Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                        </div>
                        <div className="relative flex flex-col mb-4">
                            <input 
                                type="userName"
                                className="peer block w-full px-3 py-2 text-sm text-white bg-transparent border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]" 
                                placeholder="Nombre de Usuario"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                />
                        </div>
                        <div className="relative flex flex-col mb-4">
                            <input 
                                type="Name"
                                className="peer block w-full px-3 py-2 text-sm text-white bg-transparent border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]" 
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                />
                            
                        </div>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button> Registrarse </Button>
                    </form>
                    </div>
                </div>
            </div>

        </div>
    );
}
