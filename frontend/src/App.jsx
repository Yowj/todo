import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import useAuthUser from "./hooks/auth/useAuth";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return <LoadingScreen />;

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/app" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/app" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
