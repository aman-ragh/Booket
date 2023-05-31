import React, { useEffect, useState,useContext } from "react";
import Navbar from "./Navbar"
import Product from "./Product";
import axios from "axios";
import { LocationContext } from "./Contexts/LocationContext";
import { SearchContext } from "./Contexts/SearchContext";
import { AccountContext } from "./Contexts/AccountContext";
import Loader from "./Loader";

function Home() {
  const [loader,setLoader]=useState(true);
  const [loc, setLoc] = useState("g");
  const [search, setSearch] = useState(null);
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    axios.get("/productsBackend")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.result);
        console.log("products", products);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);
  setTimeout(() => {
    setLoader(false);
  },2000);
  if(loader){
    return <Loader/>;
  }
  return (
    <div>
      <LocationContext.Provider value={{ loc, setLoc }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Navbar />
          <div className="home-products-container">
            
          {products.map((productt) => {
            const items = productt.product;
            return items.map((item) => {
              return (((search === null || search === "") && item.city.toLowerCase().includes(loc.toLowerCase())) || item.city.toLowerCase().includes(loc.toLowerCase()) && item.bookName.toLowerCase().includes(search.toLowerCase())) ?
                (<Product bookName={item.bookName} price={item.price} city={item.city} productImageUrl={item.productImageUrl} mobileNumber={item.mobileNumber}/>) : null;
            });
          })
          }
          </div>
          
        </SearchContext.Provider>
      </LocationContext.Provider>      
    </div>
  );
}

export default Home;

