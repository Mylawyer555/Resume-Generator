import React,{useState, useContext, createContext, Children} from "react";


const ResumeContext = createContext();

export const ResumeProvider = ({Children}) =>{
    // set the state of the form data
    const [formData, setFormData] = useState({
        personal: {},
        education: [],
        experience: [],
        skills:[],
        summary:'',
    });

    return (
        <ResumeContext.Provider value={{formData, setFormData}}>
            {Children}
        </ResumeContext.Provider>
    )
};

export const useResume = () => useContext(ResumeContext);



