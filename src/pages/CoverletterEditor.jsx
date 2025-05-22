import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import LexicalEditor from "../components/LexicalTextEditor";

const templates = [
  {
    id: 1,
    title: "Professional",
    body: `I am excited to apply for the [Position] at [Company]. With my proven track record in ...`,
  },
  {
    id: 2,
    title: "Creative",
    body: `Dear [Hiring Manager], I'm passionate about bringing innovation and collaboration into ...`,
  },
  {
    id: 3,
    title: "Minimalist",
    body: `To whom it may concern, I am reaching out regarding the position of ...`,
  },
];

const CoverLetterEditor = () => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("cover-letter");
    return saved
      ? JSON.parse(saved)
      : {
          recipientName: "",
          recipientCompany: "",
          position: "",
          body: "",
          senderName: "",
        };
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cover-letter", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTemplateSelect = (templateBody) => {
    setForm((prev) => ({ ...prev, body: templateBody }));
  };

  const handleDownloadPDF = () => {
    const content = document.getElementById("preview-content");
    if (content) {
      html2pdf()
        .from(content)
        .set({
          margin: 0.5,
          filename: "cover_letter.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cover Letter Editor</h1>
        <button
          onClick={() => navigate("/templates")}
          className="text-sm text-yellow-600 hover:underline"
        >
          ← Back to Templates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Editor */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <input
            name="recipientName"
            value={form.recipientName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Recipient's Name"
          />
          <input
            name="recipientCompany"
            value={form.recipientCompany}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Company"
          />
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Position"
          />
          <LexicalEditor
            value={form.body}
            onChange={(val) => setForm({ ...form, body: val })}
          />
          <input
            name="senderName"
            value={form.senderName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="Your Name"
          />

          <div className="flex justify-between gap-4 mt-4">
            <button
              onClick={handleDownloadPDF}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded w-full"
            >
              Save & Download
            </button>
          </div>

          <div className="pt-4">
            <h3 className="font-semibold mb-2">Choose a template:</h3>
            <div className="flex flex-col gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTemplateSelect(t.body)}
                  className="text-left border px-4 py-2 rounded hover:bg-yellow-100 transition"
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
          <div
            id="preview-content"
            className="bg-gray-50 border p-4 rounded space-y-4"
          >
            <p>Dear {form.recipientName || "Hiring Manager"},</p>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap">
              {form.body || "Start writing your cover letter..."}
            </div>
            <p>Sincerely,</p>
            <p className="font-medium">{form.senderName || "Your Name"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
