import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import WorkPage from './pages/WorkPage';
/*import LandingPage from './pages/LandingPage';
const url = process.env.url || 'http://localhost:3000'

async function validateToken(token : string) : Promise<boolean>{
    try{
        const response = await fetch(`${url}/landing`,{
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })

        return response.status === 200;
    }catch(error){
        console.log(`Error al verificar el token:`,error);
        return false;
    }
}*/

export default function App() {
  /*const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('Token');

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    validateToken(token).then(isValid => {
      setIsAuthenticated(isValid);
    });
  }, []);

  if (isAuthenticated === null) {
    return <div className="flex h-screen items-center justify-center">Cargando...</div>;
  }

  return isAuthenticated ? <LandingPage /> : <Login />;
  return <Login/>;*/
  return <WorkPage/>
}