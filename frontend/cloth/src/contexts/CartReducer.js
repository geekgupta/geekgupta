//import AUTHENTICATED_SUCCESS from "../auth_registration/reducers/auth";
import React, { useState, useEffect, useContext } from "react";
import store from "../auth_registration/store";
import axios from "axios";
export const cart_data = {
  check: false,
};
function data() {
  window.location.reload(false);
}
const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
    const x = store.getState();
      if (x.auth.isAuthenticated) {
        const id = localStorage.getItem("id");
        const product_id = action.payload.id;
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          axios.post(
            "http://127.0.0.1:8000/product/items/cart/add",
            { product_id, id },
            config
          );

          state.change = state.change + 1;
          console.log(state.change);
        } catch (err) {}
        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
      } else {
        if (!state.cartItems.find((item) => item.id === action.payload.id)) {
          state.cartItems.push({
            ...action.payload,
            quantity: 1,
          });
        }
        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
      }
    case "REMOVE_ITEM":
    const p = store.getState();
      if (p.auth.isAuthenticated) {
        // window.location.reload(false);
        const value = action.payload.id;
        console.log(action.payload.id);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          axios.post(
            "http://127.0.0.1:8000/product/items/cart/delete",
            { value },
            config
          );
          // window.location.reload(false);
          state.change = state.change + 1;
          console.log(state.change);
        } catch (err) {}
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      } else {
        return {
          ...state,
          ...sumItems(
            state.cartItems.filter((item) => item.id !== action.payload.id)
          ),
          cartItems: [
            ...state.cartItems.filter((item) => item.id !== action.payload.id),
          ],
        };
      }
    // eslint-disable-next-line no-fallthrough
    case "INCREASE":
    const i = store.getState();
      if (i.auth.isAuthenticated) {
        const value = action.payload.id;
        console.log(action.payload.id);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          axios.post(
            "http://127.0.0.1:8000/product/items/cart/increment",
            { value },
            config
          );

          const x = store.getState();
          console.log(x.auth.isAuthenticated);
          state.change = state.change + 1;
          console.log(state.change);
        } catch (err) {}
        return {
          ...state,
          ...state.change,
          refresh_cart: true,
          cartItems: [...state.cartItems],
        };
      } else {
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === action.payload.id)
        ].quantity++;
        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
      }
    case "DECREASE":
    const d = store.getState();
      if (d.auth.isAuthenticated) {
        //  window.location.reload(false);
        const value = action.payload.id;
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          axios.post(
            "http://127.0.0.1:8000/product/items/cart/decrement",
            { value },
            config
          );
          //window.location.reload(false);
          state.change = state.change + 1;
          console.log(state.change);
        } catch (err) {}
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      } else {
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === action.payload.id)
        ].quantity--;
        return {
          ...state,
          ...sumItems(state.cartItems),
          cartItems: [...state.cartItems],
        };
      }
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
