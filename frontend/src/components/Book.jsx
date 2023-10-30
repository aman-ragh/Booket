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
  // if(props.isLogin || book.isLogin){
  //   console.log("isLogin is true");
  // }
  console.log("props ",props);
  console.log("book ",book);
  console.log("user_id : ",book.user_id);
  console.log("product_id : ",book.product_id);
  setTimeout(() => {
    setLoader(false);
  }, 2000);
    useEffect(() => {
      if(!token ){
          Navigate("/signin");
      }
      axios.get(backendUrl+"/accountBackend",{headers:{Authorization:token}}).then(res=>{
          // console.log("account res ",res);
          setAccount(res.data.user);
          setLoader(false);
      }).catch(err=>{
          console.error(err);
          setLoader(false);
          Navigate("/signin");
      });
  }, []);

  function deleteBook(){
    //  console.log("delete book");
     
    axios.post(backendUrl+"/deleteBook",{user_id:book.user_id,product_id:book.product_id},{headers:{Authorization:token}}).then(res=>{
      // console.log("delete res ",res);
      Navigate("/account");
    }).catch(err=>{
      console.error(err);
      alert("Error in deleting book");
    });
  }
    if(loader){
      return <Loader/>;
    }
    // console.log("mobile: ",book.mobileNumber);
  return (
    <div className="book-in">
      
    <div className="container book-container">
    {book.isLogin===true?
              <img onClick={deleteBook} src='https://firebasestorage.googleapis.com/v0/b/booket-25151.appspot.com/o/profileImages%2Ftrash.png?alt=media&token=9a6ddbe5-4fd7-4b34-bafc-0d12c87da5b1' alt="delete" className="deleteBook"
                style={{cursor:"pointer",width:"40px",height:"auto",float:"right",zIndex:"1000",position:"absolute",top:"25px",right:"25px"}}
              />
            :null}
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