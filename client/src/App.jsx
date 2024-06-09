import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [productData, setProductData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoadingStatus("loading");
      const result = await axios.get("http://localhost:4001/products");
      setLoadingStatus("completed");
      setProductData(result.data.data);
    } catch {
      setLoadingStatus("error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      const response = productData.filter((item) => {
        return item.id !== id;
      });
      setProductData(response);
    } catch {
      setLoadingStatus("failed");
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {loadingStatus === "loading" && <h1>Loading...</h1>}{" "}
        {loadingStatus === "failed" && <h1>Fail to load data...</h1>}
        {loadingStatus === "completed" &&
          productData.map((product) => (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                x
              </button>
            </div>
          ))}
          {loadingStatus === "completed" && !productData.length && (
        <h1>No Product!</h1>
      )}
      </div>
    </div>
  );
}

export default App;
