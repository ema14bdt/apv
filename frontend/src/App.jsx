import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmAccount from './pages/ConfirmAccount';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path='registro' element={<Register />} />
                    <Route path='confirmar/:token' element={<ConfirmAccount />} />
                    <Route path='olvide-password' element={<ForgotPassword />} />
                    <Route path='olvide-password/:token' element={<NewPassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
