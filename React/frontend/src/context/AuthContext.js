import { createContext, useState } from "react";
import Axios from 'axios';
import { Toast } from '../components/Toast';


export const AuthContext = createContext()

export const  AuthProvider = ({children}) => {
    
    const getLocalAuthToken = () => {
        console.log("getLocalAuthToken");
        const localAuthToken = localStorage.getItem('authTokens');

        console.log(localAuthToken);
        return (localAuthToken ? JSON.parse(localAuthToken) : null);
    }
    const getLocalUserProfile = () => {
        console.log('getLocalUserProfile');
        const localUserProfile = localStorage.getItem('userProfileData');
        
        console.log(localUserProfile);
        return (localUserProfile ? JSON.parse(localUserProfile) : null);
    }
    
    let [authToken, setAuthToken] = useState(getLocalAuthToken());
    let [user, setUser] = useState(getLocalUserProfile());

    const fetchUserProfile = async (authToken) => {
        console.log("fetchUserProfile");
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken.access}`, 
                },
            };
            const response = await Axios.get("http://127.0.0.1:8000/api/get-user/", config);

            console.log(response);

            const userdata = await response.data.user;
    
            console.log(userdata);
            
            setUser(userdata);
            localStorage.setItem('userProfileData', JSON.stringify(userdata)); 
        }
        catch(e) {
            console.log(e);
        }
    }

    let saveAuthToken = async (data) => {
        await fetchUserProfile(data);
        setAuthToken(data);
        localStorage.setItem('authTokens', JSON.stringify(data));
    }

    const refreshToken = async () => {
        console.log('refreshToken');

        try {
          const response = await Axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            'refresh': authToken.refresh,
          });
          
          const {data} = response;
          saveAuthToken(data);

          console.log('refresh token data: ', data);

          return data.access;
        }
        catch (error) {
          console.log("Error refreshing token:", error);
          throw error;
        }
      }
      
      let saveUser = async (data) => {
        console.log("save user: ", data);

        setUser(data);
        localStorage.setItem('userProfileData', JSON.stringify(data));
      
        const config = {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        };
      
        try {
          await Axios.post("http://127.0.0.1:8000/api/update-user/", {
            'phone_number': user.phone_number,
            'full_name': data['full_name'],
            'email': data['email'],
            'address': data['address']
          }, config);

          console.log('profile updated successfully')
        } 
        catch (error) {
          if (error.response && error.response.status === 401) {

            console.log('error occered: ', error);
            
            const newAccessToken = await refreshToken();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            
            console.log('newAccessToken: ', newAccessToken);

            await Axios.post("http://127.0.0.1:8000/api/update-user/", {
              'phone_number': user.phone_number,
              'full_name': data['full_name'],
              'email': data['email'],
              'address': data['address']
            }, config);
          }
        }
      }
      

    const logout = () => {
        localStorage.removeItem('userProfileData');
        localStorage.removeItem('authTokens');

        setAuthToken(null);
        setUser(null);
    }

    const [toastMsg, setToastMsg] = useState('');
    const showToast = (Msg) => {
        setToastMsg(Msg);
        setTimeout(() => {
            setToastMsg('');
        }, 3000);
    };

    let authData = {
        user,
        authToken, 
        saveAuthToken,
        saveUser,
        logout,
        showToast
    }
    return (
        // <AuthContext.Provider value={{user, setUser}}>
        <AuthContext.Provider value={{authData}}>
            {toastMsg && <Toast message={toastMsg}/>}

            {children}
        </AuthContext.Provider>
    )
}
