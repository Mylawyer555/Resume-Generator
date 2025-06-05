import React, { useEffect, useState } from "react"; // useState might not be needed if all form state is with useForm
import { useForm, useFieldArray } from "react-hook-form";
import { useResume } from "../context/ResumeContext"; // Assuming this path is correct
import { toast } from "react-toastify"; // For notifications

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Helper to get current and past years
const getCurrentAndPastYears = (count = 50) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => currentYear - i);
};
const years = getCurrentAndPastYears();

const degrees = [
  "High School Diploma", "GED", "Associate of Arts (AA)", "Associate of Science (AS)",
  "Bachelor of Arts (BA)", "Bachelor of Science (BS)", "Master of Arts (MA)",
  "Master of Science (MS)", "Master of Business Administration (MBA)",
  "Doctor of Philosophy (PhD)", "Juris Doctor (JD)", "Doctor of Medicine (MD)",
  "Other"
];

const StepEducation = ({ updateFormData, formData }) => {
  const { resumeData, setResumeData } = useResume(); // Access resume context

  const {
    register,
    control, // Necessary for useFieldArray
    watch,   // To watch individual field values (like `stillEnrolled`)
    setValue, // To programmatically set form values if needed
    formState: { errors, isValid }, // To access validation errors and overall form validity
    getValues // Useful for getting current values without a re-render
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Initialize with existing form data, or a default empty entry
      education: formData.education && formData.education.length > 0
        ? formData.education
        : [{
            schoolName: "",
            schoolLocation: "",
            degree: "",
            fieldOfStudy: "",
            graduationMonth: "",
            graduationYear: "",
            stillEnrolled: false,
          }],
    },
  });

  // useFieldArray to manage dynamic education fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  // Watch the entire 'education' array to sync with global form data
  const watchedEducation = watch("education");

  // Effect to sync form data with the global resume context
  useEffect(() => {
    if (Array.isArray(watchedEducation)) {
      updateFormData("education", watchedEducation);
    }
  }, [watchedEducation, updateFormData]);

  // Handle overall form submission for this step (if applicable)
  const onSubmit = (data) => {
    console.log("Education submitted:", data.education);
    if (isValid) {
      toast.success("Education details saved!");
      // Here you would typically trigger moving to the next step
    } else {
      toast.error("Please correct the errors in your education entries.");
      console.log(errors); // Log errors for debugging
    }
  };

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-extrabold">
        Tell Us About Your Education
      </h2>
      <p className="text-sm md:text-base mb-4">
        Add all schools, degrees, and training that are relevant to your job search.
      </p>

      {/* Changed to type="submit" and connected to handleSubmit for direct form validation */}
      <form  className="form-wrapper w-full mt-7 p-4 rounded-md space-y-8" >
        {fields.map((field, index) => {
          // IMPORTANT: Define 'isStillEnrolled' INSIDE the map callback
          // This ensures it's specific to the current 'index' and reactive
          const isStillEnrolled = watch(`education.${index}.stillEnrolled`);

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
                      validate: (value) => value.trim() !== "" || "School name cannot be empty",
                    })}
                    className={`w-full border bg-gray-50 px-3 py-3 rounded-md outline-none
                    focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base
                    ${errors.education?.[index]?.schoolName ? 'border-red-500' : 'border-gray-300'}`}
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
                      validate: (value) => value.trim() !== "" || "Location cannot be empty",
                    })}
                    className={`w-full border bg-gray-50 px-3 py-3 rounded-md outline-none
                    focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base
                    ${errors.education?.[index]?.schoolLocation ? 'border-red-500' : 'border-gray-300'}`}
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
                        validate: (value) => value !== "" || "Please select a degree",
                      })}
                      className={`appearance-none w-full border bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none
                      focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 text-sm md:text-base
                      ${errors.education?.[index]?.degree ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Degree</option>
                      {degrees.map((degreeOption) => (
                        <option key={degreeOption} value={degreeOption}>
                          {degreeOption}
                        </option>
                      ))}
                    </select>
                    {/* Dropdown arrow for select, using Tailwind or custom CSS */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                  {errors.education?.[index]?.degree && (
                    <p className="text-red-500 text-sm">
                      {errors.education[index].degree.message}
                    </p>
                  )}
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
                        value: 2,
                        message: "Field of study must be at least 2 characters",
                      },
                      validate: (value) => value.trim() !== "" || "Field of study cannot be empty",
                    })}
                    className={`w-full border bg-gray-50 px-3 py-3 rounded-md outline-none
                    focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 placeholder:text-gray-300 text-sm md:text-base
                    ${errors.education?.[index]?.fieldOfStudy ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.education?.[index]?.fieldOfStudy && (
                    <p className="text-red-500 text-sm">
                      {errors.education[index].fieldOfStudy.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
                  <div className="w-full">
                    <label className="text-[12px] text-black">GRAD MONTH</label>
                    <div className="relative w-full">
                      <select
                        {...register(`education.${index}.graduationMonth`, {
                          required: !isStillEnrolled && "Graduation month is required",
                          validate: (value) =>
                            isStillEnrolled || value !== "" || "Please select a month",
                        })}
                        disabled={isStillEnrolled}
                        className={`appearance-none w-full border bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none
                        focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 text-sm md:text-base
                        ${isStillEnrolled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${errors.education?.[index]?.graduationMonth ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    {errors.education?.[index]?.graduationMonth && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].graduationMonth.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="text-[12px] text-black">GRAD YEAR</label>
                    <div className="relative w-full">
                      <select
                        {...register(`education.${index}.graduationYear`, {
                          required: !isStillEnrolled && "Graduation year is required",
                          validate: (value) =>
                            isStillEnrolled || value !== "" || "Please select a year",
                        })}
                        disabled={isStillEnrolled}
                        className={`appearance-none w-full border bg-gray-50 px-3 py-3 pr-10 rounded-md outline-none
                        focus:border-b-4 border-b-sky-600 focus:shadow-lg shadow-sky-100 transition-all duration-300 text-sm md:text-base
                        ${isStillEnrolled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${errors.education?.[index]?.graduationYear ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    {errors.education?.[index]?.graduationYear && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].graduationYear.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Still Enrolled Checkbox */}
              <div className="still-enrolled w-full flex items-center gap-1.5">
                <input
                  type="checkbox"
                  id={`education.${index}.stillEnrolled`} // Add ID for label association
                  {...register(`education.${index}.stillEnrolled`)}
                />
                <label
                  htmlFor={`education.${index}.stillEnrolled`} // Associate label with checkbox
                  className="text-[12px] text-black cursor-pointer"
                >
                  Still Enrolled
                </label>
              </div>

              {/* Remove Education Button */}
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                  className="text-red-500 mt-2 text-sm hover:underline"
                >
                  Remove Education
                </button>
              )}
            </div>
          );
        })}

        {/* Add New Education Button */}
        <button
          type="button"
          onClick={() => {
            append({
              schoolName: "",
              schoolLocation: "",
              degree: "",
              fieldOfStudy: "",
              graduationMonth: "",
              graduationYear: "",
              stillEnrolled: false,
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Another Education
        </button>

        {/* Example Submit Button for this step
        {/* This button would typically be in a parent component that handles the overall form submission for all steps */}
        {/* <button
          type="submit" // Set type to submit to trigger handleSubmit(onSubmit)
          className={`ml-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition
            ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`} // Optionally disable button if form is invalid
          disabled={!isValid} // Disable if validation fails
        >
          Save Education
        </button>  */}
      </form>
    </div>
  );
};

export default StepEducation;