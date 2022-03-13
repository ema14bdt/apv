import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(true)
  return (
    <div className="flex flex-col md:flex-row">
      <button 
        type="button" 
        className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 mb-10 rounded-md md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >{mostrarFormulario ? "Ocultar Formulario" : "Agregar Paciente"}
      </button>
      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:w-1/2 lg:h-2/5`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:h-3/5">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes