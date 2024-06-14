import React, { useState } from "react";
import SignUpImage from "../Pictures/SignUp.png";
// import SignUpImag from "../../Pictures/SignIn.png"
import "./SignIn.css";
import axios from "axios";
import { toast } from 'react-toastify';


interface FormData {
    firstName: string;
    lastName: string;
    password: string;
    retypePassword: string;
    contactMode: string;
    email: string;
    otp: string
  }


export default function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        password: "",
        retypePassword: "",
        contactMode: "",
        email: "",
        otp : ""
      });
      const [showModal, setShowModal] = useState<boolean>(false);
      const [showForm , setShowForm] = useState<boolean>(true);
      const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };


    //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    
    //     try {
    //       const response = await axios.post("your_api_endpoint", formData);
    //       console.log("API response:", response.data);
    //       // Handle successful API response
    //     } catch (error) {
    //       console.error("Error:", error);
    //       // Handle API error
    //     }
    //   };
    const handleSignUp = async () => {
        try {

            console.log(formData);
          const response = await axios.post("http://localhost:5000/api/v1/signup", formData);
          if(response.status==404){
            toast.info('User Already exist please login to proceed');
            return ;
          }
          else if(response.status==400){
            toast.info('Validation failed ');
            return ;

          }

          console.log("here is coming");
          setShowForm(false);
          setShowModal(true);
        } catch (error) {
          console.error("Error:", error);
          // Handle signup error
        }
      };

      const handleOtp = async () => {
        try {
          // Assuming you have otpFormData defined elsewhere in your component
          console.log(formData);
    
          const response = await axios.post("http://localhost:5000/api/v1/verify-otp", formData);
    
          if(response.status==200){
            toast.info('Otp verified successfully ');
          }
          else if(response.status==400){
            toast.info("Otp expired please re enter the details");
          }
          else if(response.status==409){
            toast.info("Otp not verified please enter correct otp")
          }
          // Handle response as needed
          console.log("OTP verification successful");
        } catch (error) {
          console.error("Error:", error);
          // Handle OTP verification error
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
            <option value="option1">Email</option>
            <option value="option2">Phone</option>
          </select>
        </div>

        <div className="SignInComponentMainComponentInputFeilds">
          <input type="email" name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange} />
        </div>
        <div className="SignInComponentMainComponentButtons">
          {/* <div className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnDark"> */}
            <button className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnDark" onClick={handleSignUp}>
                Sign up
            </button>
          {/* </div> */}
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
            name="otpInput"
            placeholder="OTP"
          />
        </div>
        <button className="otpButton" onClick={handleOtp}>
                Verify
        </button>
           
            </div>
            {/* Additional content in the modal */}
          </div>
        </div>
      )}
    </>

  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import SignUpImage from "../Pictures/SignUp.png";
// import "./SignIn.css";

// interface FormData {
//   firstName: string;
//   lastName: string;
//   password: string;
//   retypePassword: string;
//   contactMode: string;
//   email: string;
// }

// export default function SignUp() {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     password: "",
//     retypePassword: "",
//     contactMode: "",
//     email: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//         console.log(formData);
//       const response = await axios.post("your_api_endpoint", formData);
//       console.log("API response:", response.data);
//       // Handle successful API response
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle API error
//     }
//   };

//   return (
//     <div className="SignInComponentWrapper">
//       <div className="SignInComponentImageContainer">
//         <img src={SignUpImage} alt="" />
//       </div>
//       <div className="SignInComponentMainComponent">
//         <div className="SignInComponentMainComponentTopLabel">
//           Let Us Know <span className="SignInComponentHighLightSpan">!</span>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="SignInComponentMainComponentInputFeilds">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="SignInComponentMainComponentInputFeilds">
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="SignInComponentMainComponentInputFeilds">
//             <input
//               type="password"
//               name="password"
//               placeholder="Set Password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="SignInComponentMainComponentInputFeilds">
//             <input
//               type="password"
//               name="retypePassword"
//               placeholder="Retype Password"
//               value={formData.retypePassword}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="SignInComponentMainComponentInputFeilds">
//             <input
//               type="text"
//               name="contactMode"
//               placeholder="Contact Mode"
//               value={formData.contactMode}
//               onChange={handleInputChange}
//             />
//             <select
//               name="contactMode"
//               value={formData.contactMode}
//               onChange={handleInputChange}
//             >
//               <option value="Email">Email</option>
//               <option value="Phone">Phone</option>
//             </select>
//           </div>
//           <div className="SignInComponentMainComponentInputFeilds">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="SignInComponentMainComponentButtons">
//             <button
//               type="submit"
//               className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnDark"
//             >
//               Sign Up
//             </button>
//             <button
//               type="button"
//               className="SignInComponentMainComponentBtn SignInComponentMainComponentBtnLight"
//             >
//               Sign In
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

