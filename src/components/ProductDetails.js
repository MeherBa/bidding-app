import React, { useState, useLayoutEffect, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'

const ProductDetails = ({ socket }) => {
  const { productId } = useParams()
  const [error, setError] = useState(false)
  const [user, setUser] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setAmount] = useState(0)

  const getUsername = async () => {
    try {
      const value = await localStorage.getItem("userName");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error("Error while loading username!");
    }
  };

  useLayoutEffect(() => {
    function fetchProduct() {
      fetch("https://pewter-sordid-net.glitch.me:4000/product/" + productId)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
    fetchProduct();
    getUsername();
  }, []);

  useEffect(() => {
    socket.on("getProduct", (data) => setProduct(data));
  }, []);


  const handleSubmit = (bidAmount) => (e) => {
    console.log(bidAmount);
    e.preventDefault()
    socket.emit("bid", { bidAmount, user, productId })
  };

  return (
    <div>
      {loading ? (

        <h3>
          Loading ...
        </h3>

      ) : (
        <div className='bidproduct__container'>
          <h2>Place a Bid</h2>
          <h3 className='bidProduct__name'>Product : {product.name}</h3>
          <h3 className='bidProduct__owner'>Owner : {product.owner}</h3>
          <h3 className='bidProduct__price'>Price : {product.price}</h3>
          <h3 className='bidProduct__lastBidder'>Last bidder : {product.last_bidder}</h3>


          <button className='bidProduct__cta' onClick={handleSubmit(10)}>+10</button>
          <button className='bidProduct__cta'>+20</button>
          <button className='bidProduct__cta'>+30</button>
        </div>
      )}
    </div>
  )
}

export default ProductDetails