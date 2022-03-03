import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    const {msg} = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true,
            });
            return;
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/login', {
                email,
                password,
            });
            localStorage.setItem('token', data.token);
            navigate('/admin');
        } catch (error) {
            setAlerta({
                msg: 'El correo o la contraseña son incorrectos',
                error: true,
            });
        }
    };

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>
                    Inicia sesion y administra tus <span className='text-black'>pacientes</span>
                </h1>
            </div>

            <div className='mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Ingrese su email'
                            required
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
                            required
                        />
                    </div>
                    <input
                        type='submit'
                        value='Iniciar sesion'
                        className='bg-indigo-700 w-full hover:cursor-pointer hover:bg-indigo-800 text-white uppercase font-bold py-3 px-10 mt-5 md:w-auto rounded-xl'
                    />
                </form>

                <nav className='mt-10'>
                    <ul className='flex justify-between'>
                        <li className='text-gray-600 font-bold text-xl'>
                            <Link to='olvide-password'>Olvidaste tu contraseña?</Link>
                        </li>
                        <li className='text-gray-600 font-bold text-xl'>
                            <Link to='/registro'>Crear una cuenta</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Login;
