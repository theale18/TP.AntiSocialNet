import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NavBar } from "./components/NavBar";
import  Home  from "./pages/Home";
import  Login  from "./pages/Login";
import  Register  from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

{/*_______________________________________________________________Rutas protegidas___________________________________________*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            {/* /create, /post/:id, etc. */}
          </Route>

          <Route path="/post/:id" element={<PostDetail />} />


          <Route element={<ProtectedRoute />}>
            <Route path="/crear-post" element={<CreatePost />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<div style={{ padding: "1rem" }}>No encontrado</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
