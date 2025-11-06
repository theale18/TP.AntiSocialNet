import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchTags, createPost, createPostImage } from "../api";
import { Tag } from "../types";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    loadTags();
  }, []);

  const handleAddImageField = () => setImageUrls([...imageUrls, ""]);
  const handleChangeImage = (i: number, value: string) => {
    const updated = [...imageUrls];
    updated[i] = value;
    setImageUrls(updated);
  };

  const handleTagChange = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("La descripción es obligatoria");
      return;
    }
    if (!user) {
      setError("Debes estar logueado");
      return;
    }

    setError(null);
    setLoading(true);

    try {
// CREAR POST PRINCIPAL
      const newPost = await createPost(description, user.id, selectedTags);

// AGREGAR IMAGENES
      const validUrls = imageUrls.filter((url) => url.trim() !== "");
      for (const url of validUrls) {
        await createPostImage(url, newPost.id);
      }

// MOSTRAR CONFIRMACION
      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>No estás logueado.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Nueva Publicación</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Descripción *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ width: "100%", padding: 8 }}
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>URLs de Imágenes</label>
          {imageUrls.map((url, i) => (
            <input
              key={i}
              type="url"
              value={url}
              onChange={(e) => handleChangeImage(i, e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              style={{ width: "100%", marginBottom: 6, padding: 8 }}
            />
          ))}
          <button type="button" onClick={handleAddImageField}>
            + Agregar otra URL
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Etiquetas</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                />{" "}
                {tag.name}
              </label>
            ))}
          </div>
        </div>

        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>¡Publicación creada!</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "8px 14px",
          }}
        >
          {loading ? "Creando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
}
