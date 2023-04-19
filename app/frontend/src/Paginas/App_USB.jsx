import { useEffect, useState } from 'react';
import { Greet } from "../../wailsjs/go/main/App";
import Menu from '../Componentes/Menu';



function App_USB() {
    const [myState, setMyState] = useState(true);
    const [nameButton, setNameButton] = useState('Desbloquear Puertos');
    const [txtEstado, setTxtEstado] = useState(String);

    

    const changeState = () => {

        setMyState(!myState);
        if (myState) {
            setNameButton('Bloquear Puertos');
            Greet(myState).then((result)=> setTxtEstado(result));//Bloqueado
      
        } else {
            setNameButton('Desbloquear Puertos');
            Greet(myState).then((result)=> setTxtEstado(result)); //Desploqueado
        }

    }
    return (
        <div>
            <Menu Tipo={2} />
            <h1>{txtEstado}</h1>
            <button onClick={changeState}>{nameButton}</button>
        </div>
    );
}

export default App_USB;