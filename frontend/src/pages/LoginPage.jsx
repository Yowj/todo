import React, { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/auth/useLogin";

const LoginPage = () => {
  const { loginmutate, data, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginmutate({ email: formData.email, password: formData.password });
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-3xl">
        <div className="card-body">
          <h2 className=" text-2xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
                autoFocus
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button onClick={handleLogin} className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>

          <div className="divider">OR</div>
          <Link to="/signup">
            <p className="text-center link link-hover link-primary">Create an account </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
