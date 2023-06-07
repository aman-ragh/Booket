import React, { useState,useContext,useEffect } from 'react'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import axios from 'axios';
import { AccountContext } from './Contexts/AccountContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { backendUrl } from './url';
function Upload() {
    const Navigate=useNavigate();
    const [loader, setLoader] = useState(true);
    const {account,setAccount}=useContext(AccountContext);
    const token=localStorage.getItem("token");
    if(!token){
        Navigate("/signin");
    }
    useEffect(()=>{
        if(!token){
            Navigate("/signin");
        }
        axios.get("/accountBackend",{headers:{Authorization:token}}).then(res=>{
            console.log(" res ",res);
            setAccount(res.data.user);
        }).catch(err=>{
            console.error(err);
            Navigate("/signin");
        });
        
    },[token]);
    
    const [bookName, setBookName] = useState(null);
    const [price, setPrice] = useState(null);
    const [city, setCity] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    const [productImageUrl,setProductImageUrl]=useState("https://th.bing.com/th?id=OIP.xwyRkL-vaRx8aUAQP79eXQAAAA&w=219&h=284&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2");
    setTimeout(() => {
        setLoader(false);
    }, 3000);
    if(loader){
      return <Loader/>;
    }
    const uploadImage = (e) => {
        const image=e.target.files[0];
        if (image == null) {
            return alert("Please select an image");
        }
        const storageRef = ref(storage, `productImages/${image.name + v4()}`);
        const link=uploadBytes(storageRef, image).then((snapshot) => {
            const l= getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setProductImageUrl(downloadURL);
                return downloadURL;
            }).catch((error) => {
                console.log(error);
                return -1;
            });
            console.log(snapshot);
            return l;
        }).catch((error) => {
            console.log(error);
        }
        );
        return link;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(bookName);
        console.log("imageUrl",productImageUrl);
        const username=account.username;
        axios.post("/uploadBackend", { username,bookName, price, city, mobileNumber, productImageUrl },{headers:{Authorization:token}})
            .then((res) => {
                console.log(res.data);
                Navigate("/");
            })
            .catch((err) => {
                console.log(err);
                alert("Retry, some error occured");
                Navigate("/upload");
            });
        
        
        
    }

    return (
        <div className="sign-body">
        <div className="container upload-container">
            <form method='POST'>
            <div className="image-container">
            
            <label for="book-image">
            <img src={productImageUrl} alt="book"/>
            </label>
            <input type="file" id="book-image" onChange={uploadImage} placeholder="Image" hidden />
                
            </div>
            <div className="book-details">
            <br/>
                <input type="text" onChange={(e) => setBookName(e.target.value)} placeholder="Name"/>
                {/* <br/> */}
                
                <input type="text" onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                {/* <br/> */}
                
                <input type="text" onChange={(e) => setCity(e.target.value)} placeholder="City" />
                {/* <br/> */}
                
                <input type="text" onChange={(e) => setMobileNumber(e.target.value)} placeholder="Contact No." />
                <br/>
                
                <button onClick={handleSubmit} type="submit">Submit</button>
            </div>
               
            </form>

        </div>
        </div>
    )
}

export default Upload