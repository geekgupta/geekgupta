import React, { useState, useContext, Fragment } from "react";
//import { Link, NavLink } from "react-router-dom";
import { Makecontext } from "./makecontext";
import axios from "axios";
import { CartContext } from "./contexts/CartContext";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import store from "./auth_registration/store";
import { logout } from "./auth_registration/actions/auth";
import "./search.css";

function Navbar({ isAuthenticated, logout }) {
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
      {/* <button className="btn  btn-outline-secondary ml-2 font-weight-bold">
        <NavLink className="text-white nav-link p-0" exact to="/signup">
          sign up
        </NavLink>
  </button>*/}
    </Fragment>
  );
  const state = store.getState();
  const { itemCount } = useContext(CartContext);
  const [value, setvalue] = useState("");
  const {itemCountt, totall} = useContext(Makecontext);
  let count = null ; 
  if (state.auth.isAuthenticated) {
     count = itemCountt ; 
    } else {
      count = itemCount ; 
    }
  const handlesearch = (e) => {
    const fetchdata = async () => {
      const slug = e.target.value;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/product/api/query?search=${slug}`
        );
        setvalue(slug);
        console.log(slug);
      } catch (err) {}
    };
    fetchdata();
  };
  return (
    <div>
      <nav
        className="navbar shadow navbar-dark navbar-expand-sm"
        style={{ "background-color": "#383838" }}
      >
        <button
          className="navbar-toggler first  border-0"
          data-toggle="collapse"
          data-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <NavLink className="navbar-brand " exact to="/">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-bag-fill inline-block align-bottom mr-2 "
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
        <button
          data-toggle="collapse"
          aria-expanded="false"
          
          className="navbar-toggler third  border-0 notification "
        >
          <NavLink className="text-white border-0" exact to="/cart">
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
            <span class="badge bg-danger rounded-circle">{itemCount}</span>
          </NavLink>
        </button>
        <div class="collapse bg-dark" id="navbarHeader">
          <div class="container">
            <div class="row">
              <div class="col-sm-8 col-md-7 py-4">
                <form
                  className="navsearch my-2 my-lg-0"
                  action={`/search/${value}`}
                >
                  <input
                    className="search_input"
                    type="search"
                    placeholder="Search here ....."
                    aria-label="Search"
                    name="value"
                    onChange={handlesearch}
                  />
                </form>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white">
                      Store
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active ">
              <NavLink className="nav-link  mt-3" exact to="/product">
                Store <span className="sr-only ">(current)</span>
              </NavLink>
            </li>
          </ul>

          <form className="searchbar my-2 my-lg-0" action={`/search/${value}`}>
            <input
              className="search_input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="value"
              onChange={handlesearch}
            />
            <a className="search_icon">
              <i className="fas fa-search"></i>
            </a>
          </form>

          {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}

          <button className="btn cart btn-outline-secondary ml-2 notification ">
            <NavLink className="text-white" exact to="/cart">
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
              <span class="badge bg-danger rounded-circle">{count}</span>
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
