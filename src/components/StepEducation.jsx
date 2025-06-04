import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../context/ResumeContext"; 
import { useEffect } from "react";

const StepEducation = ({updateFormData, formData}) => {

  const { register, control, handleSubmit, reset, watch, formState:{errors}} = useForm({
    mode: "onBlur",
    defaultValues: {
      // initializing watched education data

     education: formData.education || [{
        schoolName: '',
        schoolLocation: '',
        degree: '',
        fieldOfStudy: '',
        graduationMonth: '',
        graduationYear: '',
        stillEnrolled: false,
      }],
    },
  });

     const watchedEducation = watch("education");

  useEffect(() => {
   updateFormData("education", watchedEducation);
  }, [watchedEducation, updateFormData]);


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

  const isStillEnrolled = watch(`education.${index}.stillEnrolled`);

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-4xl font-extrabold">
        Let’s talk about your education
      </h2>
      <p className="text-sm md:text-base">
        Tell us about any colleges, vocational programs, or training courses you took.
      </p>

      <form className="form-wrapper w-full mt-7 p-4 rounded-md space-y-8" >
        
        {fields.map((field, index) => {
          
          return (
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
                  {...register(`education.${index}.schoolName`,{
                    required: "School name is required",
                    minLength: {
                      value: 5,
                      message: "School name must be at least 5 characters",
                    },
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-3 py-3 rounded-md outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base"
                />
               {errors.education?.[index]?.schoolName && (<p className="text-red-500 text-sm">{errors.education[index].schoolName.message}</p>)}
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">SCHOOL LOCATION</label>
                <input
                  type="text"
                  placeholder="e.g Lagos, Nigeria"
                  {...register(`education.${index}.schoolLocation`, {
                    required: "School location is required",
                    minLength: {
                      value: 5,
                      message: "Location must be at least 5 characters",
                    },
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-3 py-3 rounded-md outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base"
                />
                {errors.education?.[index]?.schoolLocation && (<p className="text-red-500 text-sm">{errors.education[index].schoolLocation.message}</p>)} 
              </div>
            </div>

            {/* Degree */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[12px] text-black">DEGREE</label>
                <div className="relative w-full">
                  <select

                    {...register(`education.${index}.degree`, {
                      required: "Degree is required",
                      validate: (value) => value !== "Select Degree" || '',
                    })}
                    className="appearance-none w-full border border-gray-300 bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none  
                    focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 text-sm md:text-base"
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
                  {errors.education?.[index]?.degree && (
                    <p className="text-red-500 text-sm">{errors.education[index].degree.message}</p>
                  )}
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
                  {...register(`education.${index}.fieldOfStudy`, {
                    required: "Field of study is required",
                    minLength: {
                      value: 3,
                      message: "Field of study must be at least 3 characters",
                    },
                    validate: (value) => value.trim() !== "" || "Field of study cannot be empty",
                  })}
                  className="w-full border border-gray-300 bg-gray-50 px-3 py-3 rounded-md outline-none  
                  focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
                <div className="w-full">
                  <label className="text-[12px] text-black">GRAD MONTH</label>
                  <select
                    {...register(`education.${index}.graduationMonth`,{
                          // Only required if not still enrolled
                          required: !isStillEnrolled && "Graduation month is required",
                          validate: (value) =>
                            isStillEnrolled || value !== "" || "Please select a month",
                        })}
                    className={`appearance-none w-full border border-gray-300 bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none  
                    focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 text-sm md:text-base ${isStillEnrolled ? 'opacity-50 cursor-not-allowed' : ''} `}
                  >
                    <option value=""> month</option>
                    {months.map((month, idx) => (
                      <option key={idx} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  {errors.education?.[index]?.graduationMonth && (
                    <p className="text-red-500 text-sm">{errors.education[index].graduationMonth.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <label className="text-[12px] text-black">GRAD YEAR</label>
                  <select
                    {...register(`education.${index}.graduationYear`, {
                      required: !isStillEnrolled && "Graduation year is required",
                      validate: (value) =>
                        isStillEnrolled || value !== "" || "Please select a year",
                    })}
                     className={`appearance-none w-full border border-gray-300 bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none
                        focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 text-sm md:text-base
                        ${isStillEnrolled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <option value="">Year</option>
                    {years.map((year, idx) => (
                      <option key={idx} value={year} >
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.education?.[index]?.graduationYear && (
                    <p className="text-red-500 text-sm">{errors.education[index].graduationYear.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="still-enrolled w-full flex items-center gap-1.5">

              <input type="checkbox"
              {...register(`education.${index}.stillEnrolled`, {

              })}
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
          );
        }
        )}
        

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
