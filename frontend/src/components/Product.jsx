import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Product(props) {
  
  return (
    
    <>
    <NavLink to="/book" state={{book:props}}
    className="navlink" >
      
    <div class="product-container" >
      <div class="product-card">
      <div class="product-image">
        <img src={props.productImageUrl} className="" alt="img" />
      </div>
      <div class="product-content">
        <div class="product-details">
          <h2> ₹ {props.price}</h2>
          <h4>{props.bookName}</h4>
        </div>
      </div>
    </div>
    </div>
    </NavLink>
    </>
    
  )
}

export default Product