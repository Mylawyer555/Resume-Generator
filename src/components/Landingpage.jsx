import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleTemplateNavigation =()=>{
    navigate('/templates')
  }

  return (
    <div className="bg-white font-sans text-gray-800">
      {/* Navbar */}
      <Navbar />
 {/* Hero Section */}
 <section className="flex flex-col-reverse md:flex-row items-center p-8 md:p-16 bg-gray-100">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Boost Your Chances of Landing Your Dream Job
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your CV is more than just a document. It's your pathway to a career <br />
            you have long dreamed of. <br /> Build your CV with our Expertise.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <a onClick={handleTemplateNavigation} href="cvgeneratorForm.html" className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition text-center">Build your CV</a>
            <a href="cvgeneratorForm.html" className="border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg hover:bg-yellow-500 hover:text-white transition text-center">Explore Templates</a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/images/CV-Maker-removebg-preview.png" alt="CV Maker" className="w-3/4 md:w-full h-auto object-cover" />
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="text-center py-12 bg-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Trusted by Great Companies</h3>
        <img src="/images/Screenshot_2024-05-27_003117-removebg-preview.png" alt="Trusted Companies" className="mx-auto w-3/4 md:w-1/2" />
      </section>

      {/* How-to Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-white">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            First Impression <br /> matters. RevampCv <br /> make it count!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Showcase your skills while instilling confidence in employers. Packed with proven templates, tips, and tools.
            <br />
            Our custom resume builder propels your career forward.
          </p>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-center">
              <i className="bi bi-file-text mr-2 text-yellow-500"></i> Easy-to-use resume builder
            </li>
            <li className="flex items-center">
              <i className="bi bi-file-earmark-easel mr-2 text-yellow-500"></i> ATS optimized resume
            </li>
            <li className="flex items-center">
              <i className="bi bi-patch-check mr-2 text-yellow-500"></i> Verified by certified resume writers
            </li>
          </ul>
          <a href="#" className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition">
            Build your resume
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/images/leftphoto.png" alt="How to use RevampCv" className="w-3/4 md:w-full h-auto object-cover" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
