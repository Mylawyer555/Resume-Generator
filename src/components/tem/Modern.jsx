// src/templates/ModernTemplate.jsx
import React from 'react';

const ModernTemplate = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans text-gray-800 shadow-xl a4-paper">
      {/* Left Sidebar (Color Block) */}
      <div className="w-full md:w-1/3 bg-blue-800 text-white p-8 flex flex-col items-center text-center md:text-left md:items-start">
        {/* Profile Image (Optional, if you have one) */}
        {/* <img src="/path/to/profile.jpg" alt="Profile" className="rounded-full h-24 w-24 object-cover mb-4 border-4 border-blue-600"/> */}

        <h2 className="text-3xl font-bold mb-2">Chioma Okoro</h2>
        <p className="text-blue-200 text-lg mb-6">Marketing Manager</p>

        <div className="mb-6 w-full">
          <h3 className="text-xl font-semibold mb-3 border-b border-blue-600 pb-1">Contact</h3>
          <p className="text-blue-100 text-sm">
            Email: chioma.okoro@example.com<br/>
            Phone: +234 801 234 5678<br/>
            Location: Lagos, Nigeria<br/>
            LinkedIn: linkedin.com/in/chiomaokoro
          </p>
        </div>

        <div className="mb-6 w-full">
          <h3 className="text-xl font-semibold mb-3 border-b border-blue-600 pb-1">Skills</h3>
          <ul className="list-none space-y-1 text-blue-100 text-sm">
            <li>Digital Marketing</li>
            <li>Content Marketing</li>
            <li>SEO/SEM</li>
            <li>Social Media Management</li>
            <li>Brand Strategy</li>
            <li>Market Research</li>
            <li>Data Analysis</li>
            <li>Team Leadership</li>
            <li>HubSpot, Salesforce</li>
            <li>Google Analytics</li>
          </ul>
        </div>

        <div className="w-full">
          <h3 className="text-xl font-semibold mb-3 border-b border-blue-600 pb-1">Education</h3>
          <div className="mb-3">
            <p className="font-semibold text-base">MBA</p>
            <p className="text-blue-100 text-sm">Lagos Business School</p>
            <p className="text-blue-200 text-xs">2019</p>
          </div>
          <div>
            <p className="font-semibold text-base">B.Sc. Marketing</p>
            <p className="text-blue-100 text-sm">University of Ghana</p>
            <p className="text-blue-200 text-xs">2016</p>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-full md:w-2/3 bg-white p-8">
        {/* Professional Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-blue-800 border-b-2 border-blue-200 pb-1">Professional Summary</h2>
          <p className="text-justify text-gray-700">
            Highly accomplished and results-driven Marketing Manager with over 7 years of progressive experience in developing and executing comprehensive marketing strategies for leading consumer brands. Proven ability to drive brand awareness, customer engagement, and revenue growth through innovative digital campaigns, market analysis, and cross-functional team leadership. Adept at leveraging data-driven insights to optimize performance and achieve business objectives.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3 text-blue-800 border-b-2 border-blue-200 pb-1">Experience</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Marketing Manager</h3>
            <p className="text-lg italic text-gray-700">Global Brands Inc. | Lagos, Nigeria</p>
            <p className="text-sm text-gray-600 mb-2">January 2020 – Present</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Led the development and execution of digital marketing campaigns across social media, email, and PPC, resulting in a 30% increase in online engagement.</li>
              <li>Managed a team of 5 marketing specialists, fostering a collaborative environment and achieving project deadlines 95% of the time.</li>
              <li>Conducted market research and competitive analysis to identify new opportunities and inform strategic planning.</li>
              <li>Increased brand visibility by 40% through strategic partnerships and influencer collaborations.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Digital Marketing Specialist</h3>
            <p className="text-lg italic text-gray-700">Innovate Marketing Solutions | Accra, Ghana</p>
            <p className="text-sm text-gray-600 mb-2">March 2017 – December 2019</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Developed and implemented SEO strategies, leading to a 25% improvement in search engine rankings for key clients.</li>
              <li>Managed content creation for blogs, websites, and marketing materials, ensuring brand consistency.</li>
              <li>Analyzed campaign performance data and provided actionable insights to optimize future initiatives.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;