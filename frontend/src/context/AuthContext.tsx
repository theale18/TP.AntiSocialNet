import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import { fetchUsers, createUser } from '../api/api';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);


//_____________________________CARGAR USUARIO_________________________________________________________________________

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al cargar usuario desde localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (nickName: string, password: string): Promise<boolean> => {
    try {

//_____________________________VALIDAR CONTRASEÑA_________________________________________________________________________
      if (password !== '123456') {
        return false;
      }

//_____________________________VERIFICA EL USUARIO (EL LA API)_________________________________________________________________________

      const users = await fetchUsers();
      const foundUser = users.find(
        (u) => u.nickName.toLowerCase() === nickName.toLowerCase()
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (nickName: string, email: string): Promise<{ success: boolean; message?: string }> => {
    try {

//_____________________________EL USUARIO EXISTE ?_________________________________________________________________________
      const users = await fetchUsers();
      const existingUser = users.find(
        (u) => u.nickName.toLowerCase() === nickName.toLowerCase()
      );

      if (existingUser) {
        return { success: false, message: 'El nombre de usuario ya está en uso' };
      }

//_____________________________CREAR USUARIO_________________________________________________________________________

      const newUser = await createUser(nickName, email);
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true };
    } catch (error: any) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'No se pudo crear el usuario. Intenta nuevamente.' 
      };
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
