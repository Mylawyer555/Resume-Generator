import { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import { toast } from "react-toastify";

const ResumeContext = createContext();

const initialFormData = {
  selectedTemplate: "classic", // Default template
  personal: {
    firstname: '',
    lastname: '',
    district: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    email: ''
  },
  summary: "",
  experiences: [
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
  skills: [], // Initialize as an empty array
  
};

export const ResumeProvider = ({ children }) => {
  // set the state of the form data
  const [formData, setFormData] = useState(() => {
    try {
        const storedData = localStorage.getItem("resumeData");
        return storedData ? JSON.parse(storedData) : initialFormData;
    } catch (error) {
        console.error("Failed to parse resume data from localStorage:", error);
        toast.error("Failed to load resume data from localStorage. Please start over.");
        return initialFormData; // Return initial form data if parsing fails
    }
  })
    

  //auto save on every change
  useEffect(() => {
    try {
        localStorage.setItem("resumeData", JSON.stringify(formData));
         console.log("localStorage updated with formData:", formData);
    } catch (error) {
        toast.error("Failed to save resume data to localStorage:", error)
    }
  }, [formData]);

   const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  //clear form data
  const resetFormData = () => {
    setFormData(initialFormData);
   try {
    localStorage.removeItem("resumeData");
    console.log("Form data cleared and localStorage updated.");
    
   } catch (error) {
    console.error("Failed to clear localStorage:", error);
   }
  };

  return (
    <ResumeContext.Provider value={{ formData, setFormData, updateFormData, resetFormData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};