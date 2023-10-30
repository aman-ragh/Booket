import React,{useEffect,useState,useContext} from 'react'
import Product from './Product';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Loader from './Loader';
import { AccountContext } from './Contexts/AccountContext';
import { backendUrl } from './url';
function Account() {
  const {account,setAccount}=useContext(AccountContext);
    const token=localStorage.getItem("token");
    const Navigate=useNavigate();
    const [loader, setLoader] = useState(true);
    // const [myName, setMyName] = useState("Aman Raghuwanshi");
    // const [myEmail, setMyEmail] = useState("ajlfja@gmail.com");
    // const [myProfileUrl, setMyProfileUrl] = useState("https://images4.alphacoders.com/131/thumbbig-1312296.webp");
    // const [myBooks, setMyBooks] = useState([]);
    
    if(!token ){
      Navigate("/signin");
  }
  setTimeout(() => {
    setLoader(false);
  }, 2000);
   
      
      axios.get(backendUrl+"/accountBackend",{headers:{Authorization:token}}).then(res=>{
          // console.log("account res ",res);
          setAccount(res.data.user);
          setLoader(false);
      }).catch(err=>{
          console.error(err);
          Navigate("/signin");
      });
      function logout(){
        localStorage.removeItem("token");
        Navigate("/");
      }
      const products=account.product;
    const user_id =account.user_id;
    
    if(loader){
      return <Loader/>;
    }
    return (
    <>
    <div className="account-container">
        <div className="account-img">
            <img src={account.profileImageUrl} alt="profile" />
        </div>
        <div className="account-details">
        <h1>{account.name}</h1>
        <h4>{account.username}</h4>
        <img src='https://firebasestorage.googleapis.com/v0/b/booket-25151.appspot.com/o/profileImages%2Fpower.png?alt=media&token=ee6acf69-d301-4d89-819b-b27431244e1b' onClick={logout} className="logout" alt="log out"/>
        </div>
    </div>
    <div className="books-container">
        {!products?null:products.map((product)=>{
          return <Product bookName={product.bookName} price={product.price} city={product.city} productImageUrl={product.productImageUrl} user_id={user_id} product_id={product._id} mobileNumber={product.mobileNumber} className="todelete" isLogin={true}/>
          })}
    </div>

    
    
    </>
  )
}

export default Account