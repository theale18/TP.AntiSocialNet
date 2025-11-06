import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const STORAGE_KEY = "uh_user";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);