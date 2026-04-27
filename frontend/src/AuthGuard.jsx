// AuthGuard.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

function AuthGuard({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthGuard;