import React from "react";
import Navbar from "../components/Navbar"; 
import { redirect, useNavigate } from "react-router-dom";
import { FileText, FileCheck, BadgeCheck } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming you have an auth context to check if user is logged in

  const handleStartBuilding = () => {
    if (user) {
      navigate("/build"); // Redirect to resume builder if user is logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }
 

  return (
    <div className="bg-white font-sans text-gray-800 antialiased"> {/* Added antialiased for smoother fonts */}
      <Navbar />

      {/* Hero Section - Emphasize the value proposition */}
      {/* Changed flex-col-reverse to flex-col to place image AFTER text on mobile */}
      <section className="relative flex flex-col md:flex-row items-center px-6 md:px-16 py-16 md:py-24 bg-gray-50 overflow-hidden">
        {/* Added a subtle background pattern or shape for visual interest */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-gray-50 to-white opacity-50 z-0 "></div>
        <div className="mb-[30px] md:w-1/2 text-center md:text-left relative z-10"> {/* Ensure content is above background */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Craft Your Future: Get Hired, Faster.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Our intuitive platform helps you create **ATS-optimized, recruiter-approved resumes** with ease. Stand out, land interviews, and accelerate your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"> {/* Use sm:flex-row for better tablet stacking */}
            <button
              onClick={handleStartBuilding}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              Start Building My Resume
            </button>
            <button
              onClick={handleStartBuilding}
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:-translate-y-1"
            >
              Explore Professional Templates
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 relative z-10"> {/* Ensure image is above background */}
          <img
            src="/resume1.png" // Ensure this path is correct
            alt="Illustrative image of a professional resume being built"
            // Adjusted image classes for smaller size on md-larger screens
            className="w-full max-w-md md:w-3/4 md:max-w-xl h-auto object-contain drop-shadow-xl"
          />
        </div>
      </section>

      {/* Trusted Companies - Slightly more prominent and visually engaging */}
      <section className="bg-white py-12 md:py-16 text-center border-t border-gray-100">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
          Join Thousands of Professionals From Leading Companies
        </h3>
        <img
          src="/images/Screenshot_2024-05-27_003117-removebg-preview.png" // Ensure this path is correct
          alt="Logos of companies whose professionals trust our service"
          className="mx-auto w-4/5 md:w-3/5 lg:w-2/5 max-w-2xl opacity-90 filter grayscale hover:filter-none transition-all duration-300"
        />
      </section>

      {/* Features Section - Improved layout, slightly larger icons/text */}
      <section className="bg-gray-50 py-16 md:py-24 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12"> {/* Added gap for spacing */}
        <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Make an Unforgettable First Impression.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Impress recruiters with a modern, structured resume tailored to today's hiring standards. Our powerful tool empowers you to create a professional resume with unparalleled ease.
          </p>
          <ul className="space-y-5 text-gray-700 mb-10 text-lg"> {/* Increased spacing and text size */}
            <li className="flex items-start gap-4"> {/* Changed to items-start for multi-line text alignment */}
              <FileText className="text-yellow-500 w-6 h-6 flex-shrink-0 mt-1" /> {/* Larger icons, added flex-shrink-0 and margin-top */}
              <div>
                <strong className="block text-gray-900">Intuitive, Step-by-Step Builder:</strong>
                <span className="text-gray-600">Walk through our guided process to fill in your details effortlessly.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FileCheck className="text-yellow-500 w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="block text-gray-900">ATS Optimized for Success:</strong>
                <span className="text-gray-600">Ensure your resume passes Applicant Tracking Systems and reaches hiring managers.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <BadgeCheck className="text-yellow-500 w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="block text-gray-900">Expert-Reviewed Templates:</strong>
                <span className="text-gray-600">Choose from designs crafted and vetted by certified resume professionals.</span>
              </div>
            </li>
          </ul>
          <button
            onClick={handleStartBuilding}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            Create Your Resume Now
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/resume2.png" // Ensure this path is correct
            alt="Features visual showing resume sections"
            className="w-full max-w-md md:max-w-full h-auto object-contain drop-shadow-xl"
          />
        </div>
      </section>

      {/* Added a simple call to action / footer section */}
      <section className="bg-white py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Elevate Your Job Search?</h2>
        <p className="text-lg text-gray-600 mb-8">Start building your professional resume today and open doors to new opportunities.</p>
        <button
          onClick={handleStartBuilding}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-5 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
        >
          Build My Perfect Resume
        </button>
      </section>

    </div>
  );
};

export default LandingPage;