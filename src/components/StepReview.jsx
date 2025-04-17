import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Updated import for react-router-dom v6+
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";

const StepPreview = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeContent, setResumeContent] = useState("<h1>Preview content will be here...</h1>");
  const previewRef = useRef();
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleDownload = () => {
    setLoading(true);
    const doc = new jsPDF();
    doc.html(previewRef.current, {
      callback: function (doc) {
        doc.save("resume.pdf");
        setLoading(false);
      },
      x: 10,
      y: 10,
    });
  };

  const handleDownloadHtml2Pdf = () => {
    setLoading(true);
    html2pdf().from(previewRef.current).save().then(() => setLoading(false));
  };

  const handlePreviewNavigation = () => {
   
    navigate('/next-step'); 
  };

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-4xl font-extrabold">
        Preview Your Resume
      </h2>
      <p className="text-sm md:text-base">
        Here’s a preview of your resume. You can download it as a PDF or go back and make edits.
      </p>

      <div ref={previewRef} className="resume-preview mt-6 p-4 rounded-lg border border-gray-300">
        {/* This is where you can render the actual preview of the resume */}
        <div dangerouslySetInnerHTML={{ __html: resumeContent }} />
      </div>

      <div className="mt-4">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Generating PDF..." : "Download PDF (jsPDF)"}
        </button>
        <button
          onClick={handleDownloadHtml2Pdf}
          disabled={loading}
          className="bg-green-500 text-white px-6 py-2 rounded-md ml-4 hover:bg-green-600 transition"
        >
          {loading ? "Generating PDF..." : "Download PDF (html2pdf)"}
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={handlePreviewNavigation}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
        >
          Go to Next Step
        </button>
      </div>
    </div>
  );
};

export default StepPreview;
