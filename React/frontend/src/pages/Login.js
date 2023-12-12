import './Login.css';
import PhoneIcon from './icons/phone-icon.png';
import BrandLogo from './icons/brand-logo.png';
import KeyIcon from './icons/key-icon.jpg';

import React from 'react';
import Axios from 'axios'

import { useState } from 'react';


import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from "react-router-dom";


const isCorrectPhoneNumber = (phoneNo) => {
    if (phoneNo.length < 11 || phoneNo.length === 12 || phoneNo.length > 14) {
        return false;
    }
    if (phoneNo.length === 13 && !phoneNo.startsWith("88")) {
        return false;
    }
    if (phoneNo.length === 14 && !phoneNo.startsWith("+88"))  {
        return false;
    }

    if (phoneNo.length > 11) {
      phoneNo = phoneNo.slice(-11);
    }

    const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];
    if (!validPrefixes.includes(phoneNo.substring(0, 3)))  {
        return false;
    }

    if (!phoneNo.substring(3).split("").every((char) => !isNaN(char)))  {
        return false;
    }
    return true;
}

export const Login = () => {

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    
    const { authData } = useContext(AuthContext);
    const {authToken, saveAuthToken, showToast} = authData;
    
    if(authToken != null) {
        return <Navigate to='/'/>
    }

    const tryToLogin = async () => {
        try{
            const response = await Axios.post("http://127.0.0.1:8000/api/token/", {
                'phone_number' : phoneNo,
                'otp' : otp,
                "password" : "4321" 
            });
            
            const data = ('data' in response) && (await response.data);
            saveAuthToken(data);

            if(response.status === 200) {
                return [true, "Loged in Successfully"];
            }
            else {
                return [false, "Enter OTP carefully! Something went wrong."]
            }
        }
        catch (e) {
            console.error("Exception: ", e);
            return [false, "Enter OTP carefully! Something went wrong."]
        }
    }

    const sentOTP = async (phoneNo) => {
        const response = await Axios.post("http://127.0.0.1:8000/api/send-otp/", {
            'phone_number' : phoneNo,
        });
        const data = ('data' in response) && (await response.data);
        
        return [data['status']==='OK', data['message']];
    };
    
    const submitButtonClicked = async () => {
        if (otpSent) {
            const [status, message] = await tryToLogin();
            showToast(message);

            if(status) {
                return <Navigate to='/'/>
            }
        } 
        else if (isCorrectPhoneNumber(phoneNo)) {
            setOtpSent(true);
            const [isOtpSent, message] = await sentOTP(phoneNo);
            if (!isOtpSent) {
                setOtpSent(false);
            }
            showToast(message);
        } else {
            showToast("Please Enter A Correct Phone Number.");
        }
    };

    const backButtonClicked = () => {
        setOtpSent(false);      
        setOtp("");
        setPhoneNo("");
    };

    return (
        <div className="container">
            <div className="brand">
                <img src={BrandLogo} alt="Logo" />
                <h1>
                    <span className="bold">Al</span>
                    <span className="light">pona</span>
                </h1>
            </div>
            <p className="tagline">Sign In With A Phone Number</p>
            <div className="form-container">
                <div className="input-container">
                    <img src={otpSent ? KeyIcon : PhoneIcon} alt="Phone Icon" />
                    <input
                        type="text"
                        placeholder={otpSent ? "OTP Code" : "Phone Number"}
                        value={otpSent ? otp : phoneNo}
                        className="input-box"
                        onChange={(event) => {
                            if (otpSent) {
                                setOtp(event.target.value);
                            } else {
                                setPhoneNo(event.target.value);
                            }
                        }}
                    />
                </div>
                <button className="login-button" onClick={submitButtonClicked}>
                    {otpSent ? "Submit" : "Login"}
                </button>
                {otpSent ? (
                    <button className="login-button" onClick={backButtonClicked}>
                        Back
                    </button>
                ) : null}
            </div>
        </div>
    );
};
