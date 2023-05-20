import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });
function Signup() {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  // const [profilePic, setProfilePic] = useState(null);
  const [signState, setSignState] = useState(false);
  const [url, setUrl] = useState("https://images4.alphacoders.com/131/thumbbig-1312296.webp");
  
  const uploadImage = (e) => {
    const profilePic = e.target.files[0];
    if (profilePic == null) {
      return alert("Please select an profilePic");
    }
    const storageRef = ref(storage, `profileImages/${profilePic.name + v4()}`);
    const link = uploadBytes(storageRef, profilePic).then((snapshot) => {
      const l = getDownloadURL(snapshot.ref).then((downloadURL) => {
        alert("url is "+downloadURL);
        console.log('File available at', downloadURL);
        setUrl(downloadURL);
        return downloadURL;
      }).catch((error) => {
        console.log(error);
        return -1;
      });
      alert("profilePic uploaded successfully");
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
  
  const handleSignup =  (e) => {
    e.preventDefault();
    const profileImageUrl = url;
    // console.log("imageUrl", profileImageUrl);
    
    axios.post("/signupBackend", { name, username, password, profileImageUrl})
      .then((res) => {
        console.log(res.data);
        alert("Signup successful");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleSignin = (e) => {
    e.preventDefault();
  }
  return (
    <div 
    className="sign-body"
    >
      {/* <h1>Signup</h1>

      <form>
        <label >Profile Pic: </label>
        <input type="file" placeholder="Profile Pic" onChange={(e) => setProfilePic(e.target.files[0])} />
        <label >Name:</label>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <label >Email:</label>
        <input type="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
        <label >Password:</label>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSubmit} type="submit">Signup</button>
      </form> */}



      {/* <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> */}
      <div class={signState ? "container right-panel-active":"container"} id="container">
        <div class="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div class="social-container">
              {/* <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
            </div>
            {/* <span>or use your email for registration</span> */}
            <div className="profile-container">
            
            <label for="profile-input">
            <img src={url}  alt="pic" />
            </label>
            <input type="file" onChange={uploadImage} placeholder="Profile Pic" id="profile-input"  hidden/>
            </div>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={handleSignup}>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div class="social-container">
              {/* <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
            </div>
            {/* <span>or use your account</span> */}
            <input type="email" onChange={(e)=>setUsername(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            {/* <a href="#">Forgot your password?</a> */}
            <button type="submit" onClick={handleSignin}>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={()=>setSignState(false)}>Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={()=>setSignState(true)} className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup