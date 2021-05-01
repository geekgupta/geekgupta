import React, { useContext, useState, Fragment } from "react";
import CartProducts from "./CartProducts";
import { CartContext } from "../contexts/CartContext";
import { Link, NavLink ,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import store from "../auth_registration/store";
import { logout } from "../auth_registration/actions/auth";
import { Makecontext } from "../makecontext";
import Cookies from 'universal-cookie' ; 

const Cart = ({ isAuthenticated, logout }) => {
  const cookies = new Cookies() ;
  const[orders ,setorders] = useState([]);
  const {val} = useContext(Makecontext); 
  const authLinks = (
    <button className="btn  btn-outline-secondary ml-5 font-weight-bold">
      <NavLink
        className="text-white nav-link p-0"
        exact
        to="#"
        onClick={logout}
      >
        Logout
      </NavLink>
    </button>
  );

  const guestLinks = (
    <Fragment>
      <button className="btn  btn-outline-secondary ml-5 font-weight-bold">
        <NavLink className="text-white nav-link p-0" exact to="/login">
          Login
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-person-circle ml-1"
            fill="orange"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path
              fill-rule="evenodd"
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
            />
          </svg>
        </NavLink>
      </button>
    </Fragment>
  );
  const h = useHistory() ; 
   const state = store.getState();
   function check() {
    if (state.auth.isAuthenticated) {
     cookies.remove('ordered_product');
      cookies.remove('ordered_product_cart');
     cookies.set('ordered_product_cart', val );
      return h.push('/checkout') 
    } else {
      
      return h.push('/login') 
    }
  }
  let count = null;
  let tot = null;
  const y = store.getState();
  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout,
  } = useContext(CartContext);
   const {totall, itemCountt} = useContext(Makecontext);
  if (y.auth.isAuthenticated) {
    count = itemCountt ;
    tot = totall; 

  } else {
    count = itemCount;
    tot = total ;
    
  }

  return (
    <div>
      <nav className="navbar shadow navbar-expand-lg navbar-dark bg-dark navbar-expand-lg p-4">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink className="navbar-brand " to exact="/">
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              class="bi bi-bag-fill inline-block align-bottom mr-2"
              fill="orange"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
              />
            </svg>
            Clothing Solutions
          </NavLink>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active ">
              <NavLink className="nav-link  mt-3" exact to="/product">
                Store <span className="sr-only ">(current)</span>
              </NavLink>
            </li>
          </ul>

          {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </div>
      </nav>
      <div className="text-center mt-3">
        <h1>Cart</h1>
      </div>

      <div className="row no-gutters justify-content-center">
        <div className="col-sm-9 p-3">
          {count > 0 ? (
            <CartProducts />
          ) : (
            <div className="p-3 text-center text-muted">Your cart is empty</div>
          )}

          {checkout && (
            <div className="p-3 text-center text-success">
              <p>Checkout successfull</p>
              <Link to="/" className="btn btn-outline-success btn-sm">
                BUY MORE
              </Link>
            </div>
          )}
        </div>
        {count > 0 && (
          <div className="col-sm-3 p-3">
            <div className="card card-body">
              <p className="mb-1">Total Items</p>
              <h4 className=" mb-3 txt-right">{count}</h4>
              <p className="mb-1">Total Payment</p>
              <h3 className="m-0 txt-right">{tot}</h3>
              <hr className="my-4" />
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-secondary mb-2"
                  onClick={check}
                >
                  CHECKOUT
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger mb-2 ml-2"
                  onClick={clearCart}
                >
                  CLEAR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Cart);
