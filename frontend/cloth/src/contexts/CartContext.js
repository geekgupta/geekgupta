import React, { createContext, useReducer, useEffect, useState } from "react";
import { CartReducer, sumItems } from "./CartReducer";
import store from "../auth_registration/store";
export const CartContext = createContext();

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
export const CartContextProvider = ({ children }) => {
  const [data, setdata] = useState([]);
  const initialState = {
    cartItems: storage,
    ...sumItems(storage),
    refresh_cart: false,
    checkout: false,
    change: 0,
  };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (payload) => {
    //window.location.reload(false);
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload) => {
    dispatch({ type: "DECREASE", payload });
  };

  const addProduct = (payload) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
