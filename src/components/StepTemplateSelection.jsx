import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { Templates } from '../templates/Template';
const StepTemplateSelection = () => {
  const { formData, updateFormData } = useResume();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  // Set the default selected template if one isn't already chosen
  useEffect(() => {
    if (!formData.selectedTemplate && Templates.length > 0) {
      updateFormData('selectedTemplate', Templates[0].id); // Select the first template by default
    }
  }, [formData.selectedTemplate, updateFormData]);

  const handleTemplateSelect = (templateId) => {
    updateFormData('selectedTemplate', templateId);
  };

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
        Choose Your Resume Template
      </h2>
      <p className="text-sm md:text-base mb-6">
        Select a template that best fits your style and industry. You can always change it later.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Templates.map((template) => (
          <div
            key={template.id}
            className={`
              relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-300
              ${formData.selectedTemplate === template.id
                ? "border-blue-600 shadow-lg scale-105"
                : "border-gray-300 hover:border-blue-400 hover:shadow-md"
              }
            `}
            onClick={() => handleTemplateSelect(template.id)}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
          >
            <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
            <div className="bg-gray-100 h-48 flex items-center justify-center text-gray-500 rounded-md overflow-hidden">
              {template.image ? (
                <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
              ) : (
                <p>No preview available</p> // Fallback if no image path
              )}
            </div>
            {formData.selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTemplateSelection;