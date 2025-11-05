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
