// src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [nickName, setNickName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

//  VALIDACIONES MINIMAS
    if (!nickName.trim() || !name.trim() || !email.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const newUser = await createUser({ nickName, name, email });

      //  OPCIÓN 1: Redirigir al login
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);

      //  OPCIÓN 2 (alternativa): Loguear automáticamente
      // login(newUser);
      // navigate("/", { replace: true });

    } catch (err: any) {
      setError(err?.message ?? "Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: "1rem", border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="nick">NickName</label>
          <input
            id="nick"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="Ej: blume01"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@unahur.edu.ar"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 12 }}>Usuario creado con éxito. Redirigiendo...</div>}

        <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}
