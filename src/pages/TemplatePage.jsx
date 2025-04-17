import React from "react";
import TemplateCard from "../components/TemplateCards";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const templates = [
  {
    id: 1,
    name: "Modern Resume",
    description: "A sleek, professional template with a modern touch.",
    image: "/modern-resume.jpg",
  },
  {
    id: 2,
    name: "Creative Resume",
    description: "A visually appealing template for creative professionals.",
    image: "/images/creative-resume.png",
  },
  {
    id: 3,
    name: "Professional Resume",
    description: "A classic layout for a strong professional presence.",
    image: "/images/professional-resume.png",
  },
  {
    id: 4,
    name: "ATS Resume",
    description: "Optimized for Applicant Tracking Systems.",
    image: "/images/ats-resume.png",
  },
];

const TemplatePage = ({ onSelectTemplate }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Choose Your Resume Template
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={onSelectTemplate}
              fullHover
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TemplatePage;
