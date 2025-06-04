import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useResume } from "../context/ResumeContext";

const preWrittenSummaries = [
  {
    category: "Software Engineering",
    summaries: [
      "Detail-oriented software engineer with experience in full-stack development, focused on building scalable and efficient applications.",
      "Creative and analytical problem solver with a passion for delivering clean and maintainable code in fast-paced environments.",
    ],
  },
  {
    category: "Marketing",
    summaries: [
      "Marketing specialist with a track record of successful campaigns, data-driven strategies, and customer engagement.",
      "Strategic thinker with a knack for identifying market trends and crafting impactful messaging across channels.",
    ],
  },
  {
    category: "Finance",
    summaries: [
      "Finance professional with strong analytical skills and experience in budgeting, forecasting, and investment strategies.",
      "Results-oriented individual with expertise in financial modeling, planning, and risk assessment.",
    ],
  },
];

const StepSummary = ({ updateFormData, formData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSummaries, setFilteredSummaries] = useState(preWrittenSummaries);
  const [aiGeneratedTopic, setAiGeneratedTopic] = useState(""); // State to hold the topic for AI summary generation

  const {
    register,
    watch,
    setValue, // <--- Destructure setValue from useForm
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      summary: formData.summary || "",
    },
  });

  const watchedSummaryText = watch("summary"); // <--- Correctly watch the 'summary' field

  useEffect(() => {
    // Only update if watchedSummaryText is defined (not null/undefined)
    if (watchedSummaryText !== undefined) {
      updateFormData("summary", watchedSummaryText);
    }
  }, [watchedSummaryText, updateFormData]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = preWrittenSummaries
      .map((cat) => ({
        ...cat,
        summaries: cat.summaries.filter((s) =>
          s.toLowerCase().includes(term.toLowerCase())
        ),
      }))
      .filter((cat) => cat.summaries.length > 0);
    setFilteredSummaries(filtered);
  };

  const generateAiSummary = () => {
    if (!aiGeneratedTopic.trim()) {
      // You might want to add a visual cue or error here
      alert("Please enter a topic for AI summary generation.");
      return;
    }
    // Simulate AI-generated summary
    const generated = `Experienced professional in ${aiGeneratedTopic}, delivering value through innovative solutions, strong communication, and goal-driven execution.`;
    setValue("summary", generated, { shouldValidate: true }); // <--- Use setValue to update the form field and trigger validation
  };

  // Calculate word count from the watched field
  const wordCount = watchedSummaryText.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isBelowMinimum = wordCount < 30;

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-extrabold">
        Finish strong with a clear summary of 2-4 sentences that showcase your
        abilities
      </h2>
      <p className="text-sm md:text-base mb-4">
        Seal the deal with a powerful statement. Write your own, or select from
        the prompts below.
      </p>

      <textarea
        // Apply register with validation rules
        {...register("summary", {
          required: "A professional summary is required.",
          minLength: {
            value: 150, // Minimum character length (approx 30 words * 5 chars/word)
            message: "Summary must be at least 150 characters long.",
          },
          maxLength: {
            value: 500, // Max character length (approx 100 words * 5 chars/word)
            message: "Summary cannot exceed 500 characters.",
          },
          validate: (value) => {
            const currentWordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
            if (currentWordCount < 30) {
              return "Summary must contain at least 30 words.";
            }
            if (currentWordCount > 100) {
              return "Summary cannot exceed 100 words.";
            }
            return true; // Return true if validation passes
          },
        })}
        placeholder="Write your professional summary here..."
        rows={5}
        className={`w-full border p-3 rounded-md focus:border-sky-600 outline-none transition-all duration-300
          ${errors.summary ? 'border-red-500' : 'border-gray-300'}`} 
      />
      {errors.summary && (
        <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
      )}

      <p
        className={`mt-2 text-sm ${
          isBelowMinimum ? "text-red-500" : "text-green-600"
        }`}
      >
        Word count: {wordCount}{" "}
        {isBelowMinimum ? "(Minimum 30 words required)" : "✓"}
      </p>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search summary topics (e.g. software, finance)"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-b-4 border-b-sky-600 transition-all duration-300"
        />
      </div>

      {filteredSummaries.length > 0 && (
        <div className="mt-4 space-y-4">
          {filteredSummaries.map((cat, idx) => (
            <div key={idx}>
              <h4 className="font-semibold">{cat.category}</h4>
              <ul className="space-y-2">
                {cat.summaries.map((sum, i) => (
                  <li
                    key={i}
                    className="cursor-pointer p-2 border rounded hover:bg-sky-50 transition"
                    onClick={() => setValue("summary", sum, { shouldValidate: true })} // <--- Use setValue with validation
                  >
                    {sum}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Not finding the right summary?</h4>
        <div className="flex gap-2 flex-col md:flex-row">
          <input
            type="text"
            placeholder="Enter topic for AI summary..."
            value={aiGeneratedTopic} // Bind input to aiGeneratedTopic state
            onChange={(e) => setAiGeneratedTopic(e.target.value)} // Update aiGeneratedTopic
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-b-4 border-b-sky-600 transition-all duration-300"
          />
          <button
            type="button"
            onClick={generateAiSummary} // Call the function to generate AI summary
            className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all"
          >
            Generate with AI
          </button>
        </div>
        {/* You no longer need to display aiSummary separately, as it's now in the form field */}
      </div>
    </div>
  );
};

export default StepSummary;