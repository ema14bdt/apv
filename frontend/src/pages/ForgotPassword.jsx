import {useState} from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || email === undefined) {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true,
            });
            return;
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password', {
                email,
            });
            setAlerta({
                msg: `Se ha enviado un correo a ${email} con las instrucciones para recuperar tu contraseña`,
                error: false,
            });
        } catch (error) {
            setAlerta({
                msg: 'El email no está registrado',
                error: true,
            })
        }
    };

    const {msg} = alerta;

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>
                    Recupera tu acceso y no pierdas tus <span className='text-black'>pacientes</span>
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
                    <input
                        type='submit'
                        value='Recuperar contraseña'
                        className='bg-indigo-700 w-full hover:cursor-pointer hover:bg-indigo-800 text-white uppercase font-bold py-3 px-10 mt-5 md:w-auto rounded-xl'
                    />
                </form>
                <nav className='mt-10'>
                    <ul className='flex justify-between'>
                        <li className='text-gray-600 font-bold text-xl'>
                            <Link to='/'>Recordaste tu contraseña? Inicia sesion</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default ForgotPassword;
