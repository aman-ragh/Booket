import React, { useState,useContext } from "react";
import { NavLink } from "react-router-dom";
import { LocationContext } from "./Contexts/LocationContext";
import { SearchContext } from "./Contexts/SearchContext";
function Navbar() {
  const {setLoc,loc} = useContext(LocationContext);
const {search, setSearch} = useContext(SearchContext);
  return <div className="nav">
    <h3 className="brand"> Booket</h3>
    <input type="search" placeholder="Location" className="location" value={loc} onChange={function(e) { setLoc(e.target.value); }} />
    <input type="search" placeholder="Search" className="search" value={search} onChange={function(e) {setSearch(e.target.value);}} />
    <NavLink to="/signin">
      <button type="button" className="btn but ">Sign In</button>
    </NavLink>
    <NavLink to="/signup" className="but-right">
      <button type="button" className="btn but ">Sign Up</button>
    </NavLink>
    <NavLink to="/upload" className="but-right">
      <button type="button" className="btn but sell">Sell</button>
    </NavLink>
  </div>
}
export default Navbar;