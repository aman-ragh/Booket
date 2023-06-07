import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LocationContext } from "./Contexts/LocationContext";
import { SearchContext } from "./Contexts/SearchContext";
import { AccountContext } from "./Contexts/AccountContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./url";
function Navbar() {
  const Navigate = useNavigate();
  const { account, setAccount } = useContext(AccountContext);


  const [url, setUrl] = useState("https://images4.alphacoders.com/131/thumbbig-1312296.webp");
  const { setLoc, loc } = useContext(LocationContext);
  const { search, setSearch } = useContext(SearchContext);

  const token=localStorage.getItem("token");
    if(!token){
        Navigate("/signin");
    }
    useEffect(()=>{
        if(!token){
            Navigate("/signin");
        }
        axios.get("/api/accountBackend",{headers:{Authorization:token}}).then(res=>{
            // console.log(" res ",res);
            setAccount(res.data.user);
        }).catch(err=>{
            console.error(err);
            // Navigate("/signin");
        });
        
    },[token]);

  return <div className="nav">
    <p className="brand"> Book<span>et</span></p>
    <input type="search" placeholder="Location" className="location" value={loc} onChange={function (e) { setLoc(e.target.value); }} />
    <input type="search" placeholder="Search" className="search" value={search} onChange={function (e) { setSearch(e.target.value); }} />
    <NavLink to="/signin" className="nav-links nav-but">
      SignIn
    </NavLink>
    <NavLink to="/upload" className="but-right nav-links nav-but">
      Sell
    </NavLink>
    <NavLink to="/account" className="but-right nav-links account nav-but">
      <img src={url} alt="profile" className="profile" />
    </NavLink>
    <div class="dropdown">
      <img src="https://firebasestorage.googleapis.com/v0/b/booket-25151.appspot.com/o/profileImages%2Fhamburger.pngd285dec7-fc52-48c2-9cb8-b9cee102e14e?alt=media&token=552962af-1e2f-472f-98d4-3d4b65cd1f3e" alt="menu" class="dropbtn" />
      <div class="dropdown-content">
        <NavLink to="/signin" className="nav-links">
          SignIn
        </NavLink>
        <hr />
        <NavLink to="/upload" className="but-right nav-links">
          Sell
        </NavLink>
        <hr />

        <NavLink to="/account" className="but-right nav-links account">
          {/* <img src={url} alt="profile" className="profile" /> */}
          Account
        </NavLink>
      </div>
    </div>
  </div>
}
export default Navbar;