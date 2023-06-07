import React, {  useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { backendUrl } from "./url";
function Signup() {
  const Navigate = useNavigate();
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  // const [profilePic, setProfilePic] = useState(null);
  const [otp, setOtp] = useState(null);
  const [otpStatus, setOtpStatus] = useState("Send OTP");
  const [verificationStatus, setVerificationStatus] = useState("Verify");
  const [signState, setSignState] = useState(false);
  const [url, setUrl] = useState("https://images4.alphacoders.com/131/thumbbig-1312296.webp");
  const [correctOtp, setCorrectOtp] = useState(null);
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (username == null) {
      alert("Please enter email");
      return;
    }
    axios.post(backendUrl+"/sendEmailOtp", { username }).then((res) => {
      console.log(res.data);
      setOtpStatus("Sent");
      setCorrectOtp(res.data.otp);
      // console.log("correctOtp", correctOtp);
    }).catch((err) => {
      console.log(err);
      setOtpStatus("Resend OTP");
    });
  }
  const handleOtpVerification = (e) => {
    e.preventDefault();
    console.log("otp", otp);
    console.log("correctOtp", correctOtp);
    if (otp == null) {
      alert("Please enter otp");
      return;
    }
    else if (otp === correctOtp) {
      setVerificationStatus("Verified");
    }
    else {
      alert("Incorrect OTP");
    }
  }

  const uploadImage = (e) => {
    const profilePic = e.target.files[0];
    if (profilePic == null) {
      return alert("Please select an profilePic");
    }
    const storageRef = ref(storage, `profileImages/${profilePic.name + v4()}`);
    const link = uploadBytes(storageRef, profilePic).then((snapshot) => {
      const l = getDownloadURL(snapshot.ref).then((downloadURL) => {
        // alert("url is " + downloadURL);
        console.log('File available at', downloadURL);
        setUrl(downloadURL);
        return downloadURL;
      }).catch((error) => {
        console.log(error);
        return -1;
      });
      // alert("profilePic uploaded successfully");
      console.log(snapshot);
      return l;
    }).catch((error) => {
      console.log(error);
    }
    );
    return link;
  }
  // const handleProfilePic = (e) => {
  //   console.log(e.target.files[0]);
  //   setProfilePic(e.target.files[0]);
  //   // const profileImageUrl =  uploadImage();

  //   // // const profileImageUrl =  uploadImage();
  //   // // setUrl(profileImageUrl);

  // }
  // var profileImageUrl = null;
  // useEffect((e) => {
  //   if(profilePic!=null){
  //     const profileImageUrl =  uploadImage();
  //     console.log(profileImageUrl);
  //   // setUrl(profileImageUrl);
  //   // console.log("url",url);
  //   }
  // }, [profilePic]);

  // useEffect(() => {
  // }, [url]);

  const handleSignup = (e) => {
    e.preventDefault();
    const profileImageUrl = url;
    // console.log("imageUrl", profileImageUrl);
    if (verificationStatus !== "Verified") {
      alert("Please verify your email");
      return;
    }
    if (name == null || username == null || password == null) {
      alert("Please fill all the fields");
      return;
    }

    axios.post(backendUrl+"/signupBackend", { name, username, password, profileImageUrl })
      .then((res) => {
        console.log(res.data);
        alert("Signup successful  so please SignIn");
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Retry Signup");
        setSignState(true);
        
        // Navigate("/signup");
      });

  }
  const handleSignin = (e) => {
    e.preventDefault();
    axios.post(backendUrl+"/signinBackend", { username, password })
      .then((res) => {
        // console.log(res.data);
        localStorage.clear();
        const token = res.data.token;
        console.log("sign in token is ",token);
        console.log("given username is ",username);
        console.log("username ",res.data.username);
        localStorage.setItem("token", token);
        alert("Signin successful");
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Retry Signin");
        Navigate("/signup");
      });
  }
  return (
    <div
      className="sign-body"
    >
      



      <div class={signState ? "container right-panel-active" : "container"} id="container">
        <div class="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <p className="toSignin" onClick={() => setSignState(false)}>Already registered</p>
            <div className="profile-container">

              <label for="profile-input">
                <img src={url} alt="pic" />
              </label>
              <input type="file" onChange={uploadImage} placeholder="Profile Pic" id="profile-input" hidden />
            </div>
            <input type="text" className="name signup-name" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
            <input type="email" className="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} required />
            <h4 onClick={handleSendOtp} >{otpStatus}</h4>
            <input type="text" className="otp" onChange={(e) => setOtp(e.target.value)} placeholder="OTP" required />
            <h4 onClick={handleOtpVerification}>{verificationStatus}</h4>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" onClick={handleSignup}>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#">
            <h1>Sign In</h1>
            <p className="toSignup" onClick={() => setSignState(true)} >Not Registered</p>
            
            <input type="email" className="name" onChange={(e) => setUsername(e.target.value)} placeholder="Email" required />

            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            {/* <a href="#">Forgot your password?</a> */}
            <button type="submit" onClick={handleSignin}>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => setSignState(false)}>Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={() => setSignState(true)} className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup