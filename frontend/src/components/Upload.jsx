import React, { useState } from 'react'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import axios from 'axios';

function Upload() {
    const [image, setImage] = useState(null);
    const [bookName, setBookName] = useState(null);
    const [price, setPrice] = useState(null);
    const [city, setCity] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    const uploadImage = async(e) => {
        if (image == null) {
            return alert("Please select an image");
        }
        const storageRef = ref(storage, `productImages/${image.name + v4()}`);
        const link=await uploadBytes(storageRef, image).then((snapshot) => {
            const l= getDownloadURL(snapshot.ref).then((downloadURL) => {
                // alert("url is "+downloadURL);
                console.log('File available at', downloadURL);
                return downloadURL;
            }).catch((error) => {
                console.log(error);
                return -1;
            });
            alert("Image uploaded successfully");
            console.log(snapshot);
            return l;
        }).catch((error) => {
            console.log(error);
        }
        );
        return link;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(bookName);
        const productImageUrl=await uploadImage();
        console.log("imageUrl",productImageUrl);
        const username="aman";
        axios.post("/uploadBackend", { username,bookName, price, city, mobileNumber, productImageUrl })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        
        
        
    }

    return (
        <div>
            <form method='POST'>
                <label for="file">Image</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <br/>
                <label for="bookName">Book Name</label>
                <input type="text" onChange={(e) => setBookName(e.target.value)} />
                <br/>
                
                <label for="">Price</label>
                <input type="text" onChange={(e) => setPrice(e.target.value)} />
                <br/>
                
                <label for="">City</label>
                <input type="text" onChange={(e) => setCity(e.target.value)} />
                <br/>
                
                <label for="">Mobile Number</label>
                <input type="text" onChange={(e) => setMobileNumber(e.target.value)} />
                <br/>
                
                <button onClick={handleSubmit} type="submit">Submit</button>
            </form>

        </div>
    )
}

export default Upload