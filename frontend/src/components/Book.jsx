import React from 'react'
import {useLocation} from 'react-router-dom';
function Book(props) {
    const location=useLocation();
    const p=props.location.state.mydata;
    const key = location.state.mydata;
  return (
    <div>
    {p}
        {key}
    </div>
  )
}

export default Book