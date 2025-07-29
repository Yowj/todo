import React, { useState } from "react";
import { Link } from "react-router";
import useSignup from "../hooks/auth/useSignup";

const SignupPage = () => {
  const { signupmutate} = useSignup();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    signupmutate({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-3xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                required
                autoFocus
              />
            </div>

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
              <button onClick={handleSignup} className="btn btn-primary w-full">
                Sign Up
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="link link-hover link-primary"> Login</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
