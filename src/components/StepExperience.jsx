import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../context/ResumeContext";

const StepExperience = ({ updateFormData, formData }) => {
  const { register, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      // Corrected: Use formData.experience to get the array from context
      experiences: formData.experience || [
        {
          jobTitle: "",
          responsibilities: "", // Corrected spelling
          employer: "",
          city: "",
          country: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
    mode: "onBlur", // Recommend 'onBlur' for better UX with errors for arrays
                    // or 'onChange' if you want immediate feedback
  });

  const watchedExperiences = watch("experiences");

  useEffect(() => {
    console.log("StepExperience: watchedExperience changed", watchedExperiences);
    updateFormData("experience", watchedExperiences);
  }, [updateFormData, watchedExperiences]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-4xl font-extrabold">
        Let's work on your experience
      </h2>
      <p className="text-sm md:text-base">
        Start with your most recent job first and then work your way backwards.
      </p>

      <form className="form-wrapper w-full mt-7 p-4 rounded-md space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 border-b border-b-gray-200 pb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">JOB TITLE</label>
                <input
                  type="text"
                  placeholder="e.g Retail Sales Associate"
                  {...register(`experiences.${index}.jobTitle`, {
                    required: "Job title is required",
                    minLength: {
                      value: 2,
                      message: "Job title must be at least 2 characters",
                    },
                    
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300"
                />
                {/* Correct error access for nested fields */}
                {errors.experiences?.[index]?.jobTitle && (
                  <span className="text-red-500 text-sm">
                    {errors.experiences[index].jobTitle.message}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">EMPLOYER</label>
                <input
                  type="text"
                  placeholder="e.g PEPSI"
                  {...register(`experiences.${index}.employer`, {
                    required: "Employer is required",
                    minLength: {
                      value: 2,
                      message: "Employer must be at least 2 characters",
                    },
                    validate: (value) => {
                      if (typeof value !== "string") {
                        return "Employer must be letters, not numbers or other types";
                      }
                      if (value.trim() === "") {
                        return "Employer cannot be empty or just spaces";
                      }
                      return true; // <<< CRITICAL: Return true if validation passes
                    },
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300"
                />
              
                {errors.experiences?.[index]?.employer && (
                  <span className="text-red-500 text-sm">
                    {errors.experiences[index].employer.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">CITY</label>
                <input
                  type="text"
                  placeholder="e.g Lagos"
                  {...register(`experiences.${index}.city`, {
                    required: "City is required",
                    minLength: {
                      value: 2,
                      message: "City must be at least 2 characters",
                    },
                    validate: (value) => {
                      if (typeof value !== "string") {
                        return "City must be letters, not numbers or other types";
                      }
                      if (value.trim() === "") {
                        return "City cannot be empty or just spaces";
                      }
                      return true; // <<< CRITICAL: Return true if validation passes
                    },
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300"
                />
                {/* Add error display for city */}
                {errors.experiences?.[index]?.city && (
                  <span className="text-red-500 text-sm">
                    {errors.experiences[index].city.message}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">COUNTRY</label>
                <input
                  type="text"
                  placeholder="e.g Nigeria"
                  {...register(`experiences.${index}.country`, {
                    required: "Country is required", // Added validation for country
                    minLength: {
                      value: 2,
                      message: "Country must be at least 2 characters",
                    },
                    validate: (value) => {
                      if (typeof value !== "string") {
                        return "Country must be letters, not numbers or other types";
                      }
                      if (value.trim() === "") {
                        return "Country cannot be empty or just spaces";
                      }
                      return true;
                    },
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300"
                />
                 {errors.experiences?.[index]?.country && (
                  <span className="text-red-500 text-sm">
                    {errors.experiences[index].country.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">START DATE</label>
                <input
                  type="date"
                  {...register(`experiences.${index}.startDate`, {
                    required: "Start Date is required", // Added validation for start date
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300"
                />
                {errors.experiences?.[index]?.startDate && (
                  <span className="text-red-500 text-sm">
                    {errors.experiences[index].startDate.message}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">END DATE</label>
                <input
                  type="date"
                  {...register(`experiences.${index}.endDate`, {
                    // This is optional if you want to allow "present"
                    // If you want it required unless "still working" is checked, you'd add custom logic.
                    // For now, making it optional if not working.
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300"
                />
                {/* No error display for endDate if it's not required or validated */}
              </div>
            </div>
            <div>
              <label
                htmlFor={`experiences.${index}.responsibilities`} // Corrected htmlFor ID
                className="block text-sm font-medium text-gray-700"
              >
                Key Responsibilities (use bullet points or clear sentences)
              </label>
              <textarea
                id={`experiences.${index}.responsibilities`} // Corrected ID
                {...register(`experiences.${index}.responsibilities`, { // Corrected path and added validation
                  required: "Responsibilities are required",
                  minLength: {
                    value: 10,
                    message: "Please provide at least 10 characters for responsibilities",
                  },
                  validate: (value) => {
                    if (typeof value !== "string") {
                      return "Responsibilities must be a string";
                    }
                    if (value.trim().length === 0) {
                      return "Responsibilities cannot be empty or just spaces";
                    }
                    return true;
                  },
                })}
                rows="5"
                placeholder="e.g.
• Led a team of 5 engineers in developing scalable web applications.
• Implemented new features, reducing page load times by 20%.
• Collaborated with product managers to define requirements."
                className="mt-1 w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300"
              ></textarea>
              {errors.experiences?.[index]?.responsibilities && (
                <span className="text-red-500 text-sm">
                  {errors.experiences[index].responsibilities.message}
                </span>
              )}
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 mt-2 text-sm hover:underline"
              >
                Remove Experience
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() =>
              append({
                jobTitle: "",
                employer: "",
                city: "",
                country: "",
                startDate: "",
                endDate: "",
                responsibilities: "", // Corrected spelling here
              })
            }
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 text-sm"
          >
            + Add Another Experience
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepExperience;