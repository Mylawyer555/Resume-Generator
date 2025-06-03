// src/templates/ClassicTemplate.jsx
import React from 'react';

const ClassicTemplate = () => {
  return (
    <div className="p-8 border border-gray-300 font-serif leading-relaxed text-gray-800 bg-white shadow-lg a4-paper">
      {/* Header / Personal Information */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-1 text-gray-900">Chioma Okoro</h1>
        <p className="text-md text-gray-700">
          chioma.okoro@example.com | +234 801 234 5678 | Lagos, Nigeria
        </p>
        <p className="text-sm text-gray-600">linkedin.com/in/chiomaokoro</p>
      </div>

      <hr className="my-6 border-t-2 border-gray-300"/>

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b pb-1 border-gray-300">Professional Summary</h2>
        <p className="text-justify">
          Highly accomplished and results-driven Marketing Manager with over 7 years of progressive experience in developing and executing comprehensive marketing strategies for leading consumer brands. Proven ability to drive brand awareness, customer engagement, and revenue growth through innovative digital campaigns, market analysis, and cross-functional team leadership. Adept at leveraging data-driven insights to optimize performance and achieve business objectives.
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b pb-1 border-gray-300">Experience</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Marketing Manager</h3>
          <p className="text-lg italic text-gray-700">Global Brands Inc. | Lagos, Nigeria</p>
          <p className="text-md text-gray-600 mb-2">January 2020 – Present</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Led the development and execution of digital marketing campaigns across social media, email, and PPC, resulting in a 30% increase in online engagement.</li>
            <li>Managed a team of 5 marketing specialists, fostering a collaborative environment and achieving project deadlines 95% of the time.</li>
            <li>Conducted market research and competitive analysis to identify new opportunities and inform strategic planning.</li>
            <li>Increased brand visibility by 40% through strategic partnerships and influencer collaborations.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Digital Marketing Specialist</h3>
          <p className="text-lg italic text-gray-700">Innovate Marketing Solutions | Accra, Ghana</p>
          <p className="text-md text-gray-600 mb-2">March 2017 – December 2019</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Developed and implemented SEO strategies, leading to a 25% improvement in search engine rankings for key clients.</li>
            <li>Managed content creation for blogs, websites, and marketing materials, ensuring brand consistency.</li>
            <li>Analyzed campaign performance data and provided actionable insights to optimize future initiatives.</li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b pb-1 border-gray-300">Education</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Master of Business Administration (MBA)</h3>
          <p className="text-lg italic text-gray-700">Lagos Business School | Lagos, Nigeria</p>
          <p className="text-md text-gray-600">Graduated: June 2019</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Bachelor of Science in Marketing</h3>
          <p className="text-lg italic text-gray-700">University of Ghana | Accra, Ghana</p>
          <p className="text-md text-gray-600">Graduated: July 2016</p>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b pb-1 border-gray-300">Skills</h2>
        <p className="text-gray-700">
          **Marketing Strategy:** Digital Marketing, Content Marketing, SEO/SEM, Social Media Marketing, Email Marketing, Brand Management, Product Launch, Market Research, Analytics<br/>
          **Tools:** Google Analytics, HubSpot, Salesforce, Mailchimp, Adobe Creative Suite (Basic), MS Office Suite<br/>
          **Soft Skills:** Leadership, Team Management, Communication, Project Management, Data Analysis, Problem-Solving, Creativity
        </p>
      </div>
    </div>
  );
};

export default ClassicTemplate;