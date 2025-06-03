import MultiStepForm from '../components/MultiStepForm'
import LoadingScreen from '../components/LoadingScreen'
import { useState, useEffect } from 'react';

const ResumePage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // --- Add these console logs for debugging ---
  console.log("ResumePage: Rendered. Current states: showLoader =", showLoader, ", showForm =", showForm);

  useEffect(() => {
    console.log("ResumePage useEffect: Component mounted or re-rendered with relevant deps. Starting timer.");

    const timer = setTimeout(() => {
      console.log("ResumePage setTimeout: Callback executed. Attempting to hide loader and show form.");
      setShowLoader(false); // Hide the loader
      setShowForm(true);    // Show the MultiStepForm
      console.log("ResumePage setTimeout: States updated. Check re-render.");
    }, 3000); // Ensure this duration matches your LoadingScreen's assumed duration

    return () => {
      console.log("ResumePage useEffect cleanup: Clearing timer.");
      clearTimeout(timer);
    };
  }, []); // Empty dependency array means this effect runs ONLY ONCE after initial render

  return (
    <>
      {showLoader ? (
        <LoadingScreen />
      ) : (
        <div className='grid grid-cols-1'>
          {showForm && <MultiStepForm />}
        </div>
      )}
    </>
  );
};

export default ResumePage;