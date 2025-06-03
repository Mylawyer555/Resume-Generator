// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing builder...");

  const loadingMessages = [
    "Gathering our best templates...",
    "Optimizing your resume layout...",
    "Ensuring seamless PDF generation...",
    "Just a few more seconds...",
    "Almost ready to build!",
  ];

  useEffect(() => {
    // Simulate progress bar filling up over the 3-second duration
    const interval = 30; // Update every 30ms
    const totalSteps = 3000 / interval; // Assuming 3000ms total timeout in App.jsx
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep += 1;
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(newProgress);

      if (newProgress > 75) {
        setLoadingText(loadingMessages[4]);
      } else if (newProgress > 50) {
        setLoadingText(loadingMessages[3]);
      } else if (newProgress > 25) {
        setLoadingText(loadingMessages[2]);
      } else if (newProgress > 10) {
        setLoadingText(loadingMessages[1]);
      } else {
        setLoadingText(loadingMessages[0]);
      }

      if (currentStep >= totalSteps) {
        clearInterval(progressTimer);
      }
    }, interval);

    return () => clearInterval(progressTimer); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 text-white p-4">
      {/* Optional: Add a simple spinner */}
      <svg className="animate-spin h-12 w-12 text-blue-300 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>

      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">Your Professional Resume, Reimagined.</h1>
      <p className="text-lg md:text-xl text-center max-w-md mb-8">
        {loadingText}
      </p>

      {/* Progress Bar Container */}
      <div className="w-64 bg-blue-500 rounded-full h-3">
        <div
          className="bg-amber-400 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="mt-2 text-sm text-blue-200">{Math.round(progress)}% Complete</span>
    </div>
  );
};

export default LoadingScreen;