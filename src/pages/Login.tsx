import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserByNick } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/");  //  REDIRIGE SI YA ESTA LOGUEADO
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

// VALIDACIONES SIMPLES
    if (!nickName.trim()) {
      setError("El nick es requerido.");
      return;
    }
    if (!password) {
      setError("La contraseña es requerida.");
      return;
    }

    setLoading(true);
    try {
      const found = await fetchUserByNick(nickName.trim());
      if (!found) {
        setError("Usuario no encontrado.");
        return;
      }

//  CONTRASEÑA SIMULADA FIJA
      const FIXED_PASSWORD = "123456";
      if (password !== FIXED_PASSWORD) {
        setError("Contraseña incorrecta.");
        return;
      }

// LOGIN EXITOSO: guarda en contexto y localStorage (AuthProvider lo maneja)
      login(found);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Error al comunicarse con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: "1rem", border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="nick">NickName</label>
          <input
            id="nick"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="Tu nick"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="pass">Contraseña</label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='la contraseña fija es "123456"'
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Validando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
