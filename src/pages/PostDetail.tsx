import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById, createComment } from "../api";
import { Post } from "../types";
import CommentList from "../components/CommentList";
import { useAuth } from "../context/AuthContext";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

//  CARGAR POST COMPLETO
  useEffect(() => {
    const load = async () => {
      try {
        if (!id) return;
        const data = await fetchPostById(Number(id));
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setFeedback("El comentario no puede estar vacío.");
      return;
    }
    if (!post) return;

    setSending(true);
    setFeedback(null);

    try {
      const comment = await createComment({
        content: newComment.trim(),
        postId: post.id,
      });

//  ACTUALIZAR LISTA LOCALMENTE SIN RECARGAR
      setPost({ ...post, comments: [...(post.comments ?? []), comment] });
      setNewComment("");
      setFeedback("Comentario agregado con éxito.");
    } catch (err: any) {
      setFeedback(err?.message ?? "Error al agregar el comentario.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Cargando publicación...</p>;
  if (error) return <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>;
  if (!post) return <p>No se encontró la publicación.</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      <h2>Detalle de publicación</h2>

      {post.images && post.images.length > 0 && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          {post.images.map((img) => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt=""
              style={{ width: "48%", borderRadius: 6, objectFit: "cover" }}
            />
          ))}
        </div>
      )}

      <p style={{ fontSize: 18 }}>{post.description}</p>

      {post.tags && post.tags.length > 0 && (
        <div style={{ margin: "1rem 0" }}>
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              style={{
                background: "#eef",
                color: "#334",
                padding: "4px 8px",
                borderRadius: 4,
                fontSize: 12,
                marginRight: 6,
              }}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      <hr />

      <h3>Comentarios</h3>
      <CommentList comments={post.comments ?? []} />

      <hr />

      {/* formulario */}
      {user ? (
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <label htmlFor="comment">Agregar comentario</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe algo..."
            rows={3}
            style={{ width: "100%", padding: 8, borderRadius: 4, resize: "vertical" }}
          />
          {feedback && (
            <p style={{ color: feedback.includes("éxito") ? "green" : "crimson" }}>{feedback}</p>
          )}
          <button
            type="submit"
            disabled={sending}
            style={{
              background: "#007bff",
              color: "white",
              padding: "8px 12px",
              borderRadius: 4,
              border: "none",
              marginTop: 8,
            }}
          >
            {sending ? "Enviando..." : "Publicar comentario"}
          </button>
        </form>
      ) : (
        <p style={{ color: "#555", marginTop: 16 }}>
          Debes iniciar sesión para comentar
        </p>
      )}
    </div>
  );
}
