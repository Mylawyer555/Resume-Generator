import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";


const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (newUser) => { // Made onSubmit async for potential future API calls
    try {
      setIsLoading(true);

      // Getting existing user from local storage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email exists
      const emailExist = existingUsers.some(
        (user) => user.email === newUser.email
      );
      if (emailExist) {
        toast.error("Email already registered, Please login");
        setIsLoading(false);
        return;
      }

      // Add new user to the list and save to localstorage
      const updateUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updateUsers));

      // Notify success
      toast.success("Account created successfully");
      setTimeout(() => {
        reset();
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error); // Use console.error for errors
      toast.error("Failed to register user");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Fullname is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password field with toggle */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1"> {/* Add relative positioning here */}
              <input
                id="password"
                // Dynamically set type based on showPassword state
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 pr-10" // Add pr-10 for icon space
              />
              {/* Eye Icon */}
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {/* Replace with actual eye icons if you have an icon library */}
                {showPassword ? (
                  <FiEye className="w-5 h-5 text-gray-500" />

                ) : (
                  <FiEyeOff className="w-5 h-5 text-gray-500" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition font-medium disabled:bg-yellow-200 disabled:cursor-not-allowed`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;