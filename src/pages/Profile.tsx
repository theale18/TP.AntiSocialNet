import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchPostsByUser } from "../api";
import { Post } from "../types";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        const data = await fetchPostsByUser(user.id);
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <p>No estás logueado.</p>;
  if (loading) return <p>Cargando tus publicaciones...</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Perfil de {user.nickName}</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "crimson",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "6px 12px",
          }}
        >
          Cerrar sesión
        </button>
      </header>

      <hr />

      {posts.length === 0 ? (
        <p>No has publicado nada todavía.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 6,
                marginBottom: 12,
                background: "#fafafa",
              }}
            >
              <p style={{ fontWeight: "bold" }}>{post.description}</p>
              <p style={{ color: "#555" }}>
                Comentarios visibles: {post.comments ? post.comments.length : 0}
              </p>
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  padding: "6px 10px",
                }}
              >
                Ver más
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}