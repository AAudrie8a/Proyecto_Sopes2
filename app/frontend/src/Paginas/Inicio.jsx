import * as React from 'react';
import './styles/Inicio.css'
import Menu from '../Componentes/Menu';

export default function Inicio() {
    return (
        <div className='Inicio'>
            <Menu Tipo={1}/>
        </div>
    );
}