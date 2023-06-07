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
    const products=account.product;
    if(!token ){
      Navigate("/signin");
  }
    useEffect(() => {
      if(!token ){
          Navigate("/signin");
      }
      
      axios.get("/accountBackend",{headers:{Authorization:token}}).then(res=>{
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
    <>
    <div className="account-container">
        <div className="account-img">
            <img src={account.profileImageUrl} alt="profile" />
        </div>
        <div className="account-details">
        <h1>{account.name}</h1>
        <h4>{account.username}</h4>
        </div>
    </div>
    <div className="books-container">
        {!products?null:products.map((product)=>{
          return <Product bookName={product.bookName} price={product.price} city={product.city} productImageUrl={product.productImageUrl} />
          })}
    </div>

    
    
    </>
  )
}

export default Account