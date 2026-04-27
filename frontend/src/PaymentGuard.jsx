// PaymentGuard.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

function PaymentGuard({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (!user.isSubscribed) {
    return <Navigate to="/pricing" />;
  }

  return children;
}

export default PaymentGuard;