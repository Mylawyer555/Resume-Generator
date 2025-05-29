import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import TemplatesPage from "./pages/TemplatePage";
import ResumePage from "./pages/ResumePage";
import { useResume } from "./context/ResumeContext";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import CoverLetterEditor from "./pages/CoverletterEditor";
import Faq from "./pages/Faq";
import { AuthProvider } from "./context/AuthContext";
import { ResumeProvider } from "./context/ResumeContext";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/templates",
    element: <TemplatesPage />,
  },
  {
    path: "/build",
    element: <ResumePage />,
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
    path: "/cover-letter",
    element: <CoverLetterEditor />,
  },
  {
    path: "/faq",
    element: <Faq />,
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
