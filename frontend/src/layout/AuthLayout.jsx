import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
       <h1>APV - Administrador de Pacientes y Veterinarios</h1> 
         <Outlet />
    </>
  )
}

export default AuthLayout