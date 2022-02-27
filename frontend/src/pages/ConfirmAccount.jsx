import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const ConfirmAccount = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const {token} = useParams();

    useEffect(() => {
        const confirmandoCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${token}`;
                await clienteAxios.get(url);
                setCuentaConfirmada(true);
                setAlerta({
                    msg: 'Cuenta confirmada correctamente',
                    error: false,
                });
            } catch (error) {
                setAlerta({
                    msg: 'El token es inválido o ha expirado',
                    error: true,
                });
            }

            setCargando(false);
        };
        confirmandoCuenta();
    }, []);

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>
                    Confirma tu cuenta y comienza a administrar tus <span className='text-black'>pacientes</span>
                </h1>
            </div>
            <div>
                {!cargando && <Alerta alerta={alerta} />}
                {cuentaConfirmada && (
                    <ul className='flex justify-between'>
                        <li className='text-gray-600 font-bold text-xl'>
                            <Link to='/'>Inicia sesion</Link>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
};

export default ConfirmAccount;
