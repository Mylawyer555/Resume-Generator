import React, { useState, useRef, forwardRef, useImperativeHandle } from "react"; // Add forwardRef, useImperativeHandle
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useResume } from '../context/ResumeContext';
import { Templates } from "../templates/Template";
import { toast } from "react-toastify";

// Wrap the component with forwardRef
const StepPreview = forwardRef(({ updateFormData, formData }, ref) => { // Accept updateFormData, formData props
  const { formData: resumeData } = useResume(); // Get the latest formData from context
  const [loading, setLoading] = useState(false);
  const previewContentRef = useRef(); // Renamed to avoid conflict with outer ref
  const navigate = useNavigate();

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    triggerDownload: handleDownload // Expose handleDownload as triggerDownload
  }));

  // Find the selected template component based on formData.selectedTemplate
  const SelectedTemplateComponent = Templates.find(
    (t) => t.id === resumeData.selectedTemplate
  )?.component;

  const handleDownload = () => {
    setLoading(true);
    if (!previewContentRef.current) {
        console.error("Preview content not available for PDF generation.");
        setLoading(false);
        return;
    }

    const pdfOptions = {
        margin: [10, 10, 10, 10],
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(previewContentRef.current).set(pdfOptions).save().then(() => {
      setLoading(false);
    }).catch(error => {
        console.error("PDF generation failed:", error);
        setLoading(false);
        toast.error("Failed to generate PDF. Please try again.");
    });
  };

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-4xl font-extrabold">
        Preview Your Resume
      </h2>
      <p className="text-sm md:text-base">
        Here’s a preview of your resume. You can download it as a PDF.
      </p>

      {/* Render the selected template component inside this ref div */}
      <div
        ref={previewContentRef} // This ref is for the content to be captured by html2pdf
        className="resume-preview mt-6 p-4 rounded-lg border border-gray-300 overflow-auto"
        style={{ minHeight: '600px', maxHeight: '80vh' }}
      >
        {SelectedTemplateComponent ? (
          <SelectedTemplateComponent formData={resumeData} /> // Pass context formData
        ) : (
          <p className="text-center text-gray-500">
            Please select a template from the first step to preview your resume.
          </p>
        )}
      </div>

      {/* The download button here is still useful for direct action on the page */}
      <div className="mt-4">
        <button
          onClick={handleDownload}
          disabled={loading || !SelectedTemplateComponent}
          className={`px-6 py-2 rounded-md transition ${
            loading || !SelectedTemplateComponent
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Generating PDF..." : "Download PDF (from preview)"}
        </button>
      </div>
    </div>
  );
}); // Don't forget to close forwardRef

export default StepPreview;