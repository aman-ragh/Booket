import React, { useState } from "react";
import { NavLink ,Outlet} from "react-router-dom";

function Login() {
    
    return (
        <div class="">
        <nav>
            <NavLink to="userLogin">
                User
            </NavLink>
            <NavLink to="organisationLogin">
                Orgainsation
            </NavLink>
        </nav>
        <Outlet/>
        </div>);
}

export default Login;