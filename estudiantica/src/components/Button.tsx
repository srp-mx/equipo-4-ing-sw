type contenButton = {
  onClick? : () => void,
  children : React.ReactNode,
  icon?: string,
  type? : "submit" | "reset" | "button",
  style? : React.CSSProperties
}

export const Button = ({ onClick, children, icon, type, style}: contenButton) => (
  <button onClick={onClick}
    type={type} 
    className={`pixel-corner-button mb-4 flex bg-[#cbda3d] text-[#0D0828] py-4 px-10 min-w-[300px] transition-all hover:bg-white`}
    style={style || { "--pixel-bg": "#2D304F", "--pixel-hover-bg" : "#FFFFFF", "--size-pixel" : "10px"} as React.CSSProperties}
  >
    {icon && <img src={icon} className="w-6 h-6 mr-3" />}
    {children}
  </button>
);

export const ButtonReturn = ({ onClick }: { onClick?: () => void}) => (
  <button onClick={onClick} className="absolute -top-3 left-0 flex items-center text-[#cbda3d] hover:text-white transition-all focus:text-[#ffffff]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">  
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    <span className="ml-2 text-sm">Regresar</span>
  </button>
);
