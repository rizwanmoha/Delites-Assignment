import React, { useState } from 'react';
import SignInImage from "../Pictures/SignIn.png"
import "./SignIn.css"
import axios from 'axios';

export default function SignIn() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async () => {
        try {
            console.log(email);
            console.log(password);
            const response = await axios.post('your_api_endpoint', {
                email,
                password
            });
            console.log('API response:', response.data);
            // Handle successful sign-in
        } catch (error) {
            console.error('Error:', error);
            // Handle sign-in error
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
                    <input type="text" placeholder='Email'  value={email} onChange={handleEmailChange} />
                </div>
                <div className="SignInComponentMainComponentInputFeilds">
                    <input type="text" placeholder='Password' value={password} onChange={handlePasswordChange} />
                </div>
                <div className="SignInComponentMainComponentButtons">
                    <button className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnDark" onClick={handleSignIn}>Sign In</button>
                    <div className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnLight">Sign Up</div>
                </div>
            </div>
        </div>
    )
}
