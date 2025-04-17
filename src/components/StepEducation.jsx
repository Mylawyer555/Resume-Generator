import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const StepEducation = () => {
  const { register, control } = useForm({
    defaultValues: {
      education: [
        {
          schoolName: "",
          schoolLocation: "",
          degree: "",
          fieldOfStudy: "",
          graduationMonth: "",
          graduationYear: "",
          stillEnrolled: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const degreeOptions = [
    "High School Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate (PhD)",
    "Certificate",
    "Diploma",
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 60 }, (_, i) => currentYear - i);

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-4xl font-extrabold">
        Let’s talk about your education
      </h2>
      <p className="text-sm md:text-base">
        Tell us about any colleges, vocational programs, or training courses you took.
      </p>

      <form className="form-wrapper w-full mt-7 p-4 rounded-md space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 border-b border-b-gray-200 pb-6"
          >
            {/* School Name & Location */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">SCHOOL NAME</label>
                <input
                  type="text"
                  placeholder="e.g Bell University"
                  {...register(`education.${index}.schoolName`)}
                  className="w-full border border-gray-300 bg-gray-50 px-3 py-3 rounded-md outline-none  
                  focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">SCHOOL LOCATION</label>
                <input
                  type="text"
                  placeholder="e.g Lagos, Nigeria"
                  {...register(`education.${index}.schoolLocation`)}
                  className="w-full border border-gray-300 bg-gray-50 px-3 py-3 rounded-md outline-none  
                  focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base"
                />
              </div>
            </div>

            {/* Degree */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">DEGREE</label>
                <div className="relative w-full">
                  <select
                    {...register(`education.${index}.degree`)}
                    className="appearance-none w-full border border-gray-300 bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none  
                    focus:border-b-4 border-b-sky-600 transition-all duration-300 text-sm md:text-base"
                  >
                    <option>Select Degree</option>
                    {degreeOptions.map((degree, idx) => (
                      <option key={idx} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* Field of Study & Graduation */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">FIELD OF STUDY</label>
                <input
                  type="text"
                  placeholder="e.g Computer Science"
                  {...register(`education.${index}.fieldOfStudy`)}
                  className="w-full border border-gray-300 bg-gray-50 px-3 py-3 rounded-md outline-none  
                  focus:border-b-4 border-b-sky-600 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
                <div className="w-full">
                  <label className="text-[12px] text-black">GRAD MONTH</label>
                  <select
                    {...register(`education.${index}.graduationMonth`)}
                    className="appearance-none w-full border border-gray-300 bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none  
                    focus:border-b-4 border-b-sky-600 transition-all duration-300 text-sm md:text-base"
                  >
                    <option value="">Month</option>
                    {months.map((month, idx) => (
                      <option key={idx} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <label className="text-[12px] text-black">GRAD YEAR</label>
                  <select
                    {...register(`education.${index}.graduationYear`)}
                    className="appearance-none w-full border border-gray-300 bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none  
                    focus:border-b-4 border-b-sky-600 transition-all duration-300 text-sm md:text-base"
                  >
                    <option value="">Year</option>
                    {years.map((year, idx) => (
                      <option key={idx} value={year} >
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="still-enrolled w-full flex items-center gap-1.5">

              <input type="checkbox"
              {...register(`education.${index}.stillEnrolled`)}
               />
              <label htmlFor="" className="text-[12px] text-black">Still Enrolled</label>
            </div>

            {fields.length > 1 && (<button
            type="button"
            onClick={() =>{remove(index)}}
            className="text-red-500 mt-2 text-sm hover:underline"
            >
              Remove Education
            </button>)}
          </div>
        ))}

        <div>
          <button
          type="button"
          onClick={() =>{append({
              schoolName: "",
              schoolLocation: "",
              degree: "",
              fieldOfStudy: "",
              graduationMonth: "",
              graduationYear: "",
              stillEnrolled: false,
          })}}
          className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 text-sm"
          >
            + Add another Education
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepEducation;
