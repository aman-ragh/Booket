import React,{useState} from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Loader from "./Loader";

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
