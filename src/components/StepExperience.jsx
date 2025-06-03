import React, { use } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../context/ResumeContext";
import { useEffect } from "react";

const StepExperience = ({updateFormData, formData}) => {
  const { register, control, watch } = useForm({
    defaultValues: {
      experiences: FormData || [
        {
          jobTitle: "",
          responsibilites: "",
          employer: "",
          city: "",
          country: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const watchedExperiences = watch("experiences");
  
  useEffect(() => {
     console.log("StepExperience: watchedExperience changed", watchedExperiences);
    updateFormData("experience", watchedExperiences);
  },[updateFormData, watchedExperiences]);

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-4xl font-extrabold">
        Let's work on your experience
      </h2>
      <p className="text-sm md:text-base">
        Start with your most recent job first and then work your way backwards.
      </p>

      <form
       
        className="form-wrapper w-full mt-7 p-4 rounded-md space-y-8"
      >
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
                  {...register(`experiences.${index}.jobTitle`)}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">EMPLOYER</label>
                <input
                  type="text"
                  placeholder="e.g PEP"
                  {...register(`experiences.${index}.employer`)}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">CITY</label>
                <input
                  type="text"
                  placeholder="e.g Lagos"
                  {...register(`experiences.${index}.city`)}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">COUNTRY</label>
                <input
                  type="text"
                  placeholder="e.g Nigeria"
                  {...register(`experiences.${index}.country`)}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">START DATE</label>
                <input
                  type="date"
                  {...register(`experiences.${index}.startDate`)}
                  className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">END DATE</label>
                <input
                  type="date"
                  {...register(`experiences.${index}.endDate`)}
                    className="w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                    focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300"
                />
              </div>
             
            </div>
             <div>
                <label
                  htmlFor={`experience.${index}.responsibilities`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Key Responsibilities (use bullet points or clear sentences)
                </label>
                <textarea
                  id={`experience.${index}.responsibilities`}
                  {...register(`experience.${index}.responsibilities`)}
                  rows="5" // Give it some height
                  placeholder="e.g.
• Led a team of 5 engineers in developing scalable web applications.
• Implemented new features, reducing page load times by 20%.
• Collaborated with product managers to define requirements."
                  className="mt-1 w-full border border-gray-300 bg-gray-50 px-[10px] py-[8px] rounded-[4px] outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300"
                ></textarea>
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
                responsibilites: "",
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
