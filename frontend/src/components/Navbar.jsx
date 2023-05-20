import React, { useState,useContext } from "react";
import { NavLink } from "react-router-dom";
import { LocationContext } from "./Contexts/LocationContext";
import { SearchContext } from "./Contexts/SearchContext";
function Navbar() {
  const {setLoc,loc} = useContext(LocationContext);
const {search, setSearch} = useContext(SearchContext);
  return <div className="nav">
    <h3 className="brand"> Book<span>et</span></h3>
    <input type="search" placeholder="Location" className="location" value={loc} onChange={function(e) { setLoc(e.target.value); }} />
    <input type="search" placeholder="Search" className="search" value={search} onChange={function(e) {setSearch(e.target.value);}} />
    <NavLink to="/signup" className="nav-links">
      Sign In
    </NavLink>
    <NavLink to="/upload" className="but-right nav-links">
    Sell
    </NavLink>
    <NavLink to="/account" className="but-right nav-links account">
    <img src="https://images4.alphacoders.com/131/thumbbig-1312296.webp" alt="profile" className="profile"/>
    </NavLink>
  </div>
}
export default Navbar;