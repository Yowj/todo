import React from "react";
import { LogOut, Sun, Moon } from "lucide-react";
import useLogout from "../hooks/auth/useLogout";

const Navbar = () => {
  const { logoutmutate } = useLogout();

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Get current theme for icon display
  const getCurrentTheme = () => {
    return document.documentElement.getAttribute("data-theme") || "light";
  };

  const [currentTheme, setCurrentTheme] = React.useState(getCurrentTheme);

  React.useEffect(() => {
    // Load saved theme on component mount
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const handleThemeToggle = () => {
    toggleTheme();
    setCurrentTheme(getCurrentTheme());
  };

  return (
    <div className=" h-16 navbar bg-base-200 shadow-lg px-14 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-primary">My Todo App</h1>
      </div>

      <div className="flex gap-7">
        {/* Theme Toggle Button */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={handleThemeToggle}
          title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
        >
          {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Logout Button */}
        <button className="btn btn-ghost btn-circle" onClick={logoutmutate} title="Logout">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
