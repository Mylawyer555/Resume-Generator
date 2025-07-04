import react, { useEffect, useRef, useState  } from "react";
import StepEducation from "./StepEducation";
import StepExperience from "./StepExperience";
import StepPersonal from "./StepPersonal";
import StepPreview from "./StepReview";
import StepSkills from "./StepSkills";
import StepSummary from "./StepSummary";
import StepTemplateSelection  from "./StepTemplateSelection";
import { useResume } from "../context/ResumeContext";
import { motion } from "framer-motion";

const steps = [
  StepTemplateSelection,
  StepPersonal,
  StepExperience,
  StepEducation,
  StepSkills,
  StepSummary,
  StepPreview,
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {formData, updateFormData} = useResume();
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);


  

    const Step = steps[currentStep];
  
   const previewRef = useRef(null);
    const handleSubmit = () => {
    console.log("Final Resume Data:", formData);
    alert("Resume generation initiated!"); // User feedback

    // If we are on the preview step, trigger the download
    if (currentStep === steps.length - 1 && previewRef.current) {
      previewRef.current.triggerDownload(); // Call a method on StepPreview
    } else {
        // This case should ideally not be hit if the button is only on the last step
        console.warn("Submit pressed on a non-preview step or previewRef not set.");
    }
  };

  // reset valid state when the step changes
  useEffect(() => {
    setIsCurrentStepValid(false);

  },[currentStep]);

  const handleNext = () => {
    if (isCurrentStepValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      alert("Please complete the current step before proceeding.");
    }
  };

  


  return (
    <div 
    
    className="max-w-7xl mx-auto p-4">
      <div className="mb-6 py-[5px] px-2 bg-blue-950 ">
        <div className="text-sm text-gray-200">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="h-2 bg-blue-100 rounded">
          <div
            className="h-full bg-amber-400 rounded"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {currentStep === steps.length - 1 ? (
        <Step
          formData={formData}
          updateFormData={updateFormData}
          ref={previewRef} // Pass the ref to StepPreview for download functionality
          stepIsValid={setIsCurrentStepValid} // Pass the validation setter
        />
      ) : (
        <Step
          formData={formData}
          updateFormData={updateFormData}
          stepIsValid={setIsCurrentStepValid} // Pass the validation setter
        />
      )}


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
            className='primary-btn'
            disabled={!isCurrentStepValid} // Disable if current step is not valid
            
           
            >
                Submit
            </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;