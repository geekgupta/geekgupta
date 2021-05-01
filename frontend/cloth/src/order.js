import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
//import "./order.css";

function Order() {
  return (
    <div className="container" id="cont">
      <div className="card">
        <div className="card-top border-bottom text-center">
          {" "}
          <a href="#">
            {" "}
            Back to shop
          </a> <span id="logo">BBBootstrap.com</span>{" "}
        </div>
        <div className="card-body">
          <div className="row upper">
            {" "}
            <span>
              <i className="fa fa-check-circle-o"></i> Shopping bag
            </span>{" "}
            <span>
              <i className="fa fa-check-circle-o"></i> Order details
            </span>{" "}
            <span id="payment">
              <span id="three">3</span>Payment
            </span>{" "}
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="left border">
                <div className="row">
                  {" "}
                  <span className="header">Payment</span>
                  <div className="icons">
                    {" "}
                    <img src="https://img.icons8.com/color/48/000000/visa.png" />{" "}
                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />{" "}
                    <img src="https://img.icons8.com/color/48/000000/maestro.png" />{" "}
                  </div>
                </div>
                <form>
                  {" "}
                  <span>Cardholder's name:</span>{" "}
                  <input
                    className="form-control"
                    placeholder="Linda Williams"
                  />{" "}
                  <span>Card Number:</span>{" "}
                  <input
                    className="form-control"
                    placeholder="0125 6780 4567 9909"
                  />
                  <div className="row">
                    <div className="col-4">
                      <span>Expiry date:</span>{" "}
                      <input className="form-control" placeholder="YY/MM" />{" "}
                    </div>
                    <div className="col-4">
                      <span>CVV:</span>{" "}
                      <input className="form-control" id="cvv" />{" "}
                    </div>
                  </div>{" "}
                  <input
                    className="form-control"
                    type="checkbox"
                    id="save_card"
                    className="align-left"
                  />{" "}
                  <label for="save_card">Save card details to wallet</label>
                </form>
              </div>
            </div>
            <div className="col-md-5">
              <div className="right border">
                <div className="header">Order Summary</div>
                <p>2 items</p>
                <div className="row item">
                  <div className="col-4 align-self-center">
                    <img
                      className="img-fluid"
                      src="https://i.imgur.com/79M6pU0.png"
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <b>$ 26.99</b>
                    </div>
                    <div className="row text-muted">
                      Be Legandary Lipstick-Nude rose
                    </div>
                    <div className="row">Qty:1</div>
                  </div>
                </div>
                <div className="row item">
                  <div className="col-4 align-self-center">
                    <img
                      className="img-fluid"
                      src="https://i.imgur.com/Ew8NzKr.jpg"
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <b>$ 19.99</b>
                    </div>
                    <div className="row text-muted">
                      Be Legandary Lipstick-Sheer Navy Cream
                    </div>
                    <div className="row">Qty:1</div>
                  </div>
                </div>
                <hr />
                <div className="row lower">
                  <div className="col text-left">Subtotal</div>
                  <div className="col text-right">$ 46.98</div>
                </div>
                <div className="row lower">
                  <div className="col text-left">Delivery</div>
                  <div className="col text-right">Free</div>
                </div>
                <div className="row lower">
                  <div className="col text-left">
                    <b>Total to pay</b>
                  </div>
                  <div className="col text-right">
                    <b>$ 46.98</b>
                  </div>
                </div>
                <div className="row lower">
                  <div className="col text-left">
                    <a href="#">
                      <u>Add promo code</u>
                    </a>
                  </div>
                </div>{" "}
                <button className="btn btn-outline-success">Place order</button>
                <p className="text-muted text-center">
                  Complimentary Shipping & Returns
                </p>
              </div>
            </div>
          </div>
        </div>
        <div> </div>
      </div>
    </div>
  );
}

export default Order;
