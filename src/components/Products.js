import React, { useEffect, useState, useLayoutEffect } from "react";
import EditButton from "./EditButton";
import DetailsButton from "./DetailsButton";

import { Link } from "react-router-dom";

const Products = ({ socket }) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    function fetchProducts() {
      fetch("https://pewter-sordid-net.glitch.me:4000/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    socket.on("getProducts", (data) => setProducts(data));
  }, []);

  return (
    <div>
      <div className="table__container">
        <Link to="/products/add" className="products__cta">
          ADD PRODUCTS{" "}
        </Link>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Last Bidder</th>
              <th>Creator</th>
              <th>Details</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Loading</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={`${product.name}${product.price}`}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.last_bidder || "None"}</td>
                  <td>{product.owner}</td>
                  <td>
                    <DetailsButton product={product} />
                  </td>
                  <td>
                    <EditButton product={product} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
