import React from "react";
import { Link, useLocation } from "react-router";
import { LogOut, Sun, Moon, Check } from "lucide-react";
import useLogout from "../hooks/auth/useLogout";
import useAuthUser from "../hooks/auth/useAuth";

const Navbar = () => {
  const { logoutmutate } = useLogout();
  const { authUser } = useAuthUser();
  const location = useLocation();

  const isLandingPage = location.pathname === "/" && !authUser;
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  // Hide navbar on auth pages (they have their own styling)
  if (isAuthPage) {
    return null;
  }

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const getCurrentTheme = () => {
    return document.documentElement.getAttribute("data-theme") || "dark";
  };

  const [currentTheme, setCurrentTheme] = React.useState(getCurrentTheme);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const handleThemeToggle = () => {
    toggleTheme();
    setCurrentTheme(getCurrentTheme());
  };

  // Landing page navbar (dark glassmorphism style)
  if (isLandingPage) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">TaskFlow</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // App navbar (for authenticated users and auth pages)
  return (
    <div className="h-16 navbar bg-base-100 border-b border-base-200 px-6 md:px-12 lg:px-24 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg">TaskFlow</span>
      </Link>

      <div className="flex items-center gap-2">
        <button
          className="btn btn-ghost btn-circle btn-sm"
          onClick={handleThemeToggle}
          title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
        >
          {currentTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {authUser ? (
          <button
            className="btn btn-ghost btn-sm gap-2"
            onClick={logoutmutate}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Log in
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
