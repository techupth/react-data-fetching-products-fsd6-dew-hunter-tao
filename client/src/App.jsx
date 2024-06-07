import axios from "axios"
import "./App.css";
import {useState,useEffect} from 'react'

function App() {
  const [data,getData]=useState([])

  useEffect(() => {
    main();
  }, []);

  const main = async ()=>{
    const gets = await axios.get("http://localhost:4001/products")
    console.log(gets.data.data)
    getData(gets.data.data)
  }

  const handledelete = async (index,id) => {
     await axios.delete(`http://localhost:4001/products/${id}`)
    let reArray=[...data]
    console.log(reArray)
    reArray.splice(index,1)
    getData(reArray)
  }
 
  return (
    
      <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {data.map((item,index)=>{
        return(
      <div className="product-list">
        <div className="product">
          <div className="product-preview">
            <img
              src={item.image}
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: {item.name}</h1>
            <h2>Product price: {item.price} Baht</h2>
            <p>Product description: {item.description}</p>
          </div>

          <button onClick={()=>{handledelete(index,item.id)}} className="delete-button">x</button>
        </div>
      </div>
        )
      })}
    </div>
    
  );
}

export default App;
