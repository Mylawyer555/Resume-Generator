import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"; // Assuming you have react-toastify for notifications
import { useResume } from "../context/ResumeContext"; // Correct path to your context

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

const StepSkills = ({ updateFormData, formData }) => {
  // Access the resume context
  const { resumeData, setResumeData } = useResume(); // You now have resumeData if needed

  const {
    register,
    setValue,
    handleSubmit,
    trigger, // For manual validation trigger if needed
    watch,   // To watch the value of the 'skills' field
    formState: { errors, isValid } // To access validation errors and overall form validity
  } = useForm({
    mode: "onChange", // Validate on change
    defaultValues: {
      // Initialize skills from formData (passed as prop) or an empty array
      skills: formData?.skills || [],
    }
  });

  // Watch the 'skills' field. This will re-render the component whenever 'skills' changes.
  // This array will be used for rendering the selected skills.
  const watchedSkills = watch("skills");

  // Local state for active category (this can remain local)
  const [activeCategory, setActiveCategory] = React.useState("Professional");

  // Effect to synchronize form data with the global context (useResume)
  // This ensures 'formData' in the parent and 'resumeData' in context are updated
  useEffect(() => {
    // Only update if watchedSkills is not undefined (it typically returns [] for empty)
    if (watchedSkills !== undefined) {
      updateFormData("skills", watchedSkills);
      // If you need to update resumeData directly, you could do:
      // setResumeData(prevData => ({ ...prevData, skills: watchedSkills }));
    }
  }, [watchedSkills, updateFormData]); // Depend on watchedSkills and updateFormData

  const onSubmit = (data) => {
    console.log("Submitted Skills:", data.skills);
    // You can also use isValid from formState here to check if the form is valid before proceeding
    if (isValid) {
      toast.success("Skills validated and saved!");
      // Proceed to the next step or finalize submission
    } else {
      // This toast might be redundant if errors are displayed immediately, but good for explicit feedback
      toast.error("Please ensure all skill requirements are met.");
    }
  };

  const handleSkillClick = (skill) => {
    // Get the current skills array directly from react-hook-form's watched value
    const currentSkills = watchedSkills || []; // Fallback to empty array

    let updatedSkills;
    if (currentSkills.includes(skill)) {
      updatedSkills = currentSkills.filter(s => s !== skill);
    } else {
      // Limit the number of selected skills if it exceeds the maximum
      if (currentSkills.length >= 8) {
        toast.warn("You can select a maximum of 8 skills.");
        return; // Prevent adding more skills
      }
      updatedSkills = [...currentSkills, skill];
    }
    // Update the 'skills' field in react-hook-form's state
    // shouldValidate: true ensures validation runs immediately after setting the value
    setValue("skills", updatedSkills, { shouldValidate: true });
  };

  // Register the 'skills' field with validation rules.
  // No visible input element is directly registered with this,
  // but it tells useForm to track this 'skills' array for validation.
  register("skills", {
    required: "Please select at least 6 skills.", // General requirement for the field
    validate: {
      minSkills: (value) => value.length >= 6 || "Please select at least 6 skills.",
      maxSkills: (value) => value.length <= 8 || "You can select a maximum of 8 skills."
    }
  });

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
            // Use watchedSkills for checking inclusion
            onClick={() => handleSkillClick(skill)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              watchedSkills.includes(skill) // Check if skill is in the watched array
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Display selected skills count and validation error */}
      <div className="mt-4">
        <p className={`text-sm ${
          watchedSkills.length >= 6 && watchedSkills.length <= 8
            ? 'text-green-600'
            : 'text-red-500'
        }`}>
          Selected Skills: {watchedSkills.length} / 8 (Recommended: 6-8 skills)
        </p>
        {errors.skills && (
          <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
        )}
      </div>

      {/* Submit Button for this step */}
      <button
        type="submit"
        className={`mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition
          ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`} // Optionally disable button if form is invalid
        disabled={!isValid} // Disable if validation fails
      >
        Save Skills & Continue
      </button>
    </form>
  );
};

export default StepSkills;