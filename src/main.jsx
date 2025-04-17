import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import TemplatesPage from './pages/TemplatePage'
import ResumePage from './pages/ResumePage'
import { useResume } from './context/ResumeContext'



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
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
