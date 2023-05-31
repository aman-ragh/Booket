import React, { useState, useContext,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LocationContext } from "./Contexts/LocationContext";
import { SearchContext } from "./Contexts/SearchContext";
import { AccountContext } from "./Contexts/AccountContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const Navigate = useNavigate();
  const {account, setAccount} = useContext(AccountContext);
  
  
  const [url, setUrl] = useState("https://images4.alphacoders.com/131/thumbbig-1312296.webp");
  const { setLoc, loc } = useContext(LocationContext);
  const { search, setSearch } = useContext(SearchContext);
  const token=localStorage.getItem("token");
  
  useEffect(() => {
    // const token=localStorage.getItem("token");
    console.log("navbar token",token);
    if(token){
      axios.get("/accountBackend",{headers:{Authorization:token}}).then(res=>{
        console.log(res);
        console.log("navbar username",res.data.user.username);
        if(res.data.user.profileImageUrl) setUrl(res.data.user.profileImageUrl);
        const user=res.data.user;
        setAccount(user);
      }).catch(err=>{
        console.error(err);
      });
    }
  }, [token]);
  
  return <div className="nav">
    <h3 className="brand"> Book<span>et</span></h3>
    <input type="search" placeholder="Location" className="location" value={loc} onChange={function (e) { setLoc(e.target.value); }} />
    <input type="search" placeholder="Search" className="search" value={search} onChange={function (e) { setSearch(e.target.value); }} />
    <NavLink to="/signin" className="nav-links">
      Sign In
    </NavLink>
    <NavLink to="/upload" className="but-right nav-links">
      Sell
    </NavLink>
    <NavLink to="/account" className="but-right nav-links account">
      <img src={url} alt="profile" className="profile" />
    </NavLink>
  </div>
}
export default Navbar;