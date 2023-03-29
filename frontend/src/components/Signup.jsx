import React,{useState} from "react"
import { NavLink,Outlet } from "react-router-dom"
import axios from "axios"

function Signup() {
    const [name, setName] = useState(null);
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/signupBackend",{name,username,password})
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