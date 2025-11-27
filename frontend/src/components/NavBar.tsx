import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="unahur-navbar">
      <div className="brand">
        <Link to="/">Anti-Social-Net</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!user ? (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Perfil</Link>
            <Link to="/crear-post">Crear Publicación</Link>
            <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  );
};
