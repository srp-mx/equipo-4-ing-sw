import { useState } from "react";

type contentInput = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: React.HTMLInputTypeAttribute;
    contentText?: string;
};

export const Input = ({ value, onChange, type = "text", contentText }: contentInput) => {
    return (
        <div className="relative flex mb-4">
            <input
            type={type}
            className="peer block w-full px-3 py-2 text-sm text-white bg-transparent border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d]"
            placeholder=" "
            value={value}
            onChange={onChange}
            required
            />
            <label className="absolute pointer-events-none text-sm text-transparent transform scale-50 top-1/6 left-3 -translate-y-1/6 transition-all duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#cbda3d] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#cbda3d]" htmlFor={type}>{contentText}</label>
        </div>
    );
}

export const PasswordInput = ({ value, onChange , type = "text" }: contentInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={showPassword ? type : "password"}
        className="mb-6 peer block w-full px-3 py-2 text-sm text-white bg-transparent border-2 border-[#cbda3d] rounded-md focus:outline-none focus:border-[#cbda3d] "
        placeholder=""
        value={value}
        onChange={onChange}
        required
      />
      <label className="absolute text-sm pointer-events-none text-transparent transform scale-50 top-1/3 left-3 -translate-y-1/6 transition-all duration-300 peer-placeholder-shown:top-1/4 peer-placeholder-shown:left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-[#cbda3d] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#cbda3d]">Contraseña</label>
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
