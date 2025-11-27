import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import '../styles/AuthPages.css';

const Login = () => {
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

//_____________________________LAS VALIDACIONES_________________________________________________________________________
    if (!nickName.trim()) {
      setError('Por favor ingresa tu nombre de usuario');
      return;
    }

    if (!password) {
      setError('Por favor ingresa tu contraseña');
      return;
    }

    setLoading(true);

    try {
      const success = await login(nickName, password);

      if (success) {
        navigate('/');
      } else {
        setError('Credenciales incorrectas. Verifica tu usuario y contraseña (123456)');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
//_____________________________HTML_________________________________________________________________________
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">INICIAR SESION</h1>
        <p className="auth-subtitle"></p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nickName" className="form-label">
              Ingresar Nombre de Usuario
            </label>
            <input
              type="text"
              id="nickName"
              className="form-input"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="Tu nickname"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Ingresar Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              disabled={loading}
            />
            <small className="form-hint">Contraseña Predeterminada: 123456</small>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Necesitas una Cuenta? <Link to="/registro" className="auth-link">REGISTRATE AQUI</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

