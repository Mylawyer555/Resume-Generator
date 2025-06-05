import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ResumePage from "./pages/ResumePage";
import { useResume } from "./context/ResumeContext";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import CoverLetterEditor from "./pages/CoverletterEditor";
import { AuthProvider } from "./context/AuthContext";
import { ResumeProvider } from "./context/ResumeContext";
import { ToastContainer } from "react-toastify";
import ClassicTemplate from "./components/tem/classic";
import ModernTemplate from "./components/tem/Modern";
import FAQPage from "./pages/Faq";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/build",
    element: 
    <ProtectedRoutes>
      <ResumePage />
    </ProtectedRoutes>,
  },
  {
    path:"/cover-letter",
    element: 
    <ProtectedRoutes>
      <CoverLetterEditor/>
    </ProtectedRoutes>
  },


  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
 
  {
    path: "/faq",
    element: <FAQPage />,
  },
  
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProvider>
      <ResumeProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ResumeProvider>
    </AuthProvider>
  </StrictMode>
);
