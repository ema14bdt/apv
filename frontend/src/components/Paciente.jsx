import usePacientes from '../hooks/usePacientes';

const Paciente = ({paciente}) => {

    const {setEdicion, eliminarPaciente} = usePacientes();

    const {nombre, propietario, email, fecha, sintomas, _id} = paciente;

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }).format(nuevaFecha);
    }
    return (
        <div className="bg-white shadow-md px-8 pt-6 pb-4 mb-4 mx-5 rounded">
            <p className='block text-gray-700 uppercase text-sm font-bold mb-2'>
                Nombre: <span className='font-normal normal-case'>{nombre}</span>
            </p>
            <p className='block text-gray-700 uppercase text-sm font-bold mb-2'>
                Propietario: <span className='font-normal normal-case'>{propietario}</span>
            </p>
            <p className='block text-gray-700 uppercase text-sm font-bold mb-2'>
                Email: <span className='font-normal normal-case'>{email}</span>
            </p>
            <p className='block text-gray-700 uppercase text-sm font-bold mb-2'>
                Fecha: <span className='font-normal normal-case'>{fecha}</span>
            </p>
            <p className='block text-gray-700 uppercase text-sm font-bold mb-2'>
                Sintomas: <span className='font-normal normal-case'>{sintomas}</span>
            </p>

            <div className="flex justify-between my-5">
                <button 
                    className="bg-indigo-600 transition-colors hover:bg-indigo-800 uppercase text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    onClick={() => setEdicion(paciente)}>
                    Editar
                </button>
                <button 
                className="bg-red-500 transition-colors hover:bg-red-700 uppercase text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button"
                onClick={() => eliminarPaciente(_id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Paciente;
