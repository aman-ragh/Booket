import React,{useEffect,useState} from 'react'
import Product from './Product';
function Account() {
    const [myName, setMyName] = useState("Aman Raghuwanshi");
    const [myEmail, setMyEmail] = useState("ajlfja@gmail.com");
    const [myProfileUrl, setMyProfileUrl] = useState("https://images4.alphacoders.com/131/thumbbig-1312296.webp");
  return (
    <>
    <div className="account-container">
        <div className="account-img">
            <img src={myProfileUrl} alt="profile" />
        </div>
        <div className="account-details">
        <h1>{myName}</h1>
        <h4>{myEmail}</h4>
        </div>
    </div>
    <div className="books-container home-products-container">
        <Product bookName="The Alchemist" price="200" city="Gwalior" productImageUrl="https://images-na.ssl-images-amazon.com/images/I/51ZU%2BCvkTyL._SX324_BO1,204,203,200_.jpg" />
        <Product bookName="The Alchemist" price="200" city="Gwalior" productImageUrl="https://images-na.ssl-images-amazon.com/images/I/51ZU%2BCvkTyL._SX324_BO1,204,203,200_.jpg" />
        <Product bookName="The Alchemist" price="200" city="Gwalior" productImageUrl="https://images-na.ssl-images-amazon.com/images/I/51ZU%2BCvkTyL._SX324_BO1,204,203,200_.jpg" />
        
        <Product bookName="The Alchemist" price="200" city="Gwalior" productImageUrl="https://images-na.ssl-images-amazon.com/images/I/51ZU%2BCvkTyL._SX324_BO1,204,203,200_.jpg" />
        
    </div>

    
    
    </>
  )
}

export default Account