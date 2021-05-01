import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Makecontext } from "./makecontext";

function Addaccount() {
  const [val, setval] = useContext(Makecontext);
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

          <button className="btn  btn-secondary ml-2 notification ">
            <NavLink exact to="/cart">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-cart-fill"
                fill="orange"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                />
              </svg>
            </NavLink>
            <span class="badge bg-danger rounded-circle">{val}</span>
          </button>
        </div>
      </nav>
      <div className="container ">
        <div className="row justify-content-center align-items-center mt-3 ">
          <div className="col-10 col-md-8 col-lg-4 bg-light pb-5 pt-5 pl-3 pr-3 mt-5">
            <div className="panel panel-primary mt-1">
              <div className="panel-heading">
                <h4 className=" text-center mb-5 ">
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
                  <span>Clothing Solutions </span>
                </h4>
                <h3 className="">Login </h3>
              </div>
              <div className="panel-body">
                <form>
                  <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name" />
                  </div>
                  <div className="form-group">
                    <label>Gmail:</label>
                    <input type="gmail" className="form-control" name="name" />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                    />
                  </div>
                  <p></p>

                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addaccount;
