import { User, Post, Comment, Tag } from "./types";

const API_BASE = process.env.PORT || 3001; 
//  "http://localhost:3001" 

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error(`Error fetching users: ${res.status}`);
  return res.json();
}

export async function fetchUserByNick(nickName: string): Promise<User | undefined> {
  const users = await fetchUsers();
  return users.find(u => u.nickName.toLowerCase() === nickName.toLowerCase());
}

// POST -> /users
export async function createUser(newUser: Omit<User, "id">): Promise<User> {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "No se pudo crear el usuario.");
  }

  return res.json();
}

// TRAER TODAS LAS PUBLICACIONES 
// (puede incluir tags e imágenes si el backend lo soporta)
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Error al cargar publicaciones.");
  return res.json();
}

//  OBTENER UN POST POR ID
export async function fetchPostById(id: number): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error("Error al cargar la publicación.");
  return res.json();
}

//  CREAR NUEVO COMENTARIO
export async function createComment(newComment: Omit<Comment, "id">): Promise<Comment> {
  const res = await fetch(`${API_BASE}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "No se pudo agregar el comentario.");
  }

  return res.json();
}

export async function fetchPostsByUser(userId: number): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/users/${userId}/posts`);
  if (!res.ok) throw new Error("Error al cargar las publicaciones del usuario.");
  return res.json();
}

export async function fetchTags(): Promise<Tag[]> {
  const res = await fetch(`${API_BASE}/tags`);
  if (!res.ok) throw new Error("Error al cargar etiquetas");
  return res.json();
}

export async function createPost(description: string, userId: number, tagIds: number[]): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, userId, tags: tagIds }),
  });
  if (!res.ok) throw new Error("No se pudo crear el post");
  return res.json();
}

export async function createPostImage(url: string, postId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/postimages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, postId }),
  });
  if (!res.ok) throw new Error("No se pudo agregar una imagen");
}
