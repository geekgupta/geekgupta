import { Link, NavLink } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

function Cart(props) {
  const [products, setproduct] = useState([]);

  const capitalized = (word) => {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice([1]);
    }

    return "";
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/orders/cart/cart_class/"
        );
        console.log(res.data["json_data"]);
        setproduct(res.data["json_data"]);
      } catch (err) {}
    };
    fetchdata();
  }, [props.match.params.id]);

  const getcarts = () => {
    let list = [];
    let result = [];
    products.map((product) => {
      return list.push(
        <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-light mt-4 px-3 rounded">
          <div className="mr-1">
            <img className="rounded" src={product.image} width="70" />
          </div>
          <div className="d-flex flex-column align-items-center product-details">
            <span className="font-weight-bold">{product.name}</span>
            <div className="d-flex flex-row product-desc">
              <div className="size mr-1">
                <span className="text-grey">Size:</span>
                <span className="font-weight-bold">&nbsp;M</span>
              </div>
              <div className="color">
                <span className="text-grey">Color:</span>
                <span className="font-weight-bold">&nbsp;Grey</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center qty">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-dash"
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
              />
            </svg>
            <h5 className="text-grey mt-1 mr-1 ml-1">{product.quantity}</h5>

            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-plus"
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </div>
          <div>
            <h5 className="text-grey">{product.price}</h5>
          </div>
          <div className="d-flex align-items-center">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-trash"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </div>
        </div>
      );
    });

    for (let i = 0; i < list.length; i += 1) {
      result.push(
        <div key={i} className="row mb-2">
          <div className="col-md-6">{list[i]}</div>
        </div>
      );
    }
  };

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

          <button className="btn  btn-secondary ml-5 font-weight-bold">
            <NavLink className="text-white nav-link p-0" exact to="/login">
              Login
            </NavLink>
          </button>
        </div>
      </nav>

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center  mb-3 row">
          <div className="col-md-8  p-2 ">
            <div className="p-2 ">
              <h3 className="m-0 display-5 rounded ">Shopping cart</h3>
              <div className="d-flex flex-row justify-content-end mb-1">
                <span className="mr-1">Sort by:</span>
                <span className="mr-1 font-weight-bold">Price</span>
              </div>
            </div>
            {getcarts()}
            <div className="d-flex flex-row align-items-center mt-4 mb-4  rounded">
              <input
                type="text"
                className="form-control border-0 bg-light border-warning"
                placeholder="discount code/gift card"
              />
              <button
                className="btn btn-outline-warning btn-sm ml-2"
                type="button"
              >
                Apply
              </button>
            </div>
            <div className="d-flex flex-row align-items-center mt-3 rounded">
              <button
                className="btn btn-success btn-block btn-lg pay-button"
                type="button"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
