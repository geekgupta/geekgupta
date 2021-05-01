import React, { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "./contexts/CartContext";
export const Makecontext = createContext();
export function ContextProvider(props) {
  const [val, setval] = useState([]);
  const [itemCountt, setCount] = useState([]);
  const [totall, settotal] = useState([]);
  const { change } = useContext(CartContext);
 
  useEffect(() => {
    const id = localStorage.getItem("id");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchdata = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/product/items/cart",
          { id },
          config
        );
        setval(res.data);
        setCount(res.data.reduce((total, product) => total + product.quantity,0));
        settotal(res.data.reduce((tot, product) => tot + product.price_ht, 0).toFixed(2));
        console.log(res.data);
        console.log(itemCountt);
        console.log(totall);
      } catch (err) {}
    };

    fetchdata();
  }, [change]);
   const values = {
    val,
    itemCountt,
    totall
  };
  return (
    <Makecontext.Provider value={values}>
      {props.children}
    </Makecontext.Provider>
  );
}
