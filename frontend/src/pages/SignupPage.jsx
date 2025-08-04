import React, { useState } from "react";
import { Link } from "react-router";
import useSignup from "../hooks/auth/useSignup";

const SignupPage = () => {
  const { signupmutate } = useSignup();
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
    <div className="h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden items-center">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="form-control space-y-1">
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

            <div className="form-control space-y-1">
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

            <div className="form-control space-y-1">
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
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/svgs/to-do-list-animate.svg"
                alt="To-do list illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Stay organized and productive</h2>
              <p className="opacity-70">
                Manage your tasks efficiently and achieve your goals with our intuitive to-do system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
