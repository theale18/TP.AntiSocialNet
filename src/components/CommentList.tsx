import React from "react";
import { Comment } from "../types";

interface Props {
  comments: Comment[];
}

export default function CommentList({ comments }: Props) {
  if (comments.length === 0) return <p>No hay comentarios todavía.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {comments.map((c) => (
        <li
          key={c.id}
          style={{
            borderBottom: "1px solid #eee",
            padding: "8px 0",
          }}
        >
          <p style={{ margin: 0 }}>{c.content}</p>
        </li>
      ))}
    </ul>
  );
}
