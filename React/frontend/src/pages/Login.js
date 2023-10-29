import './Login.css';
import PhoneIcon from './icons/phone-icon.png';
import BrandLogo from './icons/brand-logo.png';
import KeyIcon from './icons/key-icon.jpg';

import React from 'react';

import { Toast } from '../components/Toast';
import { useState } from 'react';


export const Login = () => {
    const [toastMsg, setToastMsg] = useState('');
    const showToast = (Msg) => {
        setToastMsg(Msg);
        setTimeout(() => {
            setToastMsg('');
        }, 3000);
    };
    
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    
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
    
    const submitButtonClicked = () => {
        if (otpSent) {
            console.log(`Phone: ${phoneNo} OTP : ${otp}`);
        } 
        else if(isCorrectPhoneNumber(phoneNo)) {
            setOtpSent(true);
            showToast(`An OTP Code Has Been Sent To Your Phone No   ${phoneNo}`);
        }
        else{
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
            {toastMsg && <Toast message={toastMsg}/>}
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
