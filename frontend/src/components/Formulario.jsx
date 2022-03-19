import {useState, useEffect} from 'react';
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const {guardarPaciente, paciente} = usePacientes();
    
    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if([
            nombre.trim(),
            propietario.trim(),
            email.trim(),
            sintomas.trim()
        ].some(campo => campo === '')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            id
        });

        setAlerta({
            msg: 'Paciente guardado correctamente',
        });

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null);
    }

    const {msg} = alerta;

    return (
        <>
            <h2 className='font-black text-2xl text-center'>Administrador de Pacientes</h2>
            <p className='text-lg mt-5 mb-10 text-center'>
                Agrega tus pacientes y <span className='text-indigo-600 font-bold'>Administralos</span>
            </p>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label className='block text-gray-700 uppercase text-sm font-bold mb-2' htmlFor='nombre'>
                        Nombre Mascota
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='nombre'
                        type='text'
                        placeholder='Nombre Mascota'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='block text-gray-700 uppercase text-sm font-bold mb-2' htmlFor='propietario'>
                        Nombre Propietario
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='propietario'
                        type='text'
                        placeholder='Nombre Propietario'
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='block text-gray-700 uppercase text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='block text-gray-700 uppercase text-sm font-bold mb-2' htmlFor='fecha'>
                        Fecha Alta
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='fecha'
                        type='date'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='block text-gray-700 uppercase text-sm font-bold mb-2' htmlFor='sintomas'>
                        Sintomas
                    </label>
                    <textarea
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='sintomas'
                        placeholder='Ingrese los sintomas'
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                {msg && <Alerta alerta={alerta} />}
                <div className='flex items-center justify-between'>
                    <input
                        className='bg-indigo-600 transition-colors hover:bg-indigo-800 uppercase cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                        value={id ? 'Editar Paciente' : 'Agregar Paciente'}
                    />
                    <input
                        className='bg-red-500 transition-colors hover:bg-red-700 uppercase cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='button'
                        onClick={() => setId(null)}
                        value='Cancelar'
                    />
                </div>
            </form>
        </>
    );
};

export default Formulario;
