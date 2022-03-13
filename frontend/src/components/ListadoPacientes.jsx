import usePacientes from '../hooks/usePacientes';
import Paciente from './Paciente';

const ListadoPacientes = () => {
    const {pacientes} = usePacientes();
    return (
        <>
            {pacientes ? (
                <>
                    <h2 className='font-black text-2xl text-center'>Listado Pacientes</h2>
                    <p className='text-lg mt-5 mb-10 text-center'>
                        Administra tus <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
                    </p>
                    {pacientes.map((paciente) => (
                        <Paciente
                            key={paciente.id}
                            paciente={paciente}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className='font-black text-2xl text-center'>No hay Pacientes</h2>
                    <p className='text-lg mt-5 mb-10 text-center'>
                        Comienza agregando pacientes y apareceran <span className='text-indigo-600 font-bold'>aqui</span>
                    </p>
                </>
            )}
        </>
    );
};

export default ListadoPacientes;
