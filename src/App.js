import Home from "./components/Home"
import AddProduct from "./components/AddProduct"
import ProductDetails from "./components/ProductDetails"
import BidProduct from "./components/BidProduct"
import Products from "./components/Products"
import { Route, Routes } from "react-router-dom"
import socketIO from "socket.io-client"
import Nav from "./components/Nav"

const socket = socketIO.connect("https://pewter-sordid-net.glitch.me:4000")
function App() {
  return (
    <div>
      <Nav header="Bid Items" socket={socket} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products socket={socket} />} />
        <Route path="/products/add" element={<AddProduct socket={socket} />} />
        <Route path="/products/bid/:name/:price/:productId" element={<BidProduct socket={socket} />} />
        <Route path="/products/details/:productId" element={<ProductDetails socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
