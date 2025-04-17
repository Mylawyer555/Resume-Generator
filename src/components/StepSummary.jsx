import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

const StepSummary = () => {
  const { register, setValue, watch } = useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSummaries, setFilteredSummaries] = useState(preWrittenSummaries);
  const [aiSummary, setAiSummary] = useState("");

  const summaryText = watch("summary") || "";

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

  const generateAiSummary = (topic) => {
    // Simulate AI-generated summary
    const generated = `Experienced professional in ${topic}, delivering value through innovative solutions, strong communication, and goal-driven execution.`;
    setValue("summary", generated);
    setAiSummary(generated);
  };

  const wordCount = summaryText.trim().split(/\s+/).length;
  const isBelowMinimum = wordCount < 30;

  return (
    <div className="w-full px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-extrabold">
        Finish strong with a clear summary of 2-4 sentences that showcase your abilities
      </h2>
      <p className="text-sm md:text-base mb-4">
        Seal the deal with a powerful statement. Write your own, or select from the prompts below.
      </p>

      <textarea
        {...register("summary")}
        placeholder="Write your professional summary here..."
        rows={5}
        className="w-full border border-gray-300 p-3 rounded-md focus:border-sky-600 outline-none transition-all duration-300"
      />

      <p className={`mt-2 text-sm ${isBelowMinimum ? "text-red-500" : "text-green-600"}`}>
        Word count: {wordCount} {isBelowMinimum ? "(Minimum 30 words required)" : "✓"}
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
                    onClick={() => setValue("summary", sum)}
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
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-b-4 border-b-sky-600 transition-all duration-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            onClick={() => generateAiSummary(searchTerm)}
            className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-all"
          >
            Generate with AI
          </button>
        </div>
        {aiSummary && (
          <p className="mt-2 text-sm text-gray-700">
            <strong>Generated Summary:</strong> {aiSummary}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepSummary;
