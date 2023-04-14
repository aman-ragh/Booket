import React from 'react'
function Product(props) {
  
  return (
    <div className="product">
    {/* <h1>{props.city}</h1> */}
      <div className="card product-card" style={{width: "20rem" , height:"20rem"}}>
      {/* <div className="product-img"> */}
      <img src={props.productImageUrl} className="card-img-top product-img" alt="..." />
      {/* </div> */}
        <div className="card-body product-details">
          <h2 className="card-title book-price">{props.price}  <span>Rs</span></h2>
          {/* <p className="card-text">City: {props.city}</p> */}
          <p className="card-text book-name">{props.bookName}</p>
          {/* <a href="www.google.com" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  )
}

export default Product