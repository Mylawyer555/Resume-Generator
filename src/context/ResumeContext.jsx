import { useEffect } from "react";
import {useState, useContext, createContext} from "react";


const ResumeContext = createContext();

export const ResumeProvider = ({children}) =>{
    // set the state of the form data
    const [formData, setFormData] = useState(() =>{
        const savedData = localStorage.getItem("resumeData");
        return savedData ?
        JSON.parse(savedData) : 
    {
        personal: {},
        education: [],
        experience: [],
        skills:[],
        summary:'',
    }});

    //auto save on every change
    useEffect(() => {
        localStorage.setItem("resumeData", JSON.stringify(formData))
    },[formData])

    //clear form data
    const clearFormData = () =>{
        localStorage.removeItem("resumeData");
        setFormData({
            personal: {},
            education: [],
            experience: [],
            skills:[],
            summary:'',
        })
    }

    return (
        <ResumeContext.Provider value={{formData, setFormData}}>
            {children}
        </ResumeContext.Provider>
    )
};

export const useResume = () => useContext(ResumeContext);



