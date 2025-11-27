import { JSX, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const context = useContext(UserContext);

  if (!context) return null;

  const { user } = context;

  return user ? children : <Navigate to="/login" />;
}
