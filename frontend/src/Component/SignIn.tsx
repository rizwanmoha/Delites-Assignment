import React, { useState } from 'react';
import SignInImage from "../Pictures/SignIn.png"
import "./SignIn.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../Config';

export default function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const navigate = useNavigate();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleSignUpClick = () => {
        navigate('/signup');
      };

    const handleSignIn = async () => {
        try {
            if (!email || !password) {
                toast.error("Please fill all the fields");
                return;
            }

            const response = await axios.post(`${baseURL}/api/v1/signin`, {
                email,
                password
            });

            if (response.status === 200) {
                toast('User Login successfully');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else if (response.status === 201) {
                toast('Password not matched');
            } else if (response.status === 202) {
                toast("Email is not registered");
            } else if (response.status === 203) {
                toast("Email is not valid");
            }
        } catch (error) {
            toast.error('server error');
           
        }
    };

    return (
        <div className='SignInComponentWrapper'>
            <div className="SignInComponentImageContainer">
                <img src={SignInImage} alt="" />
            </div>
            <div className="SignInComponentMainComponent">
                <div className="SignInComponentMainComponentTopLabel">Fill What We Know <span className="SignInComponentHighLightSpan">!</span></div>
                <div className="SignInComponentMainComponentInputFeilds">
                    <input type="text" placeholder='Email' value={email} onChange={handleEmailChange} />
                </div>
                <div className="SignInComponentMainComponentInputFeilds">
                    <input type="text" placeholder='Password' value={password} onChange={handlePasswordChange} />
                </div>
                <div className="SignInComponentMainComponentButtons">
                    <button className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnDark" onClick={handleSignIn}>Sign In</button>
                    <div className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnLight" onClick={handleSignUpClick}>Sign Up</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}