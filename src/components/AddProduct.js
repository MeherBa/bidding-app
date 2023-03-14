import React, {useState, useLayoutEffect} from 'react'
import {useNavigate} from "react-router-dom"

const AddProduct = ({socket}) => {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [price, setPrice] = useState("")
  const [user, setUser] = useState("");
  const navigate = useNavigate()
  
  const getUsername = async () => {
		try {
			const value = await localStorage.getItem("userName");
      console.log(value);
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
    if (name.trim() && price.trim() && url.trim()) {
      socket.emit('addProduct', {name, price, url, user});
      navigate("/products")
    }
    
  }
  
  return (
    <div>
      <div className='addproduct__container'>
        <h2>Add a new product</h2>
        <form className="addProduct__form" onSubmit={handleSubmit}>
          <label htmlFor='name'>Name of the product</label>
          <input type="text" name='name' value={name} onChange={e => setName(e.target.value)} required/>

          <label htmlFor='price'>Starting price</label>
          <input type="number" name='price' value={price} onChange={e => setPrice(e.target.value)} required/>

          <label htmlFor='url'>Url</label>
          <input type="text" name='url' value={url} onChange={e => setUrl(e.target.value)} required/>
            
          <button className='addProduct__cta'>ADD PRODUCT</button>
        </form>
      </div>
      
    </div>
  )
}

export default AddProduct