// src/templates/ClassicTemplate.jsx
import React from 'react';

const ClassicTemplate = ({ formData }) => {
  const { personal, summary, experience, education, skills } = formData;

  return (
    <div className="font-sans text-gray-800 p-6 border rounded-lg shadow-sm bg-white">
      {/* Personal Info */}
      {personal && (
        <div className="text-center mb-6 pb-4 border-b border-gray-300">
          <h1 className="text-3xl font-bold mb-1">{personal.firstname} {personal.lastname}</h1>
          <p className="text-sm text-gray-600">
            {personal.email} {personal.phoneNumber && `| ${personal.phoneNumber}`}
          </p>
          <p className="text-sm text-gray-600">
            {personal.district} {personal.postalCode && `, ${personal.postalCode}`} {personal.country && `, ${personal.country}`}
          </p>
        </div>
      )}

      {/* Summary */}
      {summary && summary.trim().length > 0 && ( // Ensure summary exists and is not just whitespace
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-400 pb-1 mb-2">Summary</h2>
          {/* Using whitespace-pre-wrap to preserve line breaks from textarea input */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-400 pb-1 mb-2">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold text-base">{exp.jobTitle} at {exp.employer}</h3>
              <p className="text-xs text-gray-600">
                {exp.city}, {exp.country} | {exp.startDate} - {exp.endDate || 'Present'}
              </p>

              {/* Responsibilities Section - NEW! */}
              {exp.responsibilities && exp.responsibilities.trim().length > 0 && (
                <ul className="list-disc list-inside text-sm mt-1 space-y-0.5">
                  {/* Split by new line to create bullet points for each responsibility */}
                  {exp.responsibilities.split('\n').map((responsibility, idx) => (
                    responsibility.trim().length > 0 && ( // Only render non-empty lines
                      <li key={idx} className="leading-tight">{responsibility.trim()}</li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-400 pb-1 mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold text-base">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
              <p className="text-xs text-gray-600">{edu.schoolName}, {edu.schoolLocation}</p>
              <p className="text-xs text-gray-600">
                Graduation: {edu.graduationMonth} {edu.graduationYear} {edu.stillEnrolled && "(Still Enrolled)"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b-2 border-gray-400 pb-1 mb-2">Skills</h2>
          {/* Join skills with a consistent separator, like a bullet or pipe */}
          <p className="text-sm">{skills.join(' • ')}</p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;