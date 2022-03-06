import {Outlet, Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {
    const {auth, cargando} = useAuth();
    if (cargando) return 'Cargando...';

    return (
        <>
            <h1>Esta es una ruta protegida</h1>
            {auth?._id ? <Outlet /> : <Navigate to='/' />}
        </>
    );
};

export default RutaProtegida;
