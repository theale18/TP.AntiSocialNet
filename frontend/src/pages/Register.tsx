import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import '../styles/AuthPages.css';

const Registro = () => {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

//_____________________________LAS VALIDACIONES_________________________________________________________________________
    if (!nickName.trim()) {
      setError('Se requiere Nombre de Usuario');
      return;
    }

    if (nickName.trim().length < 3) {
      setError('Nombre de Usuario minimo: 3 caracteres');
      return;
    }

    if (!email.trim()) {
      setError('Se requiere Correo/Email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);

    try {
      const result = await register(nickName.trim(), email.trim());

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Error al Crear el Usuario');
      }
    } catch (err) {
      setError('Error al registrarse. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

//_____________________________HTML_________________________________________________________________________
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">CREAR CUENTA</h1>
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
              placeholder="Elige un nickname"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Ingresar Correo
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login" className="auth-link">INICIAR SESION AQUI</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;