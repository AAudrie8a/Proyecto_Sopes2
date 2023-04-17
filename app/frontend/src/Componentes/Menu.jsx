import * as React from 'react';
import "./styles/Menu.css"
import { Link } from 'react-router-dom';


export default function Menu() {
    return (
        <div className='Menu'>
            <div className='Encabezado'>
                <h1>Proyecto SOPES 2</h1>
            </div>
            <div className='Botones'>
                <Link style={{ textDecoration: 'none', color: '#fff' }} to="/graficas"><button className='Data' > Graficas</button></Link>
                <Link style={{ textDecoration: 'none', color: '#fff' }} to="/login"><button className='Login' >Login</button></Link>
            </div>
        </div>
    );
}