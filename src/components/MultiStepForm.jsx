import react, { useState } from "react";
import StepEducation from "./StepEducation";
import StepExperience from "./StepExperience";
import StepPersonal from "./StepPersonal";
import StepReview from "./StepReview";
import StepSkills from "./StepSkills";
import StepSummary from "./StepSummary";
import { useResume } from "../context/ResumeContext";

const steps = [
  StepPersonal,
  StepExperience,
  StepEducation,
  StepSkills,
  StepSummary,
  StepReview,
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {formData, setFormData} = useResume();
  

  const Step = steps[currentStep];
  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
    alert("Resume data saved!");
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <Step formData={formData} updateFormData={updateFormData} />


      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="btn-secondary"
          >
            Back
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="btn-primary"
          >
            Next
          </button>
        ) : (
            <button 
            onClick={handleSubmit}
            className="btn-primary"
            >
                Submit
            </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;