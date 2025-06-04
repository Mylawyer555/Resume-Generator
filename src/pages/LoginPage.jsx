import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth} from "../context/AuthContext"

const LoginPage = () => {
    const { user, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues:{
        email:"",
        password:""
    }
  });

//   useEffect(() => {
//     if(user){
//        navigate('/bui'); 
//     }else{
//         navigate('/login');
//     }
//   },[user, navigate]);


  const onSubmit = (loginData) => {
   try {
     setIsLoading(true);
       
     // check if user exist
     const Users = JSON.parse(localStorage.getItem("users")) || [];

     const matchUserDetails = Users.find(user => user.email === loginData.email && user.password === loginData.password );

     if (matchUserDetails) {
        localStorage.setItem("clients", JSON.stringify(matchUserDetails));
        login(matchUserDetails);
        setTimeout(() =>{
            reset();
            toast.success("Login successful!")
            setIsLoading(false);
            navigate("/")
        }, 2000)
     }else {
        setIsLoading(false)
        toast.error("Invalid email or password");
        
     }
   } catch (error) {
        console.error("Login failed:", error);
        toast.error("Failed to log in");
   }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
                {...register("password", {required:"Password is required", minLength:{
                    value:5,
                    message:"Password must be at least 5 characters"
                }})}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition font-medium"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
