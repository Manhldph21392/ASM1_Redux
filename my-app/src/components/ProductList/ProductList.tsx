import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../context/Product";
import axios from "axios";
const ProductList = () => {
  const { state, dispatch } = useContext(ProductContext);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products`);
        dispatch({ type: "product/fetch", payload: data });
      } catch (error) {
        console.log(error);
      } finally {
      }
    })();
  }, []);
  const addProduct = async (product: any) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/products`,
        product
      );
      dispatch({ type: "product/add", payload: data });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const removeProduct = async (id: any) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/products/${id}`,
        
      );
      dispatch({ type: "product/remove", payload: id });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const updateProduct = async (product: any) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/products/${product.id}`,
        product
      );
      dispatch({ type: "product/update", payload: data });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div>
      {state.products.map((item: any) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button onClick={() => addProduct({name: "Mạnh" , price: 300})}>Add</button>
      <button onClick={() => removeProduct(4)}>Remove</button>
      <button onClick={() => updateProduct({id: 4, name: "Mạnh Đẹp trai", price: 200})}>Update</button>
    </div>
  );
};

export default ProductList;
