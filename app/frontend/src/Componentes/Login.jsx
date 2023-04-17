import React, { useState } from 'react';
import { Link /*useHistory */} from 'react-router-dom';
import './styles/Login.css'; // Importar archivo CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // const history = useHistory();

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
    console.log(formData);
    // Luego puedes redirigir al usuario a otra página
    // history.push('/USB');
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>.</p>
    </div>
  );
};

export default Login;
