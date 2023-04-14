import React ,{useState} from 'react'

function Signin() {
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
  return (
    <div>Signin
    <form>
        <label>Email: </label>
        <input type="email" placeholder="Email" onChange={(e)=>setUsername(e.target.value)}/>
        <label>Password: </label>
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Signin</button>
        
    </form>
    </div>
  )
}

export default Signin