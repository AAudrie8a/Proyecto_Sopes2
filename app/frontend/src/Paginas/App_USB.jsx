import { useEffect, useState } from 'react';
import { Greet } from "../../wailsjs/go/main/App";
import './styles/App_USB.css'
import Menu from '../Componentes/Menu';



function App_USB() {
    const [myState, setMyState] = useState(true);
    const [nameButton, setNameButton] = useState('Desbloquear Puertos');
    const [txtEstado, setTxtEstado] = useState(String);
    const [showButton, setShowButton] = useState(true);
    const [formData, setFormData] = useState({
        user: '',
        password: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Aquí puedes enviar los datos de inicio de sesión al servidor
        // y realizar la autenticación
        if (formData.user == "audrie8a" && formData.password == "1234.") {
            alert("Desbloqueando");
            Greet(true).then((result) => setTxtEstado(result));//Desbloqueado
            setShowButton(true);
            setFormData({
                user: '',
                password: ''
            });
        } else {
            alert("Error al ingresar usuario y Contraseña.")
        }
        console.log(formData);
    };

    useEffect(() => {
        Greet(false).then((result) => setTxtEstado(result));//Bloqueado
    }, []);

    const changeState = () => {

        setMyState(!myState);
        if (myState) {
            setNameButton('Bloquear Puertos');
            setShowButton(false);
        } else {
            setNameButton('Desbloquear Puertos');
            Greet(myState).then((result) => setTxtEstado(result)); //Bloqueado
        }

    }
    return (
        <div>
            <Menu Tipo={2} />
            <div>
                {showButton &&
                    <div className='Botones2'>
                        <h1>{txtEstado}</h1>
                        <button onClick={changeState}>{nameButton}</button>
                    </div>}
            </div>

            <div>
                {!showButton &&
                    (<div className="login-container">
                        <h1>Iniciar Sesión</h1>
                        <form className='Form_Login' onSubmit={handleSubmit}>
                            <div className='Input_Data'>
                                <label>
                                    Email:
                                </label>
                                <input type="user" name="user" value={formData.user} onChange={handleChange} />
                            </div>
                            <div className='Input_Data'>
                                <label>
                                    Contraseña:
                                </label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                            </div>


                            <button type="submit">Desbloquear</button>
                        </form>
                    </div>)}
            </div>

        </div>
    );
}

export default App_USB;