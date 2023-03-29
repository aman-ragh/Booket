import React from 'react'

function Product(props) {
  
  return (
    <div className="product">
    {/* <h1>{props.city}</h1> */}
      <div className="card product-card" style={{width: "20rem" , height:"20rem"}}>
        <img src={props.productImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h2 className="card-title">Book: {props.bookName}</h2>
          {/* <p className="card-text">City: {props.city}</p> */}
          <p className="card-text">Price: {props.price}</p>
          {/* <a href="www.google.com" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  )
}

export default Product