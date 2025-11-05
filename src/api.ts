import { User } from "./types";

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