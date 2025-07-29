import { Router } from "lucide-react";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import useAuthUser from "./hooks/auth/useAuth";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
