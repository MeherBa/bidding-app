import React, {useState, useLayoutEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom'

const BidProduct = ({socket}) => {
  const {name, price, productId} = useParams()
  const [newPrice, setAmount] = useState(price)
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [user, setUser] = useState("");

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
		getUsername();
	}, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Number(newPrice) > Number(price)) {
      if(newPrice > Number(price)) {
      socket.emit("updatePrice", { newPrice, user, productId })
      navigate("/products")
    } else {
      setError(true)
    }
    } else {
			console.log("Error!", "New price must be more than the bidding price");
		}
    
  }
  
  return (
    <div>
      <div className='bidproduct__container'>
        <h2>Place a Bid</h2>
        <form className="bidProduct__form" onSubmit={handleSubmit}>

          <h3 className='bidProduct__name'>{name}</h3>

          <label htmlFor='newPrice'>Bidding Amount</label>
          {error && <p style={{color: "red"}}>The bidding amount must be greater than {price}</p>}
          <input type="number" name='newPrice' value={newPrice} onChange={e => setAmount(e.target.value)} required/>

          <button className='bidProduct__cta'>SEND</button>
        </form>
        </div>
    </div>
  )
}

export default BidProduct