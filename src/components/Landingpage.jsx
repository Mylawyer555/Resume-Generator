import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FileText, FileCheck, BadgeCheck } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBuildCV = () => navigate("/builder");
  const handleExploreTemplates = () => navigate("/templates");

  return (
    <div className="bg-white font-sans text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center px-6 md:px-16 py-12 bg-gray-50">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Create a Resume That Gets You Hired
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Our resume builder helps you stand out with ATS-optimized templates,
            industry-proven layouts, and real-time preview. Take the next step
            in your career—fast and professionally.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={handleBuildCV}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium transition"
            >
              Build My Resume
            </button>
            <button
              onClick={handleExploreTemplates}
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-8 py-3 rounded-lg font-medium transition"
            >
              Explore Templates
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src="/images/CV-Maker-removebg-preview.png"
            alt="Resume Builder Preview"
            className="w-4/5 md:w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="bg-white py-10 text-center border-t border-gray-100">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
          Trusted by Professionals From
        </h3>
        <img
          src="/images/Screenshot_2024-05-27_003117-removebg-preview.png"
          alt="Company Logos"
          className="mx-auto w-3/4 md:w-1/2 opacity-90"
        />
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            First Impressions Matter. Make Yours Count.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Impress recruiters with a modern, structured resume tailored to
            today's hiring standards. Our tool empowers you to create a
            professional resume with ease.
          </p>
          <ul className="space-y-4 text-gray-700 mb-8">
            <li className="flex items-center gap-3">
              <FileText className="text-yellow-500 w-5 h-5" />
              Intuitive, step-by-step resume builder
            </li>
            <li className="flex items-center gap-3">
              <FileCheck className="text-yellow-500 w-5 h-5" />
              Optimized for Applicant Tracking Systems (ATS)
            </li>
            <li className="flex items-center gap-3">
              <BadgeCheck className="text-yellow-500 w-5 h-5" />
              Reviewed by certified resume experts
            </li>
          </ul>
          <button
            onClick={handleBuildCV}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium transition"
          >
            Get Started Now
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/images/leftphoto.png"
            alt="Resume Features"
            className="w-4/5 md:w-full h-auto object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
