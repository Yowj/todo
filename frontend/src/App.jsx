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
        <Route path="/" element={authUser ? <Home /> : <LandingPage />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
