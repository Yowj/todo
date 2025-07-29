import React from "react";
import { LogOut } from "lucide-react";
import useLogout from "../hooks/auth/useLogout";

const Navbar = () => {
  const { logoutmutate } = useLogout();
  return (
    <div className="h-16 bg-base-300 flex justify-between items-center">
      <div>
        <h1>My Todo App</h1>
      </div>
      <div>
        <button className="btn btn-ghost" onClick={logoutmutate}>
          <LogOut />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
