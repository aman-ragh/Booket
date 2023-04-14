import React,{useState} from "react";
import { NavLink,Outlet } from "react-router-dom";
import axios from "axios";
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

function Signup() {
    const [name, setName] = useState(null);
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [profilePic,setProfilePic] = useState(null);
    const uploadImage = async(e) => {
      if (profilePic == null) {
          return alert("Please select an profilePic");
      }
      const storageRef = ref(storage, `profileImages/${profilePic.name + v4()}`);
      const link=await uploadBytes(storageRef, profilePic).then((snapshot) => {
          const l= getDownloadURL(snapshot.ref).then((downloadURL) => {
              // alert("url is "+downloadURL);
              console.log('File available at', downloadURL);
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
    const handleSubmit = async(e) => {
        e.preventDefault();
        const profileImageUrl=await uploadImage();
        console.log("imageUrl",profileImageUrl);
        axios.post("/signupBackend",{name,username,password,profileImageUrl})
        .then((res) => {
          console.log(res.data);
          alert("Signup successful");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  return (
    <div>
    <h1>Signup</h1>
    
    <form>
    <label >Profile Pic: </label>
    <input type="file" placeholder="Profile Pic" onChange={(e)=>setProfilePic(e.target.files[0])} />
    <label >Name:</label>
    <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)} />
    <label >Email:</label>
    <input type="email" placeholder="Email" onChange={(e)=>setUsername(e.target.value)}/>
    <label >Password:</label>
    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
    <button onClick={handleSubmit} type="submit">Signup</button>
    </form>
    
    
    </div>
  )
}

export default Signup