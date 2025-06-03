
import React from 'react';

const ModernTemplate = ({ formData }) => {
  const { personal, summary, experience, education, skills } = formData;

  return (
    <div className="font-sans text-gray-800 p-8 border rounded-lg shadow-lg bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          {personal && (
            <h1 className="text-3xl font-extrabold text-blue-700">{personal.firstname} {personal.lastname}</h1>
          )}
          {summary && (
            <p className="text-sm text-gray-600 italic mt-1">{summary}</p>
          )}
        </div>
        <div className="text-right text-sm">
          {personal && (
            <>
              <p>{personal.email}</p>
              <p>{personal.phoneNumber}</p>
              <p>{personal.district}, {personal.postalCode}</p>
              <p>{personal.country}</p>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (Skills) */}
        <div className="col-span-1">
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 border-b-2 border-blue-500 pb-1">Skills</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Experience & Education) */}
        <div className="col-span-2">
          {experience && experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 border-b-2 border-blue-500 pb-1">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-base">{exp.jobTitle} <span className="font-normal italic">at {exp.employer}</span></h3>
                  <p className="text-xs text-gray-600">{exp.city}, {exp.country} | {exp.startDate} - {exp.endDate}</p>
                  {/* Add responsibilities */}
                </div>
              ))}
            </div>
          )}

          {education && education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 border-b-2 border-blue-500 pb-1">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-base">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <p className="text-xs text-gray-600">{edu.schoolName}, {edu.schoolLocation}</p>
                  <p className="text-xs text-gray-600">Graduation: {edu.graduationMonth} {edu.graduationYear} {edu.stillEnrolled && "(Still Enrolled)"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;