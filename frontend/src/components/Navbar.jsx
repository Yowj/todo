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
    setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="sticky top-0 z-50 h-16 bg-base-100/80 backdrop-blur-lg border-b border-base-200/50 px-6 md:px-12 lg:px-24">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
            <Check className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            TaskFlow
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <button
            className="btn btn-ghost btn-circle btn-sm hover:bg-base-200/80 transition-all duration-200"
            onClick={toggleTheme}
            aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
          >
            <div className="relative w-5 h-5">
              <Sun
                className={`absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                }`}
              />
              <Moon
                className={`absolute inset-0 h-5 w-5 text-indigo-400 transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "-rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
            </div>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-base-300/50 mx-2 hidden sm:block" />

          {/* Logout */}
          <button
            className="btn btn-ghost btn-sm gap-2 hover:bg-error/10 hover:text-error transition-all duration-200 group"
            onClick={logoutmutate}
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
