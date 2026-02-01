import { Navigate } from "react-router";
import useAuthUser from "../hooks/auth/useAuth";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return <LoadingScreen />;

  if (!authUser) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
