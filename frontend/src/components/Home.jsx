import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import Product from "./Product";
import axios from "axios";
import { LocationContext } from "./Contexts/LocationContext";
import { SearchContext } from "./Contexts/SearchContext";
import Loader from "./Loader";
import { backendUrl } from "./url";
function Home() {
  const [loader, setLoader] = useState(true);
  const [loc, setLoc] = useState("Indore");
  const [search, setSearch] = useState(null);
  const [products, setProducts] = useState();



  axios.get(backendUrl + "/productsBackend")
    .then((res) => {
      // console.log(res.data);
      setProducts(res.data.result);
      // console.log("products", products);
      
    })
    .catch((err) => {
      console.log(err);
    });

  
  if (!products) {
    return <Loader />;
  }
  return (
    <div>
      <LocationContext.Provider value={{ loc, setLoc }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Navbar />
          <div className="home-products-container">

            {products && products.map((productt) => {
              const items = productt.product;
              return items && items.map((item) => {
                return (((search === null || search === "") && item.city.toLowerCase().includes(loc.toLowerCase())) || (item.city.toLowerCase().includes(loc.toLowerCase()) && item.bookName.toLowerCase().includes(search.toLowerCase()))) ?
                  (<Product bookName={item.bookName} price={item.price} city={item.city} productImageUrl={item.productImageUrl} mobileNumber={item.mobileNumber} />) : null;
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

