import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register, handleSubmit, reset,formState:{isValid, errors}
  } = useForm({
   mode:"onChange",
  });

  const onSubmit = (newUser) => {
    try {
        setIsLoading(true);
        
        // getting existing user from local storage
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // check if email exist
        const emailExist = existingUsers.some((user) => user.email === newUser.email);
        if (emailExist){
            toast.error("Email already registered, Please login");
            setIsLoading(false)
            return;
        }

        // add new user to the list and save to localstorage
        const updateUsers = [...existingUsers, newUser ];
        localStorage.setItem("users", JSON.stringify(updateUsers));

        // notify success
        toast.success("Account created successfully");
        setTimeout(() => {
            reset();
            navigate("/login");
        }, 2000)
    } catch (error) {
        console.log(error);
        toast.error("Failed to register user")
    }finally{
        setIsLoading(false);
    }
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
              {...register("name", {required:"Fullname is required"})}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {required:"email is required", pattern:{value: /^\S+@\S+$/i, message:"invalid email address"}})}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password",{required:"Password is required", 
                minLength:{
                    value:5,
                    message:"password must be atleast 5 characters"
                }})}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition font-medium disabled:bg-yellow-200 disabled:cursor-not-allowed`}
          >
            {isLoading ? "Registering...": "Register"}
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
