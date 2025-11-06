import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import NewPost from "./pages/NewPost";
// function Home() {
//   const { user, logout } = useAuth();
//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Home - UnaHur</h1>
//       {user ? (
//         <>
//           <p>Bienvenido, <strong>{user.nickName}</strong></p>
//           <button onClick={logout}>Cerrar sesión</button>
//         </>
//       ) : (
//         <p>No estás logueado. <Link to="/login">Entrar</Link></p>
//       )}
//       <p><Link to="/protected">Ir a ruta protegida</Link></p>
//     </div>
//   );
// }

function ProtectedPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Contenido protegido</h2>
      <p>Solo visible para usuarios logueados.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  
          <Route path="/" element={<Home />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-post"
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
