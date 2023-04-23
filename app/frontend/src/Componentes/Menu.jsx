import * as React from 'react';
import "./styles/Menu.css"
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Menu(props) {
    const [showButton, setShowButton] = useState(true);
    const [nameButton, setNameButton] = useState(String);
    const [loginRuta, setLoginRuta] = useState(String);

    React.useEffect(() =>{
        if (props.Tipo ==1){
            setLoginRuta("/login");
            setNameButton("Login");
            setShowButton(true);
        }else{
            setLoginRuta("/logout");
            setNameButton("Logout");
            setShowButton(false);
        }
        
    })
    return (
        <div className='Menu'>
            <div className='Encabezado'>
                <h1>Proyecto SOPES 2</h1>
            </div>
            <div className='Botones'>
                {showButton && (
                <Link style={{ textDecoration: 'none', color: '#fff' }} to="/graficas"><button className='Data' > Graficas</button></Link>
                )}
                <Link style={{ textDecoration: 'none', color: '#fff' }} to={loginRuta}><button className='Login' >{nameButton}</button></Link>
            </div>
        </div>
    );
}