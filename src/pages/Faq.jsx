import React, { useState } from 'react';

const faqData = [
  {
    question: "What is this Resume Generator?",
    answer: "Our Resume Generator is a user-friendly online tool designed to help you create professional and impactful resumes quickly and efficiently. It guides you through each section, from personal details to experience, education, and skills.",
  },
  {
    question: "How does it work?",
    answer: "Simply follow the step-by-step process: input your information into the guided fields, see a real-time preview of your resume, and then download it in your preferred format. Our intuitive interface makes resume building straightforward, even if you have no design experience.",
  },
  {
    question: "Is the Resume Generator free to use?",
    answer: "Yes, the core features of our Resume Generator, including creating and downloading your resume in PDF format, are completely free. We believe everyone deserves access to tools that help them succeed in their job search.",
  },
  {
    question: "What resume formats can I download?",
    answer: "Currently, you can download your finished resume as a high-quality PDF, which is universally accepted by employers and ensures your formatting remains consistent across all devices.",
  },
  {
    question: "Is my personal data safe?",
    answer: "We prioritize your privacy. Your data is processed directly in your browser. We do not store your personal information on our servers. You are in control of your data, and it is never shared with third parties.",
  },
  {
    question: "Can I edit my resume after creating it?",
    answer: "Yes! If you save your resume (e.g., through a 'Save Progress' or 'Download Project File' feature), you can re-upload or load it later to make edits. For transient sessions, ensure you download your resume before closing the browser tab if you don't have an account.",
  },
  {
    question: "What kind of templates or designs are available?",
    answer: "Our generator offers a selection of modern and professional templates. These designs are crafted to be clean, readable, and appealing to recruiters, allowing you to choose one that best fits your industry and personal style.",
  },
  {
    question: "Do I need to create an account to use it?",
    answer: "You can create a resume and download it without an account. However, creating a free account allows you to save multiple resumes, access them from different devices, and manage your versions efficiently.",
  },
  {
    question: "I encountered an issue. How can I get support?",
    answer: "If you face any issues or have questions not covered here, please reach out to our support team. You can usually find a 'Contact Us' link or email address in the footer of the page or in the main navigation.",
  },
];

const FAQPage = () => {
  // State to manage the currently open accordion item's index.
  // null means no item is open.
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the accordion item's open/closed state
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-amber-300 rounded-lg shadow-sm overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-5 text-left text-lg font-medium text-gray-800 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index} // Accessibility attribute
              aria-controls={`faq-content-${index}`} // Accessibility attribute
            >
              <h3 className="flex-1">{item.question}</h3>
              <span className="text-amber-400 text-2xl ml-4">
                {openIndex === index ? '−' : '+'} {/* Unicode minus and plus */}
              </span>
            </button>

            {/* Conditionally render content based on openIndex */}
            {openIndex === index && (
              <div
                id={`faq-content-${index}`} // Accessibility ID
                role="region" // Accessibility role
                aria-labelledby={`faq-header-${index}`} // Accessibility attribute
                className="px-5 pb-5 pt-2 bg-gray-50 text-gray-700 text-base"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;