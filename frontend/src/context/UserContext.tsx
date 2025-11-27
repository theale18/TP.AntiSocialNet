import { createContext, useState, ReactNode } from "react";

export interface User {
  id: number;
  nickName: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

//_____________________________EL CONTEXTO NO DEBE SER NULL_________________________________________________________________________
//               sino que debe tener un valor default seguro

export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}