import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(){
    return <div className="nav">
        <h3 className="brand"> docify</h3>
        <NavLink to="/login">
        <button type="button" className="btn but ">Sign In</button>
      </NavLink>
      <NavLink to="/signup" className="but-right">
        <button type="button" className="btn but ">Sign Up</button>
        </NavLink>
    </div>
}
export default Navbar;