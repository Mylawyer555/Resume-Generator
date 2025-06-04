import {createContext, useContext, useState} from "react"
import { toast } from "react-toastify";

// create context for authentication
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // state that hold user data
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("clients");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // login function to authenticate user
    const login = (userData) => {
        // store user in localstorage
        localStorage.setItem('clients', JSON.stringify(userData));
        // update user state
        setUser(userData);
    }

    //logout function
    const logout = () => {
        // clear user data from localstorage
        localStorage.removeItem('clients');
        //update state of the user
        setUser(null);
        window.location.href('/'); 
    };

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);