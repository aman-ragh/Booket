import React from 'react'
import {useLocation} from 'react-router-dom';
function Book(props) {
    const location=useLocation();
    const  book=location.state.book;
  return (
    <div>
    <div className="container book-container">
        <div className="img-container">
            <img src={book.productImageUrl} alt="book" />
        </div>
        <div className="book-description">
        <h3>Book :</h3>
        <h1>{book.bookName}</h1>
        <h3>Price :</h3>
        <h1>₹ {book.price}</h1>
        <h3>City :</h3>
        <h1>{book.city}</h1>
        <h3>Contact No. :</h3>
        <h1>{book.mobileNumber}</h1>
        </div>
    </div>
    </div>
  )
}

export default Book