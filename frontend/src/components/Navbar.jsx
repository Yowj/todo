import React from "react";
import { Link } from "react-router";
import { LogOut, Sun, Moon, Check } from "lucide-react";
import useLogout from "../hooks/auth/useLogout";

const Navbar = () => {
  const { logoutmutate } = useLogout();

  const [currentTheme, setCurrentTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <div className="h-16 navbar bg-base-100 border-b border-base-200 px-6 md:px-12 lg:px-24 flex items-center justify-between">
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg">TaskFlow</span>
      </Link>

      <div className="flex items-center gap-2">
        <button
          className="btn btn-ghost btn-circle btn-sm"
          onClick={toggleTheme}
          aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
        >
          {currentTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          className="btn btn-ghost btn-sm gap-2"
          onClick={logoutmutate}
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
