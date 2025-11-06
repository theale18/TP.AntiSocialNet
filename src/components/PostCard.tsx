import React from "react";
import { Post } from "../types";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const image = post.images?.[0]?.imageUrl;
  const commentCount = post.comments?.length ?? 0;

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      background: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }}>
      {image && (
        <img
          src={image}
          alt="Post"
          style={{ width: "100%", borderRadius: 6, marginBottom: 8, objectFit: "cover" }}
        />
      )}
      <p style={{ fontSize: 16 }}>{post.description}</p>

      {post.tags && post.tags.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {post.tags.map(tag => (
            <span
              key={tag.id}
              style={{
                background: "#eef",
                color: "#334",
                padding: "4px 8px",
                borderRadius: 4,
                fontSize: 12,
                marginRight: 6
              }}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      <div style={{ marginTop: 10, fontSize: 14, color: "#555" }}>
        💬 {commentCount} comentario{commentCount !== 1 ? "s" : ""}
      </div>

      <Link
        to={`/post/${post.id}`}
        style={{
          display: "inline-block",
          marginTop: 10,
          background: "#007bff",
          color: "white",
          padding: "6px 12px",
          borderRadius: 4,
          textDecoration: "none"
        }}
      >
        Ver más →
      </Link>
    </div>
  );
}
