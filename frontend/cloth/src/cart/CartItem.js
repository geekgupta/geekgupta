import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import store from "../auth_registration/store";
const CartItem = ({ product }) => {
  const { increase, decrease, removeProduct } = useContext(CartContext);
  const d = store.getState();
  let product_name = "";
  let img_name = "";
  let product_price = "" ; 
  if (d.auth.isAuthenticated) {
    product_name = product.product.product_name;
    product_price = product.price_ht;
    img_name = `http://127.0.0.1:8000${product.product.thumbnail}`;

  } else {
    product_name = product.product_name;
    img_name = product.thumbnail;
    product_price = product.price;
  }

  return (
    <div className="row no-gutters py-2 ">
      <div className="col-sm-2 p-2">
        <img
          alt={product_name}
          style={{ margin: "0 auto", maxHeight: "50px" }}
          src={img_name}
          className="img-fluid d-block"
        />
      </div>
      <div className="col-sm-4 p-2">
        <h5 className="mb-1">{product_name}</h5>
        <p className="mb-1">Price: {product_price} </p>
      </div>
      <div className="col-sm-2 p-2 text-center ">
        <p className="mb-0">Qty: {product.quantity}</p>
      </div>
      <div className="col-sm-4 p-2 text-right">
        <button onClick={() => increase(product)} className="btn  mr-2 mb-1">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-plus"
            fill="gray"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </button>

        {product.quantity > 1 && (
          <button
            onClick={() => decrease(product)}
            className="btn  btn-sm mb-1"
          >
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              className="bi bi-dash"
              fill="gray"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
              />
            </svg>
          </button>
        )}

        {product.quantity === 1 && (
          <button
            onClick={() => removeProduct(product)}
            className="btn btn-sm mb-1"
          >
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              className="bi bi-trash"
              fill="gray"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
