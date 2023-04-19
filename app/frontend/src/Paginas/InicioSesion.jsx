import { useEffect, useState } from 'react';
import Menu from '../Componentes/Menu';
import Login from '../Componentes/Login';

function Inicio_Sesion(){
    return(
        <div>
            <Menu/>
            <Login/>
        </div>
    );
}

export default Inicio_Sesion;