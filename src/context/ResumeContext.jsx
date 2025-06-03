import { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import { toast } from "react-toastify";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  // set the state of the form data
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem("resumeData");
      return savedData
        ? JSON.parse(savedData)
        : {
            personal: {},
            education: [],
            experience: [],
            skills: [],
            summary: "",
            selectedTemplate: null,
          };
    } catch (error) {
        toast.error("Failed to parse resume from Local storage", error);
        return {};

    }
  });

  //auto save on every change
  useEffect(() => {
    try {
        localStorage.setItem("resumeData", JSON.stringify(formData));
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
  const clearFormData = () => {
    localStorage.removeItem("resumeData");
    setFormData({
      personal: {},
      education: [],
      experience: [],
      skills: [],
      summary: "",
      selectedTemplate: null,
    });
  };

  return (
    <ResumeContext.Provider value={{ formData, setFormData, updateFormData, clearFormData }}>
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