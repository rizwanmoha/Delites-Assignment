
import React, { useState } from "react";
import SignUpImage from "../Pictures/SignUp.png";
import "./SignIn.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
    firstName: string;
    lastName: string;
    password: string;
    retypePassword: string;
    contactMode: string;
    email: string;
    otp: string;
}

export default function SignUp() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        password: "",
        retypePassword: "",
        contactMode: "",
        email: "",
        otp: ""
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(true);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async () => {
      const { firstName, lastName, password, retypePassword, contactMode, email } = formData;

     
      if (!firstName || !lastName || !password || !retypePassword || !contactMode || !email) {
          toast.error("Please fill all the details");
          return;
      }

     
      if (password !== retypePassword) {
          toast.error("Passwords do not match");
          return;
      }
        try {
            
            const response = await axios.post("http://localhost:5000/api/v1/signup", formData);
            
            
            if (response.status==201) {
                toast('User Already exist please login to proceed');
                return;
            } 
             if (response.status == 202) {
                toast('Validation failed');
                return;
            }

          
            toast("Please verify your email for registering");
         
            setShowForm(false);
            setShowModal(true);
            
        } catch (error) {
            toast("Server error");
           
        }
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOtpVerification = async () => {
        try {
           
            const response = await axios.post("http://localhost:5000/api/v1/verify-otp", formData);

            if (response.status == 201) {
              
                toast('Otp verified successfully');
                setTimeout(() => {
                  navigate('/signin');
              }, 1000);
            } else if (response.status === 200) {
                toast("Otp expired please re enter the details");
            } else if (response.status === 202) {
                toast("Otp not verified please enter correct otp");
            }
            
        } catch (error) {
            toast("Server error")
        }
    };

    return (
        <>
      { showForm && (
    <div className="SignInComponentWrapper">
      <div className="SignInComponentImageContainer">
        <img src={SignUpImage} alt="" />
      </div>
      <div className="SignUpComponentMainComponent">
        <div className="SignInComponentMainComponentTopLabel">
          Let Us Know <span className="SignInComponentHighLightSpan">!</span>
        </div>
        <div className="SignInComponentMainComponentInputFeilds">
          <input type="text" name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange} />
        </div>
        <div className="SignInComponentMainComponentInputFeilds">
          <input type="text" 
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange} />
        </div>
        <div className="SignInComponentMainComponentInputFeilds">
          <input type="password"  name="password"
            placeholder="Set Password"
            value={formData.password}
            onChange={handleInputChange} />
        </div>
        <div className="SignInComponentMainComponentInputFeilds">
          <input type="password" name="retypePassword"
            placeholder="Retype Password"
            value={formData.retypePassword}
            onChange={handleInputChange} />
        </div>
        <div className="SignInComponentMainComponentInputFeilds">
          <input type="text" name="contactMode"
            placeholder="Contact Mode"
            value={formData.contactMode}
            onChange={handleInputChange} />
          <select name="contactMode"
            value={formData.contactMode}
            onChange={handleInputChange}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        <div className="SignInComponentMainComponentInputFeilds">
          <input type="email" name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange} />
        </div>
        <div className="SignInComponentMainComponentButtons">
          
            <button className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnDark" onClick={handleSignUp}>
                Sign up
            </button>
       
          <div className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnLight">
            Sign In
          </div>
        </div>
      </div>

      
    </div>
    )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <div className="OtpContent">
                            <h1 className="otpHeading">OTP Send </h1>
                            <div className="input-group">
                                <label htmlFor="otpInput">Enter OTP:</label>
                                <input
                                    type="text"
                                    id="otpInput"
                                    name="otp"
                                    placeholder="OTP"
                                    value={formData.otp}
                                    onChange={handleOtpChange}
                                />
                            </div>
                            <button className="otpButton" onClick={handleOtpVerification}>
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
}