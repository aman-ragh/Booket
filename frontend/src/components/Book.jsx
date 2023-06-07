import React,{useState,useEffect,useContext} from 'react'
import {useLocation} from 'react-router-dom';
import { AccountContext } from './Contexts/AccountContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Loader from './Loader';
import { backendUrl } from './url';
function Book(props) {
    const location=useLocation();
    const  book=location.state.book;
    const {account,setAccount}=useContext(AccountContext);
    const token=localStorage.getItem("token");
    const Navigate=useNavigate();
    const [loader, setLoader] = useState(true);
    const products=account.product;
    console.log("account products is ",products);
    if(!token ){
      Navigate("/signin");
  }
    useEffect(() => {
      if(!token ){
          Navigate("/signin");
      }
      axios.get(backendUrl+"/accountBackend",{headers:{Authorization:token}}).then(res=>{
          // console.log("account res ",res);
          setAccount(res.data.user);
      }).catch(err=>{
          console.error(err);
          Navigate("/signin");
      });
  }, []);

    setTimeout(() => {
        setLoader(false);
    }, 3000);
    if(loader){
      return <Loader/>;
    }
  return (
    <div className="book-in">
      
    <div className="container book-container">
        <div className="img-container">
            <img src={book.productImageUrl} alt="book" />
        </div>
        <div className="book-description">
        <h3>Book :</h3>
        <h1>{book.bookName}</h1>
        <h3>Price :</h3>
        <h1>₹ {book.price}</h1>
        <h3>City :</h3>
        <h1>{book.city}</h1>
        <h3>Contact No. :</h3>
        <h1>{book.mobileNumber}</h1>
        </div>
    </div>
    </div>
    
  )
}

export default Book