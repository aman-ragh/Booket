import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import Product from "./Product";
import axios from "axios";
import { LocationContext } from "./Contexts/LocationContext";
import { SearchContext } from "./Contexts/SearchContext";
function Home() {
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
  return (
    <div>
      <LocationContext.Provider value={{ loc, setLoc }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Navbar />
          <h1>{loc}</h1>
          <h1>{search}</h1>
          {products.map((productt) => {
            const items = productt.product;
            return items.map((item) => {
              return (((search === null || search === "") && item.city.toLowerCase().includes(loc.toLowerCase())) || item.city.toLowerCase().includes(loc.toLowerCase()) && item.bookName.toLowerCase().includes(search.toLowerCase())) ?
                (<Product bookName={item.bookName} price={item.price} city={item.city} productImageUrl={item.productImageUrl} />) : null;
            });
          })
          }
        </SearchContext.Provider>
      </LocationContext.Provider>      
    </div>
  );
}

export default Home;

