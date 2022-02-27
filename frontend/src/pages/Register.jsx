import {useState} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, email, password, passwordConfirmation].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true,
            });
            return;
        }

        if (password !== passwordConfirmation) {
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error: true,
            });
            return;
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'La contraseña debe tener al menos 6 caracteres',
                error: true,
            });
            return;
        }

        setAlerta({});

        try {
            await clienteAxios.post('/veterinarios', {
                nombre,
                email,
                password
            });
            setAlerta({
                msg: 'Registro exitoso, revisa tu correo para activar tu cuenta',
                error: false,
            });
        } catch (error) {
            setAlerta({
                msg: 'El correo ya está registrado',
                error: true,
            });
        }
    };

    const {msg} = alerta;

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>
                    Crea tu cuenta y administra tus <span className='text-black'>pacientes</span>
                </h1>
            </div>

            <div className='mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                        <input
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            id='nombre'
                            type='text'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder='Ingrese su nombre'
                        />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Ingrese su email'
                        />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                        <input
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Ingrese su password'
                        />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Confirmar Password</label>
                        <input
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            id='passwordConfirmation'
                            type='password'
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder='Reingrese su password'
                        />
                    </div>
                    <input
                        type='submit'
                        value='Registrarme'
                        className='bg-indigo-700 w-full hover:cursor-pointer hover:bg-indigo-800 text-white uppercase font-bold py-3 px-10 mt-5 md:w-auto rounded-xl'
                    />
                </form>

                <nav className='mt-10'>
                    <ul className='flex justify-between'>
                        <li className='text-gray-600 font-bold text-xl'>
                            <Link to='/'>Ya tienes una cuenta? Inicia sesion</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Register;
