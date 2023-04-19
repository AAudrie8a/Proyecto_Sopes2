import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from './Paginas/Inicio';
import App from "./Paginas/App";
import App_USB from "./Paginas/App_USB";
import Inicio_Sesion from "./Paginas/InicioSesion";
// import Login from "./Componentes/Login"
function Rutas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Inicio_Sesion />} />
                <Route path="/graficas" element={<App />} />
                <Route path="/USB" element={<App_USB />} />
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;