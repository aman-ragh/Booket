import React,{useEffect,useState} from "react";
import Navbar from "./Navbar"
import Product from "./Product";
import axios from "axios";
function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/productsBackend")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.result);
        console.log("products",products);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);
    return (
      <div>
      <Navbar/>
       {products.map((productt) => {
        const items = productt.product;
        return items.map((item) => {
          return (<Product bookName={item.bookName} price={item.price} city={item.city} productImageUrl={item.productImageUrl} />);
        });
       })
       }
      </div>
    );
  }
  
  export default Home;