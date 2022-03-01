import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const {token} = useParams();

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios.get(`/veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg: 'ingrese su nueva contraseña',
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'El enlace es invalido o ha expirado',
                    error: true,
                });
            }
        };
        comprobarToken();
    }, []);

    const {msg} = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        try {
            const {data} = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, {password});
            setAlerta({
                msg: 'Contraseña actualizada correctamente',
                error: false,
            });
            setPasswordModificado(true);
        } catch (error) {
            setAlerta({
                msg: 'Error al actualizar la contraseña',
                error: true,
            });
        }
    };

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>
                    Reestablece tu contraseña y no pierdas el acceso a tus <span className='text-black'>pacientes</span>
                </h1>
            </div>

            <div className='mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta alerta={alerta} />}
                {tokenValido && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className='my-5'>
                                <label className='uppercase text-gray-600 block text-xl font-bold'>Nueva contraseña</label>
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
                                <label className='uppercase text-gray-600 block text-xl font-bold'>Confirmar nueva contraseña</label>
                                <input
                                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                                    id='passwordConfirmation'
                                    type='password'
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    placeholder='Reingrese su password'
                                />
                            </div>
                            {!passwordModificado && (
                                <input
                                    type='submit'
                                    value='Guardar nueva contraseña'
                                    className='bg-indigo-700 w-full hover:cursor-pointer hover:bg-indigo-800 text-white uppercase font-bold py-3 px-10 mt-5 md:w-auto rounded-xl'
                                />
                            )}
                        </form>
                    </>
                )}
                {passwordModificado && (
                    <nav className='mt-10'>
                        <ul className='flex justify-between'>
                            <li className='bg-indigo-700 w-full hover:cursor-pointer hover:bg-indigo-800 text-white uppercase font-bold py-3 px-10 mt-5 md:w-auto rounded-xl'>
                                <Link to='/'> Inicia sesion</Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
};

export default NewPassword;
