import { createContext, useState } from "react";

import Axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    // const [user, setUser] = useState({
    //     username : "01303206223",
    //     fullname : "Shourav Ahmed",
    //     email : "aa.shourav23@gmail.com",
    //     address : "193/3, Tejkunipara, Farmgate.",
    //     isLogedin: true
    // });

    let [authToken, setAuthToken] = useState(null)
    let [user, setUser] = useState(null)

    let authData = {
        user,
    }

    let loginUser = async (event) => {
        const response = await Axios.post("http://127.0.0.1:8000/api/token/", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
    }

    return (
        // <AuthContext.Provider value={{user, setUser}}>
        <AuthContext.Provider value={{authData}}>
            {children}
        </AuthContext.Provider>
    )
}
