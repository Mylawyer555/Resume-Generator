import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import TemplatesPage from './pages/TemplatePage'
import ResumePage from './pages/ResumePage'
import { useResume } from './context/ResumeContext'
import SignupPage from './pages/Signup'
import LoginPage from './pages/LoginPage'
import CoverLetterEditor from './pages/CoverletterEditor'
import Faq from './pages/Faq'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/templates',
    element: <TemplatesPage/>,
  },
  {
    path: '/build',
    element: <ResumePage/>,
  },
  {
    path:'/signup',
    element: <SignupPage/>
  },
  {
    path:'/login',
    element: <LoginPage/>
  },
  {
    path: '/cover-letter',
    element: <CoverLetterEditor/>
  },
  {
    path: '/faq',
    element:<Faq/>
  },
  
])

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);