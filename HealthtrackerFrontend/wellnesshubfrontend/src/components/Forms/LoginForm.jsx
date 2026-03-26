import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "../Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ FIXED HERE
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        data
      );

      const { token, id } = response.data; // 👈 token + id

      localStorage.setItem("token", token);
      localStorage.setItem("userId", id); // 👈 VERY IMPORTANT

      window.dispatchEvent(new Event("authChanged"));

      toast.success("Login successful!");
      navigate("/userprofile");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        transition={Slide}
      />

      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center items-center">
          <h1 className="text-5xl font-bold text-blue-600">WellnessHub</h1>
        </div>

        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            "Know your numbers, know your results"
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Input
                label="Email:"
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is Required",
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be valid",
                  },
                })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Password"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            New to WellnessHub?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}