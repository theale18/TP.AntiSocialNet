import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api";
import { Post } from "../types";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data.reverse()); // PUBLICACIONES RECIENTES PRIMERO
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando publicaciones...</p>;
  if (error) return <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      {/* Banner o cabecera */}
      <section style={{ textAlign: "center", marginBottom: 32 }}>
        <h1>UnaHur Anti-Social Net 🕸️</h1>
        <p style={{ color: "#555" }}>
          La red donde compartimos menos y discutimos más.
        </p>
        <hr style={{ margin: "1.5rem 0" }} />
      </section>

      {/* Feed de publicaciones */}
      <section>
        <h2>Publicaciones recientes</h2>
        {posts.length === 0 ? (
          <p>No hay publicaciones disponibles.</p>
        ) : (
          posts.map(p => <PostCard key={p.id} post={p} />)
        )}
      </section>

      {/* Sección libre adicional */}
      <section style={{ marginTop: 40, background: "#f8f8f8", padding: "1.5rem", borderRadius: 8 }}>
        <h3>Sobre nosotros</h3>
        <p>
          En <strong>UnaHur Anti-Social Net</strong> creemos que no todo tiene que ser perfecto.
          Aquí se valora el sarcasmo, los debates innecesarios y las opiniones contradictorias.
        </p>
        <blockquote style={{ fontStyle: "italic", color: "#666", marginTop: 10 }}>
          “No se trata de tener razón, sino de tener un buen meme.”
        </blockquote>
      </section>
    </div>
  );
}
