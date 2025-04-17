import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Grouped skills
const categorizedSkills = {
  Professional: [
    "Project Management", "Strategic Planning", "Time Management",
    "Leadership", "Public Speaking", "Business Development"
  ],
  Technical: [
    "JavaScript", "Python", "React", "Node.js", "SQL", 
    "Git", "Docker", "AWS"
  ],
  Creative: [
    "Graphic Design", "UI/UX Design", "Figma", 
    "Adobe Photoshop", "Video Editing"
  ],
  Communication: [
    "Communication", "Writing", "Presentation", 
    "Negotiation", "Active Listening"
  ],
  "Personal Development": [
    "Goal Setting", "Mindfulness", "Self-Discipline", 
    "Organization", "Stress Management"
  ],
  Marketing: [
    "SEO", "Content Marketing", "Email Marketing", 
    "Social Media Strategy", "Copywriting"
  ],
  "Life Skills": [
    "Budgeting", "Cooking", "Driving", "First Aid", "Gardening"
  ]
};

const StepSkills = () => {
  const { register, setValue, handleSubmit } = useForm();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Professional");

  const onSubmit = (data) => {
    console.log("Submitted Skills:", data.skills);
  };

  const handleSkillClick = (skill) => {
    let updatedSkills;
    if (selectedSkills.includes(skill)) {
      updatedSkills = selectedSkills.filter(s => s !== skill);
    } else {
      updatedSkills = [...selectedSkills, skill];
    }
    setSelectedSkills(updatedSkills);
    setValue("skills", updatedSkills);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-4xl mx-auto px-4">
      <h2 className="text-xl md:text-2xl font-bold">We recommend including 6-8 skills</h2>
      <p className='text-sm md:text-base'>Choose skills that align with the job requirements. Show employers you're confident of the work you do!</p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2.5 border-b border-b-gray-200">
        {Object.keys(categorizedSkills).map(category => (
          <button
            type="button"
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills by category */}
      <div className="flex flex-wrap gap-2">
        {categorizedSkills[activeCategory].map(skill => (
          <button
            type="button"
            key={skill}
            onClick={() => handleSkillClick(skill)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              selectedSkills.includes(skill)
                ? "bg-blue-500 text-white border-gray-600"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Hidden form field */}
      <input type="hidden" {...register("skills")} value={selectedSkills.join(",")} />

      
    </form>
  );
};

export default StepSkills;
