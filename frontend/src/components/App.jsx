import React,{useState,useContext} from "react";
import Home from "./Home";
// import Login from "./Login";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
// import UserLogin from "./UserLogin";
// import OrganisationLogin from "./OrganisationLogin";
// import UserSignup from "./UserSignup";
// import UserWelcome from "./UserWelcome";
// import AdminLogin from "./AdminLogin";
// import AdminRoute from "./AdminRoute";
// import Signup from "./Signup";
// import OrganisationSignup from "./OrganisationSignup";
import Loader from "./Loader";
// import OrganisationCreate from "./OrganisationCreate";
// import OrganisationRoute from "./OrganisationRoute";
import Upload from "./Upload";
import Signup from "./Signup";
import Account from "./Account";
import Book from "./Book";
import { AccountContext } from "./Contexts/AccountContext";
function App() {
  const [account,setAccount]=useState({});
  return (
    <BrowserRouter>
       <AccountContext.Provider value={{account,setAccount}} >
    
    <div className="centre">
      <Routes>
        {/* <Route path="/login" element={<Login />}>
        <Route index element={<UserLogin />} />
          <Route path="userLogin" element={<UserLogin/>}/>
          <Route path="organisationLogin" element={<OrganisationLogin/>}/>
        </Route>
        <Route path="/signup" element={<Signup />}>
          <Route index element={<UserSignup />} />
          <Route path="userSignup" element={<UserSignup/>}/>
          <Route path="organisationSignup" element={<OrganisationSignup/>}/>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/organisationRoute" element={<OrganisationRoute />} />
       <Route path="/userWelcome" element={<UserWelcome />} /> 
       <Route path="/adminLogin" element={<AdminLogin />} /> 
       <Route path="/adminRoute" element={<AdminRoute />} > 
       <Route index element={<OrganisationCreate/>} />
       <Route path="organisationCreate" element={<OrganisationCreate />} />
       </Route> */}
       {/* <Route path="/organisationCreate" element={<OrganisationCreate />} /> */}
       <Route path="/" element={<Home />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/signin" element={<Signup />} />
        <Route path="/account" element={<Account/>} />
        <Route path="/book" element={<Book/>} />
       <Route path="*" element={<h1>404 Not Found</h1>} />
       
      </Routes>
    </div>
    </AccountContext.Provider>
    
    </BrowserRouter>
  );
}

export default App;
