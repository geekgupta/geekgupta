import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link, NavLink } from "react-router-dom";
import CartItem from "./CartItem";
import { Makecontext } from "../makecontext";
import store from "../auth_registration/store";
const CartProducts = () => {
  let x = null;
  const y = store.getState();
  console.log(y.auth.isAuthenticated);
  const { cartItems } = useContext(CartContext);
  const {val} = useContext(Makecontext);
  console.log(val);
  if (y.auth.isAuthenticated) {
    x = val;
  } else {
    x = cartItems;
  }

  return (
    <div className="container">
      <div className="card card-body border-1">
        {x.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
