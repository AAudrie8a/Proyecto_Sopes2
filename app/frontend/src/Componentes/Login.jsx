import React, { useState } from 'react';
import './styles/Login.css'; // Importar archivo CSS
import App_USB from '../Paginas/App_USB';
import Menu from '../Componentes/Menu';

const Login = () => {
  const [formData, setFormData] = useState({
    user: '',
    password: ''
  });


  const [showButton, setShowButton] = useState(true);
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
      // window.location.href = "/USB"  //Esto sí funciona, pero no en wails
      setShowButton(false);

    } else {
      alert("Error al ingresar usuario y Contraseña.")
    }
    console.log(formData);
    // Luego puedes redirigir al usuario a otra página
    // history.push('/USB');
  };

  return (
    <div>
      {/* Login */}
      {showButton &&
        <div>
          <Menu Tipo={1}/>
          <div className="login-container">
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


            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
        </div>
        
      }

      {/* Programa USB */}

      {!showButton && <App_USB />}

    </div>

  );
};

export default Login;
